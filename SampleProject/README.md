# UniList Sample Project

This is a sample project that demonstrates all the features of the UniList library.

## 🚀 Features Demonstrated

- ✅ **5 Card Types**: Elevated, Outlined, Gradient, Glass cards
- ✅ **5 Design Styles**: Modern, Classic, Minimal, Material, Neumorphic
- ✅ **4 Layout Views**: List, Grid, Carousel, Masonry
- ✅ **Theme System**: Light/Dark themes with 6 color schemes
- ✅ **Pagination**: Load more on scroll with loading states
- ✅ **Search**: Real-time search with debouncing
- ✅ **Interactive**: Card press handlers and alerts

## 📱 App Features

### 🛍️ E-commerce Store Demo
- **100 Sample Products** with realistic data
- **Product Cards** with prices, ratings, stock status
- **Discount Display** with original and discounted prices
- **Stock Indicators** (In Stock/Out of Stock)
- **Buy Now Buttons** with press handlers

### 🎨 UI Controls
- **Theme Toggle**: Switch between light and dark themes
- **Color Schemes**: Blue, Green, Purple, Orange, Red
- **View Modes**: List, Grid, Carousel, Masonry
- **Search Bar**: Search products by title, category, description

### 📊 Data Features
- **Pagination**: Load 20 items at a time
- **Search**: Filter products in real-time
- **Pull to Refresh**: Refresh data
- **Loading States**: Show loading indicators

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. Run on Device/Simulator
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

## 📁 Project Structure

```
SampleProject/
├── App.tsx              # Main app component
├── package.json         # Dependencies
└── README.md           # This file
```

## 🎯 How to Use UniList in Your Project

### 1. Install the Library
```bash
npm install react-native-unilist
```

### 2. Import Components
```typescript
import {
  UniList,
  ElevatedCard,
  OutlinedCard,
  GradientCard,
  GlassCard,
  GridLayout,
  CarouselLayout,
  MasonryLayout,
  usePagination,
  useSearch,
  ThemeManager
} from 'react-native-unilist';
```

### 3. Basic Usage
```typescript
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
```

### 4. Advanced Features
```typescript
// Pagination
const { data, loading, hasMore, loadMore } = usePagination({
  pageSize: 20,
  onLoadMore: async (page) => fetchData(page)
});

// Search
const { query, results, setQuery } = useSearch({
  data,
  searchFields: ['title', 'subtitle']
});

// Theme
ThemeManager.getInstance().setThemeType('dark', 'blue');
```

## 🎨 Available Components

### Card Types
- `ElevatedCard` - With shadow and elevation
- `OutlinedCard` - With border
- `FilledCard` - Solid background
- `GradientCard` - Gradient background
- `GlassCard` - Glass effect

### Layout Components
- `GridLayout` - Responsive grid
- `CarouselLayout` - Auto-playing carousel
- `MasonryLayout` - Pinterest-style layout

### Hooks
- `usePagination` - Built-in pagination
- `useSearch` - Search functionality

### Theme System
- `ThemeManager` - Global theme management
- Light/Dark themes
- 6 color schemes

## 🚀 Performance Tips

- Use `FlatList` mode for large datasets
- Implement pagination for better performance
- Use search debouncing to avoid excessive filtering
- Optimize card rendering with proper keys

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (React Native Web)

## 🤝 Contributing

Feel free to modify this sample project to test different features or create your own examples! 