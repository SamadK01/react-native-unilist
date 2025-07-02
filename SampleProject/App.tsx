import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  SafeAreaView,
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
  type ColorScheme,
} from 'react-native-unilist';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');
  const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>('blue');
  const [currentView, setCurrentView] = useState<'list' | 'grid' | 'carousel' | 'masonry'>('list');
  const [showSearch, setShowSearch] = useState(false);

  // Sample data for the app
  const sampleData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    subtitle: `Category ${['Electronics', 'Fashion', 'Home', 'Books'][i % 4]}`,
    content: `This is a detailed description for product ${i + 1}. It includes all the important features and benefits that customers need to know.`,
    price: Math.floor(Math.random() * 1000) + 100,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
    imageUrl: `https://picsum.photos/300/200?random=${i + 1}`,
    inStock: Math.random() > 0.3,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
  }));

  // Pagination hook
  const {
    data,
    loading,
    hasMore,
    loadMore,
    refresh,
    error,
  } = usePagination({
    pageSize: 20,
    initialData: sampleData.slice(0, 20),
    onLoadMore: async (page) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const startIndex = (page - 1) * 20;
      const endIndex = startIndex + 20;
      return sampleData.slice(startIndex, endIndex);
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to load more items');
    },
  });

  // Search hook
  const {
    query,
    results,
    setQuery,
    clearSearch,
    loading: searchLoading,
  } = useSearch({
    data: sampleData,
    searchFields: ['title', 'subtitle', 'content'],
    debounceMs: 500,
    highlightResults: true,
  });

  // Theme management
  useEffect(() => {
    ThemeManager.getInstance().setThemeType(currentTheme, currentColorScheme);
  }, [currentTheme, currentColorScheme]);

  // Card press handler
  const handleCardPress = (item: any) => {
    Alert.alert(
      item.title,
      `Price: $${item.price}\nRating: ${item.rating}/5\nIn Stock: ${item.inStock ? 'Yes' : 'No'}`,
      [
        { text: 'Add to Cart', onPress: () => Alert.alert('Added to cart!') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Render different card types
  const renderCard = (item: any, index: number) => {
    const cardTypes = [ElevatedCard, OutlinedCard, GradientCard, GlassCard];
    const CardComponent = cardTypes[index % cardTypes.length];

    if (!CardComponent) return null;

    const isDiscounted = item.discount > 0;
    const discountedPrice = isDiscounted ? item.price * (1 - item.discount / 100) : item.price;

    return (
      <CardComponent
        key={item.id}
        title={item.title}
        subtitle={`${item.subtitle} • Rating: ${item.rating}⭐`}
        cardStyle={index % 2 === 0 ? 'modern' : 'minimal'}
        style={styles.card}
        onPress={() => handleCardPress(item)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.content}
          </Text>
          
          <View style={styles.priceContainer}>
            {isDiscounted && (
              <Text style={styles.originalPrice}>${item.price}</Text>
            )}
            <Text style={styles.price}>${discountedPrice.toFixed(0)}</Text>
            {isDiscounted && (
              <Text style={styles.discount}>-{item.discount}%</Text>
            )}
          </View>

          <View style={styles.cardFooter}>
            <View style={[
              styles.stockIndicator,
              { backgroundColor: item.inStock ? '#34C759' : '#FF3B30' }
            ]}>
              <Text style={styles.stockText}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CardComponent>
    );
  };

  // Render carousel item
  const renderCarouselItem = (item: any, index: number) => (
    <View style={{ width: width * 0.85 }}>
      <GlassCard
        title={item.title}
        subtitle={item.subtitle}
        cardStyle="modern"
        style={styles.carouselCard}
      >
        <Text style={styles.carouselContent}>{item.content}</Text>
        <Text style={styles.carouselPrice}>${item.price}</Text>
      </GlassCard>
    </View>
  );

  // Header component
  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>🛍️ UniList Store</Text>
      <View style={styles.headerControls}>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')}
        >
          <Text style={styles.headerButtonText}>
            {currentTheme === 'light' ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => setShowSearch(!showSearch)}
        >
          <Text style={styles.headerButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // View selector
  const ViewSelector = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.viewSelector}
    >
      {[
        { key: 'list', icon: '📱', label: 'List' },
        { key: 'grid', icon: '📐', label: 'Grid' },
        { key: 'carousel', icon: '🎠', label: 'Carousel' },
        { key: 'masonry', icon: '🧱', label: 'Masonry' },
      ].map((view) => (
        <TouchableOpacity
          key={view.key}
          style={[
            styles.viewButton,
            currentView === view.key && styles.viewButtonActive
          ]}
          onPress={() => setCurrentView(view.key as any)}
        >
          <Text style={styles.viewButtonIcon}>{view.icon}</Text>
          <Text style={styles.viewButtonLabel}>{view.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Color scheme selector
  const ColorSchemeSelector = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.colorSchemeContainer}
    >
      {(['blue', 'green', 'purple', 'orange', 'red'] as ColorScheme[]).map(scheme => (
        <TouchableOpacity
          key={scheme}
          style={[
            styles.colorButton,
            { backgroundColor: getColorForScheme(scheme) },
            currentColorScheme === scheme && styles.colorButtonActive
          ]}
          onPress={() => setCurrentColorScheme(scheme)}
        >
          <Text style={styles.colorButtonText}>{scheme}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Search bar
  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search products..."
        style={styles.searchInput}
        placeholderTextColor="#999"
      />
      {query.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Main content
  const renderContent = () => {
    const displayData = query ? results : data;

    switch (currentView) {
      case 'carousel':
        return (
          <View style={styles.carouselContainer}>
            <CarouselLayout
              autoplay={true}
              interval={4000}
              showDots={true}
              dotColor="#CCCCCC"
              activeDotColor="#007AFF"
            >
              {displayData.slice(0, 8).map((item, index) => renderCarouselItem(item, index))}
            </CarouselLayout>
          </View>
        );

      case 'grid':
        return (
          <GridLayout columns={2} spacing={12} style={styles.gridContainer}>
            {displayData.slice(0, 20).map((item, index) => renderCard(item, index))}
          </GridLayout>
        );

      case 'masonry':
        return (
          <MasonryLayout columns={2} spacing={8} style={styles.masonryContainer}>
            {displayData.slice(0, 20).map((item, index) => renderCard(item, index))}
          </MasonryLayout>
        );

      default: // list
        return (
          <UniList
            data={displayData}
            renderItem={(item, index) => renderCard(item, index)}
            spacing={16}
            onEndReached={hasMore ? loadMore : undefined}
            onEndReachedThreshold={0.5}
            onRefresh={refresh}
            refreshing={loading}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>
                  Showing {displayData.length} products
                  {query && ` for "${query}"`}
                </Text>
              </View>
            }
            ListFooterComponent={
              loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#007AFF" />
                  <Text style={styles.loadingText}>Loading more products...</Text>
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🛍️</Text>
                <Text style={styles.emptyText}>
                  {query ? 'No products found for your search.' : 'No products available.'}
                </Text>
                {query && (
                  <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
                    <Text style={styles.clearSearchButtonText}>Clear Search</Text>
                  </TouchableOpacity>
                )}
              </View>
            }
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <Header />
      
      {showSearch && <SearchBar />}
      
      <ViewSelector />
      
      <ColorSchemeSelector />
      
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Stats footer */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {query ? `Found ${results.length} products` : `Loaded ${data.length} products`}
        </Text>
        <Text style={styles.statsText}>
          Theme: {currentTheme} • Color: {currentColorScheme} • View: {currentView}
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Helper function for color schemes
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
  headerButton: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 16,
  },
  viewSelector: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    minWidth: 60,
  },
  viewButtonActive: {
    backgroundColor: '#007AFF',
  },
  viewButtonIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  viewButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  colorSchemeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
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
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    margin: 0,
  },
  cardContent: {
    padding: 0,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: 'bold',
    marginLeft: 8,
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  carouselContainer: {
    height: 300,
  },
  carouselCard: {
    margin: 16,
  },
  carouselContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  carouselPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  gridContainer: {
    flex: 1,
  },
  masonryContainer: {
    flex: 1,
  },
  listHeader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 14,
    color: '#666',
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
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  clearSearchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  clearSearchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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