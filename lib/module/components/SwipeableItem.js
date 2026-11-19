"use strict";

import React, { useMemo, useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

/** One typed action revealed by swiping a UniList cell. @example `{ label: 'Delete', onPress: item => remove(item.id) }` */

/** Left/right swipe configuration passed to `UniList.swipeActions`. */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Internal cell wrapper exported for custom composition. @example `<SwipeableItem item={task} index={0} actions={actions}><TaskRow /></SwipeableItem>` */
export function SwipeableItem({
  item,
  index,
  actions,
  children
}) {
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
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    },
    onPanResponderTerminate: () => Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true
    }).start()
  }), [actions, index, item, threshold, translateX]);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.root,
    children: [actions.left ? /*#__PURE__*/_jsx(Action, {
      action: actions.left,
      item: item,
      index: index,
      side: "left"
    }) : null, actions.right ? /*#__PURE__*/_jsx(Action, {
      action: actions.right,
      item: item,
      index: index,
      side: "right"
    }) : null, /*#__PURE__*/_jsx(Animated.View, {
      style: {
        transform: [{
          translateX
        }]
      },
      ...responder.panHandlers,
      children: children
    })]
  });
}
function Action({
  action,
  item,
  index,
  side
}) {
  return /*#__PURE__*/_jsx(Pressable, {
    accessibilityRole: "button",
    onPress: () => action.onPress(item, index),
    style: [styles.action, side === 'left' ? styles.left : styles.right, {
      backgroundColor: action.color ?? '#2563eb'
    }],
    children: /*#__PURE__*/_jsx(Text, {
      style: styles.actionText,
      children: action.label
    })
  });
}
const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    overflow: 'hidden'
  },
  action: {
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 24,
    position: 'absolute',
    top: 0
  },
  left: {
    alignItems: 'flex-start',
    left: 0,
    right: '50%'
  },
  right: {
    alignItems: 'flex-end',
    left: '50%',
    right: 0
  },
  actionText: {
    color: '#fff',
    fontWeight: '600'
  }
});
//# sourceMappingURL=SwipeableItem.js.map