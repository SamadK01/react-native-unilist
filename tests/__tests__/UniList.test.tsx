import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';

jest.mock('react-native', () => {
  const React = require('react');
  const scrollToEnd = jest.fn();
  (global as any).__unilistScrollToEnd = scrollToEnd;
  const native = (name: string, methods = {}) => React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => methods);
    return React.createElement(name, props, props.children);
  });
  return {
    View: 'View', Text: 'Text', Pressable: 'Pressable', ScrollView: native('ScrollView', { scrollTo: jest.fn(), scrollToEnd }),
    FlatList: native('FlatList', { scrollToEnd, scrollToIndex: jest.fn(), scrollToOffset: jest.fn() }),
    SectionList: native('SectionList', { scrollToLocation: jest.fn() }),
    Animated: { Value: class { setValue = jest.fn(); }, View: 'AnimatedView', timing: () => ({ start: jest.fn() }), sequence: () => ({}), loop: () => ({ start: jest.fn(), stop: jest.fn() }), spring: () => ({ start: jest.fn() }) },
    PanResponder: { create: (handlers: any) => ({ panHandlers: handlers }) },
    LayoutAnimation: { configureNext: jest.fn(), Presets: { easeInEaseOut: {} } },
    StyleSheet: { create: (styles: any) => styles, hairlineWidth: 1 },
    Dimensions: { get: () => ({ width: 360, height: 800 }) },
  };
});

import { CarouselLayout, GridLayout, MasonryLayout, Skeleton, ThemeManager, UniList, usePagination, useSearch } from '../../src';
import { SwipeableItem } from '../../src/components/SwipeableItem';

const render = (element: React.ReactElement) => TestRenderer.create(element);
const items = [{ id: '1', text: 'one' }, { id: '2', text: 'two' }];

describe('UniList v2', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('configures non-inverted chat streaming auto-follow', () => {
    let tree!: TestRenderer.ReactTestRenderer;
    act(() => { tree = render(<UniList data={items} chatMode renderItem={item => <>{item.text}</>} />); });
    const list = tree.root.findByType('FlatList');
    expect(list.props.maintainVisibleContentPosition).toEqual({ minIndexForVisible: 0, autoscrollToTopThreshold: 24 });
    act(() => list.props.onContentSizeChange(320, 900));
    expect((global as any).__unilistScrollToEnd).toHaveBeenCalledWith({ animated: false });
  });

  it('calls both chat pagination directions without inverted mode', () => {
    const older = jest.fn(); const newer = jest.fn(); let tree!: TestRenderer.ReactTestRenderer;
    act(() => { tree = render(<UniList data={items} chatMode onLoadOlder={older} onLoadNewer={newer} renderItem={() => null} />); });
    const list = tree.root.findByType('FlatList');
    act(() => { list.props.onStartReached(); list.props.onEndReached({ distanceFromEnd: 0 }); });
    expect(older).toHaveBeenCalledTimes(1); expect(newer).toHaveBeenCalledTimes(1);
  });

  it('renders skeleton placeholders for an empty loading list', () => {
    let tree!: TestRenderer.ReactTestRenderer;
    act(() => { tree = render(<UniList data={[]} loading skeletonCount={2} skeletonVariant="glass" renderItem={() => null} />); });
    const empty = tree.root.findByType('FlatList').props.ListEmptyComponent;
    expect(empty.props.count).toBe(2); expect(empty.props.variant).toBe('glass');
    act(() => { tree = render(<Skeleton variant="material" />); });
    expect(tree.root.findByType('AnimatedView').props.accessibilityLabel).toBe('Loading content');
  });

  it('exposes and triggers typed swipe actions', () => {
    const remove = jest.fn(); let tree!: TestRenderer.ReactTestRenderer;
    act(() => { tree = render(<SwipeableItem item={items[0]} index={0} actions={{ right: { label: 'Delete', onPress: remove } }}><>{'row'}</></SwipeableItem>); });
    const animated = tree.root.findByType('AnimatedView');
    act(() => animated.props.onPanResponderRelease({}, { dx: -90 }));
    expect(remove).toHaveBeenCalledWith(items[0], 0);
  });

  it('uses SectionList with sticky headers for sections', () => {
    const header = jest.fn(() => <>{'Header'}</>); let tree!: TestRenderer.ReactTestRenderer;
    act(() => { tree = render(<UniList sections={[{ key: 'today', title: 'Today', data: items }]} renderItem={item => <>{item.text}</>} renderSectionHeader={header} />); });
    const list = tree.root.findByType('SectionList');
    expect(list.props.stickySectionHeadersEnabled).toBe(true);
    list.props.renderSectionHeader({ section: { key: 'today', title: 'Today', data: items } });
    expect(header).toHaveBeenCalled();
  });

  it('renders grid, masonry, and carousel layouts', () => {
    let tree!: TestRenderer.ReactTestRenderer;
    act(() => { tree = render(<><GridLayout columns={2}><>{'A'}</><>{'B'}</></GridLayout><MasonryLayout columns={2}><>{'A'}</><>{'B'}</></MasonryLayout><CarouselLayout showDots><>{'A'}</><>{'B'}</></CarouselLayout></>); });
    expect(tree.root.findAllByType('ScrollView')).toHaveLength(1);
    expect(tree.root.findAllByType('View').length).toBeGreaterThan(3);
  });

  it('notifies ThemeManager subscribers', () => {
    const listener = jest.fn(); const manager = ThemeManager.getInstance(); const unsubscribe = manager.subscribe(listener);
    manager.setThemeType('dark', 'purple');
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ type: 'dark', colors: expect.objectContaining({ primary: '#AF52DE' }) }));
    unsubscribe();
  });

  it('serializes pagination and appends typed data', async () => {
    let api: ReturnType<typeof usePagination<{ id: string }>> | undefined;
    function Harness() { api = usePagination({ pageSize: 2, initialData: [{ id: 'a' }], onLoadMore: async page => [{ id: String(page) }, { id: `${page}b` }] }); return null; }
    await act(async () => { render(<Harness />); });
    await act(async () => { await api!.loadMore(); });
    expect(api!.data.map(item => item.id)).toEqual(['a', '2', '2b']);
    expect(api!.currentPage).toBe(2);
  });

  it('debounces search and safely highlights regex characters', async () => {
    jest.useFakeTimers(); let api: ReturnType<typeof useSearch<{ name: string }>> | undefined;
    function Harness() { api = useSearch({ data: [{ name: '[alpha]' }, { name: 'beta' }], searchFields: ['name'], debounceMs: 10, highlightResults: true }); return null; }
    await act(async () => { render(<Harness />); });
    await act(async () => { api!.setQuery('['); });
    await act(async () => { jest.advanceTimersByTime(10); });
    expect(api!.results).toEqual([{ name: '[alpha]' }]);
    expect(api!.highlightText('[alpha]')).toBe('**[**alpha]');
    jest.useRealTimers();
  });
});
