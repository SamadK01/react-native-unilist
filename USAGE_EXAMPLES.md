# UniList Enhanced Usage Examples

## 🚀 **Quick Start with Enhanced Features**

### **1. Pre-built Cards with UniList**

```jsx
import React from 'react';
import { Text, View } from 'react-native';
import { UniList } from 'react-native-unilist';
import { ElevatedCard, OutlinedCard, GradientCard } from 'react-native-unilist';

const MyComponent = () => {
  const data = [
    { id: 1, title: 'Modern Card', subtitle: 'Elevated design', content: 'This is a modern elevated card' },
    { id: 2, title: 'Classic Card', subtitle: 'Outlined design', content: 'This is a classic outlined card' },
    { id: 3, title: 'Gradient Card', subtitle: 'Gradient design', content: 'This is a gradient card' },
  ];

  return (
    <UniList
      data={data}
      renderItem={(item, index) => {
        if (index === 0) {
          return (
            <ElevatedCard
              title={item.title}
              subtitle={item.subtitle}
              cardStyle="modern"
              elevation={8}
            >
              <Text>{item.content}</Text>
            </ElevatedCard>
          );
        } else if (index === 1) {
          return (
            <OutlinedCard
              title={item.title}
              subtitle={item.subtitle}
              cardStyle="classic"
              borderColor="#007AFF"
            >
              <Text>{item.content}</Text>
            </OutlinedCard>
          );
        } else {
          return (
            <GradientCard
              title={item.title}
              subtitle={item.subtitle}
              cardStyle="modern"
            >
              <Text style={{ color: 'white' }}>{item.content}</Text>
            </GradientCard>
          );
        }
      }}
      spacing={16}
    />
  );
};
```

### **2. Grid Layout with Cards**

```jsx
import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { UniList } from 'react-native-unilist';
import { ElevatedCard } from 'react-native-unilist';

const MyComponent = () => {
  const { width } = Dimensions.get('window');
  const cardWidth = (width - 48) / 2; // 2 columns with spacing

  const data = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    subtitle: `Subtitle ${i + 1}`,
    content: `This is card number ${i + 1}`,
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
          >
            <Text>{item.content}</Text>
          </ElevatedCard>
        </View>
      )}
      spacing={8}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};
```

### **3. Horizontal Carousel with Cards**

```jsx
import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { UniList } from 'react-native-unilist';
import { GlassCard } from 'react-native-unilist';

const MyComponent = () => {
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.8; // 80% of screen width

  const data = [
    { id: 1, title: 'Featured Item 1', subtitle: 'Premium content', content: 'This is a featured item' },
    { id: 2, title: 'Featured Item 2', subtitle: 'Premium content', content: 'This is another featured item' },
    { id: 3, title: 'Featured Item 3', subtitle: 'Premium content', content: 'This is the third featured item' },
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
            >
              <Text>{item.content}</Text>
            </GlassCard>
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

### **4. Loading States with Cards**

```jsx
import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { UniList } from 'react-native-unilist';
import { ElevatedCard } from 'react-native-unilist';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData([
        { id: 1, title: 'Loaded Item 1', subtitle: 'From API', content: 'This item was loaded from API' },
        { id: 2, title: 'Loaded Item 2', subtitle: 'From API', content: 'This item was also loaded from API' },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <UniList
      data={data}
      loading={loading}
      renderItem={(item) => (
        <ElevatedCard
          title={item.title}
          subtitle={item.subtitle}
          cardStyle="material"
        >
          <Text>{item.content}</Text>
        </ElevatedCard>
      )}
      ListEmptyComponent={
        loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 16, fontSize: 16 }}>Loading cards...</Text>
          </View>
        ) : (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#666' }}>No cards found</Text>
          </View>
        )
      }
      spacing={16}
    />
  );
};
```

### **5. Interactive Cards with Press Events**

```jsx
import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { UniList } from 'react-native-unilist';
import { ElevatedCard, OutlinedCard } from 'react-native-unilist';

const MyComponent = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());

  const data = [
    { id: 1, title: 'Selectable Card 1', subtitle: 'Tap to select', content: 'This card can be selected' },
    { id: 2, title: 'Selectable Card 2', subtitle: 'Tap to select', content: 'This card can also be selected' },
    { id: 3, title: 'Selectable Card 3', subtitle: 'Tap to select', content: 'This card can be selected too' },
  ];

  const handleCardPress = (item) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(item.id)) {
      newSelected.delete(item.id);
    } else {
      newSelected.add(item.id);
    }
    setSelectedItems(newSelected);
    Alert.alert('Card Selected', `You selected: ${item.title}`);
  };

  return (
    <UniList
      data={data}
      renderItem={(item) => {
        const isSelected = selectedItems.has(item.id);
        
        return isSelected ? (
          <ElevatedCard
            title={item.title}
            subtitle={item.subtitle}
            cardStyle="modern"
            backgroundColor="#E3F2FD"
            borderColor="#2196F3"
            onPress={() => handleCardPress(item)}
          >
            <Text>{item.content}</Text>
            <Text style={{ color: '#2196F3', fontWeight: 'bold', marginTop: 8 }}>
              ✓ Selected
            </Text>
          </ElevatedCard>
        ) : (
          <OutlinedCard
            title={item.title}
            subtitle={item.subtitle}
            cardStyle="minimal"
            onPress={() => handleCardPress(item)}
          >
            <Text>{item.content}</Text>
          </OutlinedCard>
        );
      }}
      spacing={12}
    />
  );
};
```

### **6. Custom Card Styling**

```jsx
import React from 'react';
import { Text, View } from 'react-native';
import { UniList } from 'react-native-unilist';
import { ElevatedCard } from 'react-native-unilist';

const MyComponent = () => {
  const data = [
    { 
      id: 1, 
      title: 'Custom Card 1', 
      subtitle: 'With custom styling', 
      content: 'This card has custom colors and styling',
      color: '#FF6B6B'
    },
    { 
      id: 2, 
      title: 'Custom Card 2', 
      subtitle: 'With custom styling', 
      content: 'This card has different custom colors',
      color: '#4ECDC4'
    },
    { 
      id: 3, 
      title: 'Custom Card 3', 
      subtitle: 'With custom styling', 
      content: 'This card has another custom color scheme',
      color: '#45B7D1'
    },
  ];

  return (
    <UniList
      data={data}
      renderItem={(item) => (
        <ElevatedCard
          title={item.title}
          subtitle={item.subtitle}
          cardStyle="modern"
          backgroundColor={item.color}
          borderRadius={20}
          elevation={10}
          shadowColor={item.color}
          shadowOpacity={0.3}
          shadowRadius={8}
          style={{ margin: 12 }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>{item.content}</Text>
        </ElevatedCard>
      )}
      spacing={16}
    />
  );
};
```

### **7. Mixed Content with Cards**

```jsx
import React from 'react';
import { Text, View, Image } from 'react-native';
import { UniList } from 'react-native-unilist';
import { ElevatedCard, OutlinedCard } from 'react-native-unilist';

const MyComponent = () => {
  const data = [
    { 
      id: 1, 
      type: 'image',
      title: 'Image Card', 
      subtitle: 'With image content', 
      imageUrl: 'https://via.placeholder.com/300x200',
      content: 'This card contains an image'
    },
    { 
      id: 2, 
      type: 'text',
      title: 'Text Card', 
      subtitle: 'With text content', 
      content: 'This is a text-only card with detailed content that can span multiple lines and provide rich information to the user.'
    },
    { 
      id: 3, 
      type: 'mixed',
      title: 'Mixed Card', 
      subtitle: 'With mixed content', 
      imageUrl: 'https://via.placeholder.com/300x150',
      content: 'This card has both image and text content'
    },
  ];

  return (
    <UniList
      data={data}
      renderItem={(item) => {
        if (item.type === 'image') {
          return (
            <ElevatedCard
              title={item.title}
              subtitle={item.subtitle}
              cardStyle="modern"
            >
              <Image 
                source={{ uri: item.imageUrl }} 
                style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 12 }}
                resizeMode="cover"
              />
              <Text>{item.content}</Text>
            </ElevatedCard>
          );
        } else if (item.type === 'text') {
          return (
            <OutlinedCard
              title={item.title}
              subtitle={item.subtitle}
              cardStyle="classic"
            >
              <Text style={{ lineHeight: 24 }}>{item.content}</Text>
            </OutlinedCard>
          );
        } else {
          return (
            <ElevatedCard
              title={item.title}
              subtitle={item.subtitle}
              cardStyle="material"
            >
              <Image 
                source={{ uri: item.imageUrl }} 
                style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 12 }}
                resizeMode="cover"
              />
              <Text>{item.content}</Text>
            </ElevatedCard>
          );
        }
      }}
      spacing={20}
    />
  );
};
```

## 🎯 **Key Benefits of Enhanced UniList**

### **For Developers:**
- 🚀 **Faster Development**: Pre-built cards save hours of styling
- 🎨 **Consistent Design**: Built-in design system ensures consistency
- 🔧 **Easy Customization**: Simple props for quick modifications
- 📱 **Responsive**: Works on all screen sizes automatically

### **For Users:**
- 👁️ **Better Visual Appeal**: Professional card designs
- 🎯 **Clear Information Hierarchy**: Title, subtitle, content structure
- 💫 **Smooth Interactions**: Built-in press handling
- 📊 **Rich Content Support**: Images, text, mixed content

### **For Projects:**
- ⚡ **Performance**: Optimized rendering for large lists
- 🔄 **Maintainability**: Centralized design system
- 🌍 **Accessibility**: Built-in accessibility features
- 📈 **Scalability**: Easy to add new card types and styles

This enhanced UniList library provides everything you need to create beautiful, interactive lists with minimal code! 