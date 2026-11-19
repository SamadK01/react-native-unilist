# react-native-unilist v2

Fabric-ready virtualized lists and UI primitives for React Native 0.76+ and React 19+. v2 is designed for modern feeds, AI chat, and strict TypeScript applications without a native module.

## Why react-native-unilist vs FlatList & FlashList

| Capability | react-native-unilist | React Native FlatList | FlashList |
| --- | --- | --- | --- |
| Primary purpose | Typed, ready-to-compose feeds and AI chat | Low-level built-in virtualized list | High-performance native recycler list |
| Setup | No additional native dependency | Included with React Native | Additional dependency / platform integration |
| View recycling | FlatList windowing via `recycleItems`; not native recycling | Virtualization/windowing | Native recycler implementation |
| AI chat | Built-in non-inverted `chatMode`, bottom alignment, top/bottom pagination callbacks | Build composition manually; `inverted` is commonly used | Build composition manually |
| Loading and gestures | Built-in skeletons, typed swipe actions, layout-animation option | Build or install separately | Build or install separately |
| Styling | Cards, `headless`, and NativeWind `className` forwarding | App-owned UI | App-owned UI |
| Best fit | Teams wanting a typed batteries-included list layer | Maximum platform baseline and control | Lists where native recycling is a hard requirement |

Use FlashList when native cell recycling is the deciding requirement. Use FlatList when you want the smallest possible dependency surface. Use UniList when chat/feed behavior, typed utilities, and ready-to-compose UI are the primary needs.

## Install

```sh
npm install react-native-unilist
```

Expo SDK versions that use React Native 0.76+ work without extra native setup. Paste these examples into [Expo Snack](https://snack.expo.dev/) to try the API.

## Quick start

```tsx
import { Text } from 'react-native';
import { UniList, type UniListProps } from 'react-native-unilist';

type Product = { id: string; name: string };

const props: UniListProps<Product> = {
  data: [{ id: '1', name: 'Orbital keyboard' }],
  keyExtractor: item => item.id,
  renderItem: item => <Text>{item.name}</Text>,
  recycleItems: true,
};

export function Products() { return <UniList {...props} />; }
```

## AI chat mode — no `inverted`

`chatMode` bottom-aligns a short feed and uses `maintainVisibleContentPosition` to preserve the visible message when older messages are prepended. It only follows streaming content when the reader is already near the bottom.

```tsx
type Message = { id: string; role: 'user' | 'assistant'; text: string };

<UniList<Message>
  chatMode
  data={messages}
  keyExtractor={message => message.id}
  renderItem={message => <MessageBubble {...message} />}
  onLoadOlder={loadOlderMessages}
  onLoadNewer={loadNewerMessages}
  loadingOlder={isLoadingOlder}
  loadingNewer={isLoadingNewer}
  animateLayout
  recycleItems
/>
```

For token streaming, replace the last message immutably. The list preserves a reader’s position unless they are already at the bottom.

## v2 features

- `recycleItems`: tuned FlatList clipping/windowing defaults to reduce off-screen memory. It is not native view recycling.
- Dynamic item sizes: omit `getItemLayout`; FlatList measures cells normally.
- `chatMode`: bottom-aligned, non-inverted bidirectional pagination.
- `loading`, `skeletonCount`, and `skeletonVariant`: native-driver shimmer placeholders for empty loading states.
- `swipeActions` and `animateLayout`: dependency-free gestures and layout transitions.
- `className` and `headless`: NativeWind-friendly props alongside zero-chrome card composition.
- Strict generic APIs: `UniList<T>`, `usePagination<T>`, and `useSearch<T>` preserve item types.

## Cards and styling

```tsx
<UniList
  data={rows}
  renderItem={row => <ElevatedCard className="mx-4 my-2" title={row.title} cardStyle="material" />}
  loading={isLoading}
  skeletonVariant="material"
  swipeActions={{ right: { label: 'Delete', color: '#dc2626', onPress: row => remove(row.id) } }}
/>

<GlassCard headless className="rounded-2xl p-4">{/* your own surface */}</GlassCard>
```

`className` is forwarded to native surfaces for NativeWind projects. Configure NativeWind in the consuming application; UniList does not bundle a Tailwind runtime.

## Performance benchmarks

Performance depends on row complexity, images, device, and JavaScript workload. v2 does not claim universal frame-rate or “zero blank cell” numbers. Benchmark your release build with the React Native Performance Monitor:

| Scenario | Recommended configuration | Acceptance target |
| --- | --- | --- |
| 1,000 fixed-complexity feed rows | `recycleItems`, stable render/key callbacks | No sustained JS frame drops during a fast fling |
| Dynamic-height media feed | omit `getItemLayout`, cache image dimensions | No visually persistent blank cells |
| Streaming chat | `chatMode`, immutable final-row updates | Reader position remains stable away from bottom |

Keep `renderItem`, `keyExtractor`, and `swipeActions` referentially stable when parent renders are frequent. Profile after enabling the New Architecture; no special Fabric or JSI install step is required.

## Hooks

```tsx
const search = useSearch<Product>({ data: products, searchFields: ['name'] });
const pager = usePagination<Product>({ pageSize: 20, onLoadMore: fetchPage });
```

`useSearch` safely debounces input and exposes `highlightText()` without mutating generic items. `usePagination` deduplicates overlapping requests and preserves `T` in `setData`.

## AI tool documentation

See [llms.txt](./llms.txt) for the compact API map and [llms-full.txt](./llms-full.txt) for detailed examples and constraints.

## Compatibility

- React 19+
- React Native 0.76+ (New Architecture / Fabric compatible)
- iOS, Android, and React Native Web where the underlying FlatList APIs are available

## License

MIT
