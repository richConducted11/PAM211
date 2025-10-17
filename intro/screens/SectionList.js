import React from 'react';
import { View, Text, SectionList, StyleSheet, SafeAreaView } from 'react-native';

const DATA = [
  { title: 'Frutas', data: ['Manzana', 'Banana', 'Mango'] },
  { title: 'Verduras', data: ['Zanahoria', 'Lechuga', 'Espinaca'] },
  { title: 'Granos', data: ['Arroz', 'Frijoles', 'Lentejas'] },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lista por Secciones</Text>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 40, 
    paddingHorizontal: 16, 
    backgroundColor: '#fff' 
  },
  header: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginBottom: 8 
  },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: '700', 
    backgroundColor: '#eee', 
    padding: 8, 
    marginTop: 10, 
    borderRadius: 6 
  },
  item: { 
    padding: 10, 
    fontSize: 16, 
    backgroundColor: '#f9f9f9', 
    marginVertical: 4, 
    borderRadius: 6 
  },
  separator: { 
    height: 6 
  },
});