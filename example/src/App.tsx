import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ActivityIndicator, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
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
  ThemeManager,
  type ThemeType,
  type ColorScheme
} from 'react-native-unilist';

const { width } = Dimensions.get('window');

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');
  const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>('blue');
  const [showGrid, setShowGrid] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);

  // Sample data
  const sampleData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    subtitle: `Subtitle for item ${i + 1}`,
    content: `This is the content for item ${i + 1}. It contains some sample text to demonstrate the card layout.`,
    category: ['Tech', 'Design', 'Business', 'Lifestyle'][i % 4],
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  // Pagination
  const {
    data,
    loading,
    hasMore,
    loadMore,
    refresh
  } = usePagination({
    pageSize: 10,
    initialData: sampleData.slice(0, 10),
    onLoadMore: async (page) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      return sampleData.slice(startIndex, endIndex);
    }
  });

  // Search
  const {
    query,
    results,
    setQuery,
    clearSearch
  } = useSearch({
    data: sampleData,
    searchFields: ['title', 'subtitle', 'content', 'category'],
    debounceMs: 300,
    highlightResults: true
  });

  // Theme management
  useEffect(() => {
    ThemeManager.getInstance().setThemeType(currentTheme, currentColorScheme);
  }, [currentTheme, currentColorScheme]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeColorScheme = (scheme: ColorScheme) => {
    setCurrentColorScheme(scheme);
  };

  const renderCard = (item: any, index: number) => {
    const cardTypes = [
      ElevatedCard,
      OutlinedCard,
      GradientCard,
      GlassCard
    ];
    const CardComponent = cardTypes[index % cardTypes.length];

    if (!CardComponent) return null;

    return (
      <CardComponent
        key={item.id}
        title={item.title}
        subtitle={`${item.subtitle} • ${item.category}`}
        cardStyle={index % 2 === 0 ? 'modern' : 'minimal'}
        style={{ margin: 8 }}
      >
        <Text style={{ marginBottom: 8 }}>{item.content}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#666', fontSize: 12 }}>Rating: {item.rating}/5</Text>
          <Text style={{ color: '#007AFF', fontSize: 12 }}>Read More</Text>
        </View>
      </CardComponent>
    );
  };

  const renderCarouselItem = (item: any, index: number) => (
    <View style={{ width: width * 0.8 }}>
      <GlassCard
        title={item.title}
        subtitle={item.subtitle}
        cardStyle="modern"
        style={{ margin: 16 }}
      >
        <Text>{item.content}</Text>
      </GlassCard>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UniList Demo</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity style={styles.button} onPress={toggleTheme}>
            <Text style={styles.buttonText}>
              {currentTheme === 'light' ? '🌙' : '☀️'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowGrid(!showGrid)}>
            <Text style={styles.buttonText}>{showGrid ? '📱' : '📐'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowCarousel(!showCarousel)}>
            <Text style={styles.buttonText}>{showCarousel ? '📱' : '🎠'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Color Scheme Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorSchemeContainer}>
        {(['blue', 'green', 'purple', 'orange', 'red'] as ColorScheme[]).map(scheme => (
          <TouchableOpacity
            key={scheme}
            style={[
              styles.colorButton,
              { backgroundColor: getColorForScheme(scheme) },
              currentColorScheme === scheme && styles.colorButtonActive
            ]}
            onPress={() => changeColorScheme(scheme)}
          >
            <Text style={styles.colorButtonText}>{scheme}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search items..."
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        {query.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {showCarousel ? (
        <View style={{ height: 300 }}>
          <CarouselLayout
            autoplay={true}
            interval={3000}
            showDots={true}
            dotColor="#CCCCCC"
            activeDotColor="#007AFF"
          >
            {sampleData.slice(0, 5).map((item, index) => renderCarouselItem(item, index))}
          </CarouselLayout>
        </View>
      ) : showGrid ? (
        <GridLayout columns={2} spacing={8} style={styles.gridContainer}>
          {results.slice(0, 10).map((item, index) => renderCard(item, index))}
        </GridLayout>
      ) : (
        <UniList
          data={results}
          renderItem={(item, index) => renderCard(item, index)}
          spacing={12}
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.5}
          onRefresh={refresh}
          refreshing={loading}
          ListFooterComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading more items...</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {query ? 'No items found for your search.' : 'No items available.'}
              </Text>
            </View>
          }
        />
      )}

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Showing {results.length} of {sampleData.length} items
        </Text>
        {query && (
          <Text style={styles.statsText}>
            Search: "{query}"
          </Text>
        )}
      </View>
    </View>
  );
}

const getColorForScheme = (scheme: ColorScheme): string => {
  const colors: Record<ColorScheme, string> = {
    blue: '#007AFF',
    green: '#34C759',
    purple: '#AF52DE',
    orange: '#FF9500',
    red: '#FF3B30',
    custom: '#007AFF',
  };
  return colors[scheme];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerControls: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  colorSchemeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  colorButtonActive: {
    borderWidth: 2,
    borderColor: '#000',
  },
  colorButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E1E5E9',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#666',
  },
  gridContainer: {
    flex: 1,
    padding: 8,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E5E9',
  },
  statsText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});
