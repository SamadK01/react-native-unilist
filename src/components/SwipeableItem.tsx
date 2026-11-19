import React, { useMemo, useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

/** One typed action revealed by swiping a UniList cell. @example `{ label: 'Delete', onPress: item => remove(item.id) }` */
export interface SwipeAction<ItemT> {
  /** Accessible visible label. */
  label: string;
  /** Underlay color; defaults to blue. */
  color?: string;
  /** Receives the exact item and index associated with the swiped row. */
  onPress: (item: ItemT, index: number) => void;
}

/** Left/right swipe configuration passed to `UniList.swipeActions`. */
export interface SwipeActions<ItemT> {
  /** Action revealed by a rightward swipe. */
  left?: SwipeAction<ItemT>;
  /** Action revealed by a leftward swipe. */
  right?: SwipeAction<ItemT>;
  /** Distance in points needed to trigger an action; default is 72. */
  threshold?: number;
}

/** Internal cell wrapper exported for custom composition. @example `<SwipeableItem item={task} index={0} actions={actions}><TaskRow /></SwipeableItem>` */
export function SwipeableItem<ItemT>({ item, index, actions, children }: { item: ItemT; index: number; actions: SwipeActions<ItemT>; children: React.ReactNode }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const threshold = actions.threshold ?? 72;
  const responder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onPanResponderMove: (_, gesture) => {
      const allowed = gesture.dx > 0 ? Boolean(actions.left) : Boolean(actions.right);
      if (allowed) translateX.setValue(Math.max(-threshold, Math.min(threshold, gesture.dx)));
    },
    onPanResponderRelease: (_, gesture) => {
      const action = gesture.dx >= threshold ? actions.left : gesture.dx <= -threshold ? actions.right : undefined;
      if (action) action.onPress(item, index);
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
    },
    onPanResponderTerminate: () => Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start(),
  }), [actions, index, item, threshold, translateX]);
  return <View style={styles.root}>
    {actions.left ? <Action action={actions.left} item={item} index={index} side="left" /> : null}
    {actions.right ? <Action action={actions.right} item={item} index={index} side="right" /> : null}
    <Animated.View style={{ transform: [{ translateX }] }} {...responder.panHandlers}>{children}</Animated.View>
  </View>;
}

function Action<ItemT>({ action, item, index, side }: { action: SwipeAction<ItemT>; item: ItemT; index: number; side: 'left' | 'right' }) {
  return <Pressable accessibilityRole="button" onPress={() => action.onPress(item, index)} style={[styles.action, side === 'left' ? styles.left : styles.right, { backgroundColor: action.color ?? '#2563eb' }]}><Text style={styles.actionText}>{action.label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  root: { justifyContent: 'center', overflow: 'hidden' },
  action: { bottom: 0, justifyContent: 'center', paddingHorizontal: 24, position: 'absolute', top: 0 },
  left: { alignItems: 'flex-start', left: 0, right: '50%' }, right: { alignItems: 'flex-end', left: '50%', right: 0 },
  actionText: { color: '#fff', fontWeight: '600' },
});
