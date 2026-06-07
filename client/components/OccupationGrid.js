import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { OCCUPATIONS } from '../constants/data';

export default function OccupationGrid({ selectedOccupation, setSelectedOccupation }) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.occupationScrollView}
      contentContainerStyle={styles.occupationScrollContent}
    >
      {OCCUPATIONS.map(occ => (
        <TouchableOpacity 
          key={occ.id}
          style={[styles.occCard, selectedOccupation === occ.id && styles.occCardActive]}
          onPress={() => setSelectedOccupation(occ.id)}
        >
          <Text style={styles.occIcon}>{occ.icon}</Text>
          <Text style={[styles.occName, selectedOccupation === occ.id && styles.occNameActive]}>
            {occ.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  occupationScrollView: { 
    maxHeight: 120,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  occupationScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12
  },
  occCard: { 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 30, 
    backgroundColor: '#F5F5F5',
    minWidth: 120,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  occCardActive: { backgroundColor: '#FF9933' },
  occIcon: { fontSize: 28, marginBottom: 6 },
  occName: { fontSize: 12, color: '#666', fontWeight: '500' },
  occNameActive: { color: '#FFF' }
});