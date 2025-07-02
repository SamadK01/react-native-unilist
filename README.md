# react-native-unilist

**UniList** - The most powerful React Native list component that handles both FlatList and ScrollView seamlessly. This library provides everything you need to create beautiful, interactive lists with minimal code.

## 🚀 Features

- **Dual Modes**: Supports both FlatList and ScrollView
- **Smart Switching**: Automatically chooses FlatList or ScrollView based on props
- **Pre-built Cards**: 5 card types with 5 design styles
- **Layout System**: Grid, Masonry, and Carousel layouts
- **Theme System**: Light, dark, and custom themes with color schemes
- **Pagination**: Built-in pagination with loading states
- **Search & Filter**: Built-in search functionality with highlighting
- **Spacing Support**: Easily add spacing between items
- **Loading States**: Support for loading indicators
- **Empty States**: Custom UI for empty lists
- **Imperative API**: Methods for programmatic scrolling
- **Horizontal/Vertical**: Scroll support in both directions
- **TypeScript Support**: Full TypeScript support

## 📦 Installation

```sh
npm install react-native-unilist
```

or

```sh
yarn add react-native-unilist
```

## 🎯 Quick Start

### Basic Usage

```jsx
import React from 'react';
import { Text, View } from 'react-native';
import { UniList, ElevatedCard } from 'react-native-unilist';

const MyComponent = () => {
  const data = [
    { id: 1, title: 'Card 1', subtitle: 'Subtitle 1', content: 'Content 1' },
    { id: 2, title: 'Card 2', subtitle: 'Subtitle 2', content: 'Content 2' },
  ];

  return (
    <UniList
      data={data}
      renderItem={(item) => (
        <ElevatedCard
          title={item.title}
          subtitle={item.subtitle}
          cardStyle="modern"
        >
          <Text>{item.content}</Text>
        </ElevatedCard>
      )}
      spacing={16}
    />
  );
};
```

## 🎨 Card Components

### Available Card Types

```jsx
import { 
  ElevatedCard,    // With shadow and elevation
  OutlinedCard,    // With border
  FilledCard,      // Solid background
  GradientCard,    // Gradient background
  GlassCard        // Glass effect
} from 'react-native-unilist';
```

### Card Styles

```jsx
// 5 different design styles
<ElevatedCard cardStyle="modern">    // Clean and modern
<ElevatedCard cardStyle="classic">   // Traditional design
<ElevatedCard cardStyle="minimal">   // Minimalist approach
<ElevatedCard cardStyle="material">  // Material Design
<ElevatedCard cardStyle="neumorphic"> // Neumorphic design
```

### Card Usage Examples

```jsx
// Basic card
<ElevatedCard
  title="Card Title"
  subtitle="Card Subtitle"
  cardStyle="modern"
>
  <Text>Card content goes here</Text>
</ElevatedCard>

// Custom styled card
<GradientCard
  title="Custom Card"
  subtitle="With custom colors"
  backgroundColor="#FF6B6B"
  borderRadius={20}
  elevation={10}
>
  <Text style={{ color: 'white' }}>Custom content</Text>
</GradientCard>
```

## 📐 Layout System

### Grid Layout

```jsx
import { GridLayout } from 'react-native-unilist';

<GridLayout columns={2} spacing={16}>
  <ElevatedCard title="Item 1" />
  <ElevatedCard title="Item 2" />
  <ElevatedCard title="Item 3" />
  <ElevatedCard title="Item 4" />
</GridLayout>
```

### Carousel Layout

```jsx
import { CarouselLayout } from 'react-native-unilist';

<CarouselLayout
  autoplay={true}
  interval={3000}
  showDots={true}
  itemWidth={300}
>
  <ElevatedCard title="Slide 1" />
  <ElevatedCard title="Slide 2" />
  <ElevatedCard title="Slide 3" />
</CarouselLayout>
```

### Masonry Layout

```jsx
import { MasonryLayout } from 'react-native-unilist';

<MasonryLayout columns={3} spacing={8}>
  <ElevatedCard title="Item 1" />
  <ElevatedCard title="Item 2" />
  <ElevatedCard title="Item 3" />
</MasonryLayout>
```

## 🎨 Theme System

### Using Themes

```jsx
import { ThemeManager, useTheme } from 'react-native-unilist';

// Set theme
ThemeManager.getInstance().setThemeType('dark', 'blue');

// Use theme in component
const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <ElevatedCard
      style={{ backgroundColor: theme.colors.surface }}
    >
      <Text style={{ color: theme.colors.text }}>
        Themed content
      </Text>
    </ElevatedCard>
  );
};
```

### Available Themes

```jsx
// Theme types
ThemeManager.getInstance().setThemeType('light', 'blue');
ThemeManager.getInstance().setThemeType('dark', 'purple');
ThemeManager.getInstance().setThemeType('light', 'green');

// Custom theme
ThemeManager.getInstance().setCustomTheme({
  primary: '#FF0000',
  secondary: '#00FF00',
  background: '#000000',
});
```

## 📄 Pagination

### Using Pagination Hook

```jsx
import { usePagination } from 'react-native-unilist';

const MyComponent = () => {
  const {
    data,
    loading,
    hasMore,
    loadMore,
    refresh
  } = usePagination({
    pageSize: 20,
    onLoadMore: async (page) => {
      // Fetch data from API
      const response = await fetch(`/api/items?page=${page}`);
      return response.json();
    }
  });

  return (
    <UniList
      data={data}
      renderItem={(item) => <ElevatedCard title={item.title} />}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" /> : null
      }
    />
  );
};
```

## 🔍 Search & Filter

### Using Search Hook

```jsx
import { useSearch } from 'react-native-unilist';

const MyComponent = () => {
  const {
    query,
    results,
    setQuery,
    clearSearch
  } = useSearch({
    data: originalData,
    searchFields: ['title', 'subtitle', 'content'],
    debounceMs: 300,
    highlightResults: true
  });

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search items..."
      />
      <UniList
        data={results}
        renderItem={(item) => <ElevatedCard title={item.title} />}
      />
    </View>
  );
};
```

## 🎯 Advanced Usage Examples

### 1. Complete App with All Features

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import {
  UniList,
  ElevatedCard,
  GridLayout,
  usePagination,
  useSearch,
  ThemeManager
} from 'react-native-unilist';

const App = () => {
  // Set theme
  React.useEffect(() => {
    ThemeManager.getInstance().setThemeType('dark', 'blue');
  }, []);

  // Pagination
  const {
    data,
    loading,
    hasMore,
    loadMore
  } = usePagination({
    pageSize: 10,
    onLoadMore: async (page) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i,
        title: `Item ${page * 10 + i}`,
        subtitle: `Subtitle ${page * 10 + i}`,
        content: `Content for item ${page * 10 + i}`
      }));
    }
  });

  // Search
  const {
    query,
    results,
    setQuery
  } = useSearch({
    data,
    searchFields: ['title', 'subtitle'],
    debounceMs: 300
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search items..."
        style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 16 }}
      />
      
      <UniList
        data={results}
        renderItem={(item) => (
          <ElevatedCard
            title={item.title}
            subtitle={item.subtitle}
            cardStyle="modern"
          >
            <Text>{item.content}</Text>
          </ElevatedCard>
        )}
        spacing={16}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
      />
    </View>
  );
};
```

### 2. Grid Layout with Cards

```jsx
import React from 'react';
import { View, Dimensions } from 'react-native';
import { UniList, ElevatedCard } from 'react-native-unilist';

const MyComponent = () => {
  const { width } = Dimensions.get('window');
  const cardWidth = (width - 48) / 2;

  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    subtitle: `Subtitle ${i + 1}`,
  }));

  return (
    <UniList
      data={data}
      renderItem={(item) => (
        <View style={{ width: cardWidth }}>
          <ElevatedCard
            title={item.title}
            subtitle={item.subtitle}
            cardStyle="minimal"
            style={{ margin: 8 }}
          />
        </View>
      )}
      spacing={8}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};
```

### 3. Horizontal Carousel

```jsx
import React from 'react';
import { View, Dimensions } from 'react-native';
import { UniList, GlassCard } from 'react-native-unilist';

const MyComponent = () => {
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.8;

  const data = [
    { id: 1, title: 'Featured 1', subtitle: 'Premium content' },
    { id: 2, title: 'Featured 2', subtitle: 'Premium content' },
    { id: 3, title: 'Featured 3', subtitle: 'Premium content' },
  ];

  return (
    <View style={{ height: 200 }}>
      <UniList
        data={data}
        horizontal={true}
        renderItem={(item) => (
          <View style={{ width: cardWidth }}>
            <GlassCard
              title={item.title}
              subtitle={item.subtitle}
              cardStyle="modern"
              style={{ margin: 16 }}
            />
          </View>
        )}
        spacing={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
    </View>
  );
};
```

## 📋 Props Reference

### UniListProps

| Prop | Type | Description |
|------|------|-------------|
| `data` | `ItemT[]` | Data array - triggers FlatList mode |
| `renderItem` | `(item: ItemT, index: number) => ReactElement` | Function to render items in FlatList mode |
| `children` | `ReactNode` | Static children for ScrollView mode |
| `spacing` | `number` | Spacing between items (in px) |
| `horizontal` | `boolean` | For horizontal scrolling |
| `ListEmptyComponent` | `ReactElement` | Custom component for empty state |
| `loading` | `boolean` | Loading state |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | Custom container styling |

### CardProps

| Prop | Type | Description |
|------|------|-------------|
| `type` | `CardType` | Card type: elevated, outlined, filled, gradient, glass |
| `cardStyle` | `CardStyle` | Design style: modern, classic, minimal, material, neumorphic |
| `title` | `string` | Card title |
| `subtitle` | `string` | Card subtitle |
| `children` | `ReactNode` | Card content |
| `backgroundColor` | `string` | Custom background color |
| `borderRadius` | `number` | Custom border radius |
| `elevation` | `number` | Shadow elevation (Android) |

### UniListRef (Imperative API)

| Method | Parameters | Description |
|--------|------------|-------------|
| `scrollToIndex` | `{ index: number, animated?: boolean }` | Scroll to specific index (FlatList only) |
| `scrollToTop` | `animated?: boolean` | Scroll to top |

## 🔄 Mode Switching Logic

UniList automatically switches between two modes:

1. **FlatList Mode**: When both `data` and `renderItem` are provided
2. **ScrollView Mode**: When `data` is undefined and `children` are provided

## 🎨 Styling Tips

- Use `spacing` prop for consistent spacing between items
- Use `contentContainerStyle` for container styling
- Set `width` and `height` properly with `horizontal` prop
- Use individual item styling for custom shadows and borders
- Leverage the theme system for consistent colors and spacing

## 🚀 Performance Tips

- Use FlatList mode for large lists
- Optimize `keyExtractor` function for unique keys
- Use `getItemLayout` for fixed height items
- Use `windowSize` and `maxToRenderPerBatch` props for performance tuning
- Implement pagination for large datasets
- Use search debouncing to avoid excessive filtering

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (React Native Web)

## 🤝 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## 📄 License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
