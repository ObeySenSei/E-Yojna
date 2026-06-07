import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getThemeStyles } from '../styles/styles';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../constants/data';

export default function CategoryFilters({ selectedCategory, setSelectedCategory }) {
  const { isDarkMode } = useTheme();
  const styles = getThemeStyles(isDarkMode);

  return (
    <View style={styles.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}