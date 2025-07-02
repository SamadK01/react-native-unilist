# react-native-unilist

[![npm version](https://img.shields.io/npm/v/react-native-unilist.svg)](https://www.npmjs.com/package/react-native-unilist)
[![npm downloads](https://img.shields.io/npm/dm/react-native-unilist.svg)](https://www.npmjs.com/package/react-native-unilist)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **The most powerful, flexible, and beautiful FlatList & ScrollView wrapper for React Native.**

---

## 🚀 Why use `react-native-unilist`?

- **All-in-one**: FlatList, ScrollView, Grid, Masonry, Carousel, Cards, Pagination, Search, Themes, and more!
- **Super easy**: Minimal code, maximum features.
- **Beautiful UI**: Pre-built card designs, layouts, and theme system.
- **SEO Keywords**: React Native List, FlatList, ScrollView, Grid, Masonry, Carousel, Card, Pagination, Search, Theme, Universal List, Best List Library, react-native-unilist

---

## 📦 Installation

```bash
npm install react-native-unilist
# or
yarn add react-native-unilist
```

---

## ⚡ Quick Example

```jsx
import { UniList, ElevatedCard } from 'react-native-unilist';

const data = [
  { id: 1, title: 'Item 1', subtitle: 'Subtitle 1' },
  { id: 2, title: 'Item 2', subtitle: 'Subtitle 2' },
];

<UniList
  data={data}
  renderItem={item => (
    <ElevatedCard title={item.title} subtitle={item.subtitle} />
  )}
/>
```

---

## ✨ Features

- **FlatList & ScrollView**: Smart switching, best performance
- **Pre-built Cards**: 5 types × 5 styles (Modern, Classic, Minimal, Material, Neumorphic)
- **Layouts**: Grid, Masonry, Carousel
- **Theme System**: Light/Dark + color schemes
- **Pagination**: Infinite scroll, loading states
- **Search & Filter**: Built-in hooks, highlight results
- **Horizontal/Vertical**: Both directions
- **Loading/Empty States**: Customizable
- **Imperative API**: Scroll to index/top
- **TypeScript Support**: Full types
- **SEO Optimized**: All major list keywords

---

## 🖼️ Card & Layout Examples

```jsx
import { ElevatedCard, OutlinedCard, GradientCard, GlassCard } from 'react-native-unilist';

<ElevatedCard title="Modern Card" cardStyle="modern">...</ElevatedCard>
<OutlinedCard title="Classic Card" cardStyle="classic">...</OutlinedCard>
<GradientCard title="Gradient Card" cardStyle="material">...</GradientCard>
<GlassCard title="Glass Card" cardStyle="neumorphic">...</GlassCard>
```

**Grid Layout:**
```jsx
import { GridLayout } from 'react-native-unilist';
<GridLayout columns={2} spacing={12}>...</GridLayout>
```

**Carousel Layout:**
```jsx
import { CarouselLayout } from 'react-native-unilist';
<CarouselLayout autoplay interval={3000} showDots>...</CarouselLayout>
```

**Masonry Layout:**
```jsx
import { MasonryLayout } from 'react-native-unilist';
<MasonryLayout columns={2} spacing={8}>...</MasonryLayout>
```

---

## 🎨 Theme System

```jsx
import { ThemeManager, useTheme } from 'react-native-unilist';
ThemeManager.getInstance().setThemeType('dark', 'blue');
const theme = useTheme();
```

---

## 🔍 Pagination & Search

**Pagination:**
```jsx
import { usePagination } from 'react-native-unilist';
const { data, loading, hasMore, loadMore } = usePagination({ ... });
```

**Search:**
```jsx
import { useSearch } from 'react-native-unilist';
const { query, results, setQuery } = useSearch({ ... });
```

---

## 📝 Props Reference

### UniList
| Prop                | Type                                | Description                       |
|---------------------|-------------------------------------|-----------------------------------|
| data                | array                               | List data                         |
| renderItem          | function(item, index) => ReactNode  | Render each item                  |
| children            | ReactNode                           | For ScrollView mode               |
| spacing             | number                              | Space between items               |
| horizontal          | boolean                             | Horizontal scroll                 |
| ListEmptyComponent  | ReactNode                           | Empty state UI                    |
| loading             | boolean                             | Loading state                     |
| contentContainerStyle| style                              | Container style                   |

### Card
| Prop         | Type      | Description                       |
|--------------|-----------|-----------------------------------|
| type         | string    | elevated, outlined, filled, ...   |
| cardStyle    | string    | modern, classic, minimal, ...     |
| title        | string    | Card title                        |
| subtitle     | string    | Card subtitle                     |
| children     | ReactNode | Card content                      |
| ...          | ...       | ...                               |

---

## 📚 More Examples
- [See USAGE_EXAMPLES.md for advanced usage](./USAGE_EXAMPLES.md)
- [See Example App](./SampleProject/App.tsx)

---

## 🤝 Contributing
Pull requests welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📄 License
MIT

---

**Keywords:** react-native, FlatList, ScrollView, List, Grid, Masonry, Carousel, Card, Pagination, Search, Theme, Universal List, Best List Library, react-native-unilist

---

Made with ❤️ by [SamadK01](https://github.com/SamadK01)
