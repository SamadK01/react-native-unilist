import React, {
    forwardRef,
    ReactElement,
    ReactNode,
    useImperativeHandle,
    useRef,
  } from 'react';
  import {
    FlatList,
    FlatListProps,
    ListRenderItemInfo,
    ScrollView,
    ScrollViewProps,
    StyleProp,
    View,
    ViewStyle,
  } from 'react-native';
  
  type EmptyComponent = ReactElement | null;
  
  export interface UniListProps<ItemT = any>
    extends Omit<FlatListProps<ItemT>, 'renderItem' | 'data'>,
      Omit<ScrollViewProps, 'children'> {
    /** Data array → triggers FlatList mode. If undefined, ScrollView mode. */
    data?: ItemT[];
    /** Render function for each item (FlatList mode) */
    renderItem?: (item: ItemT, index: number) => ReactElement | null;
    /** Children (ScrollView mode) */
    children?: ReactNode;
    /** Space (px) between items / children */
    spacing?: number;
    /** Empty‑state UI */
    ListEmptyComponent?: EmptyComponent;
    /** Show when `loading` true AND no data yet */
    loading?: boolean;
    /** Optional custom container style */
    contentContainerStyle?: StyleProp<ViewStyle>;
  }
  
  /** Imperative actions forwarded to parent */
  export interface UniListRef {
    /** Scroll to item index (FlatList only) */
    scrollToIndex: (opts: { index: number; animated?: boolean }) => void;
    /** Scroll to top */
    scrollToTop: (animated?: boolean) => void;
  }
  
  function UniListInner<ItemT = any>(
    {
      data,
      renderItem,
      children,
      spacing = 0,
      horizontal = false,
      ListEmptyComponent,
      loading,
      contentContainerStyle,
      ...rest
    }: UniListProps<ItemT>,
    ref: React.ForwardedRef<UniListRef>
  ) {
    const flatRef = useRef<FlatList<ItemT>>(null);
    const scrollRef = useRef<ScrollView>(null);
  
    /* ----------  expose imperative API  ---------- */
    useImperativeHandle(
      ref,
      () => ({
        scrollToIndex: ({ index, animated = true }) => {
          if (flatRef.current) flatRef.current.scrollToIndex({ index, animated });
        },
        scrollToTop: (animated = true) => {
          if (flatRef.current)
            flatRef.current.scrollToOffset({ offset: 0, animated });
          else if (scrollRef.current) scrollRef.current.scrollTo({ y: 0, animated });
        },
      }),
      []
    );
  
    /* ----------  item wrapper for spacing  ---------- */
    const withSpacing = (
      render: (info: ListRenderItemInfo<ItemT>) => ReactElement | null
    ) => {
      if (!spacing) return render;
      return (info: ListRenderItemInfo<ItemT>) => (
        <View
          style={{
            marginRight: horizontal ? spacing : 0,
            marginBottom: horizontal ? 0 : spacing,
          }}
        >
          {render(info)}
        </View>
      );
    };
  
    /* ----------  choose mode  ---------- */
    if (data && renderItem) {
      const listEmpty =
        !loading && (data.length === 0) && ListEmptyComponent
          ? ListEmptyComponent
          : null;
  
      return (
        <FlatList
          ref={flatRef}
          data={data}
          renderItem={withSpacing(({ item, index }) => renderItem(item, index))}
          keyExtractor={(_, i) => i.toString()}
          horizontal={horizontal}
          ListEmptyComponent={listEmpty}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingRight: horizontal ? spacing : 0, paddingBottom: spacing },
            contentContainerStyle,
          ]}
          {...rest}
        />
      );
    }
  
    /* ----------  ScrollView fallback  ---------- */
    return (
      <ScrollView
        ref={scrollRef}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            flexDirection: horizontal ? 'row' : 'column',
            paddingRight: horizontal ? spacing : 0,
            paddingBottom: spacing,
          },
          contentContainerStyle,
        ]}
        {...rest}
      >
        {React.Children.map(children, (child, idx) => (
          <View
            key={idx}
            style={{
              marginRight: horizontal ? spacing : 0,
              marginBottom: horizontal ? 0 : spacing,
            }}
          >
            {child}
          </View>
        ))}
      </ScrollView>
    );
  }
  
  export const UniList = forwardRef(UniListInner) as <ItemT = any>(
    p: UniListProps<ItemT> & { ref?: React.Ref<UniListRef> }
  ) => ReactElement;
  