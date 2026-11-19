import React from 'react';
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
export declare function SwipeableItem<ItemT>({ item, index, actions, children }: {
    item: ItemT;
    index: number;
    actions: SwipeActions<ItemT>;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SwipeableItem.d.ts.map