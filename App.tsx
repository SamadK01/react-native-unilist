import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';

// Direct imports from source (for testing)
import { UniList } from '../UniList Library/src/UniList';
import { ElevatedCard } from '../UniList Library/src/components/Card';

export default function App() {
  const [currentView, setCurrentView] = useState<'list' | 'grid'>('list');

  // Sample data
  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    subtitle: `Category ${['Electronics', 'Fashion', 'Home', 'Books'][i % 4]}`,
    content: `This is a detailed description for product ${i + 1}.`,
    price: Math.floor(Math.random() * 1000) + 100,
  }));

  const renderCard = (item: any) => (
    <ElevatedCard
      key={item.id}
      title={item.title}
      subtitle={`${item.subtitle} • $${item.price}`}
      cardStyle="modern"
      style={styles.card}
    >
      <Text style={styles.cardContent}>{item.content}</Text>
    </ElevatedCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ UniList Test</Text>
        <TouchableOpacity 
          style={styles.viewButton} 
          onPress={() => setCurrentView(prev => prev === 'list' ? 'grid' : 'list')}
        >
          <Text style={styles.viewButtonText}>
            {currentView === 'list' ? '📐 Grid' : '📱 List'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {currentView === 'list' ? (
          <UniList
            data={data}
            renderItem={renderCard}
            spacing={16}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>
                  Showing {data.length} products in List View
                </Text>
              </View>
            }
          />
        ) : (
          <ScrollView style={styles.gridContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>
                Showing {data.length} products in Grid View
              </Text>
            </View>
            <View style={styles.grid}>
              {data.map(renderCard)}
            </View>
          </ScrollView>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✅ UniList Library Working! 
        </Text>
        <Text style={styles.footerText}>
          View: {currentView} • Items: {data.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

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
  viewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listHeader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 14,
    color: '#666',
  },
  gridContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E5E9',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
}); 