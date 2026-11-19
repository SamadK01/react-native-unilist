import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CarouselLayout, ElevatedCard, GridLayout, MasonryLayout, ThemeManager, UniList, useTheme } from 'react-native-unilist';

type Mode = 'list' | 'grid' | 'masonry' | 'carousel' | 'chat';
type Row = { id: string; title: string; body: string };
type Message = { id: string; role: 'You' | 'AI'; text: string };

const tenThousandRows: Row[] = Array.from({ length: 10_000 }, (_, index) => ({
  id: String(index), title: `Fast row ${index + 1}`, body: 'Virtualized with stable keys and clipped off-screen cells.',
}));

export default function App() {
  const [mode, setMode] = useState<Mode>('list');
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'You', text: 'Write a compact release note.' },
    { id: '2', role: 'AI', text: 'v2 is ready: faster feeds, chat mode, and typed UI primitives.' },
  ]);
  const theme = useTheme();

  const streamReply = useCallback(() => {
    const id = String(Date.now());
    setMessages(current => [...current, { id, role: 'AI', text: 'Streaming' }]);
    const tokens = [' a', ' concise', ' response', ' from', ' UniList.'];
    tokens.forEach((token, index) => setTimeout(() => {
      setMessages(current => current.map(message => message.id === id ? { ...message, text: `${message.text}${token}` } : message));
    }, (index + 1) * 260));
  }, []);

  const renderRow = useCallback((row: Row) => <ElevatedCard title={row.title} subtitle={row.body} cardStyle="minimal" style={styles.card} />, []);
  const controls = useMemo(() => (['list', 'grid', 'masonry', 'carousel', 'chat'] as Mode[]), []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    ThemeManager.getInstance().setThemeType(next ? 'dark' : 'light', 'blue');
  };

  return <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
    <View style={styles.header}>
      <View><Text style={[styles.title, { color: theme.colors.text }]}>UniList v2 playground</Text><Text style={{ color: theme.colors.textSecondary }}>10k fast scroll · AI chat · layouts</Text></View>
      <Pressable style={styles.button} onPress={toggleTheme}><Text>{dark ? 'Light' : 'Dark'}</Text></Pressable>
    </View>
    <View style={styles.controls}>
      {controls.map(value => <Pressable key={value} onPress={() => setMode(value)} style={[styles.pill, mode === value && styles.active]}><Text>{value}</Text></Pressable>)}
      <Pressable onPress={() => setLoading(value => !value)} style={styles.pill}><Text>{loading ? 'Hide skeleton' : 'Skeleton'}</Text></Pressable>
    </View>
    {mode === 'chat' ? <UniList<Message>
      chatMode data={messages} keyExtractor={message => message.id} animateLayout recycleItems
      renderItem={message => <ElevatedCard title={message.role} cardStyle={message.role === 'AI' ? 'material' : 'modern'} style={styles.message}><Text>{message.text}</Text></ElevatedCard>}
      ListFooterComponent={<Pressable onPress={streamReply} style={styles.stream}><Text>Stream AI reply</Text></Pressable>}
    /> : mode === 'grid' ? <GridLayout columns={2} spacing={8}>{tenThousandRows.slice(0, 24).map(renderRow)}</GridLayout>
      : mode === 'masonry' ? <MasonryLayout columns={2} spacing={8}>{tenThousandRows.slice(0, 24).map(renderRow)}</MasonryLayout>
        : mode === 'carousel' ? <CarouselLayout showDots itemWidth={300}>{tenThousandRows.slice(0, 5).map(renderRow)}</CarouselLayout>
          : <UniList<Row> data={tenThousandRows} keyExtractor={row => row.id} renderItem={renderRow} recycleItems loading={loading} skeletonCount={8} skeletonVariant="material" />}
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  title: { fontSize: 22, fontWeight: '700' }, controls: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 12, paddingBottom: 12 },
  pill: { backgroundColor: '#e5e7eb', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 7 }, active: { backgroundColor: '#93c5fd' }, button: { backgroundColor: '#e5e7eb', borderRadius: 8, padding: 9 },
  card: { marginHorizontal: 12 }, message: { marginHorizontal: 12 }, stream: { alignItems: 'center', padding: 16 },
});
