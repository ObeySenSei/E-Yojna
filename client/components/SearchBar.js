import React from 'react';
import { View, TextInput } from 'react-native';
import { getThemeStyles } from '../styles/styles';
import { useTheme } from '../context/ThemeContext';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const { isDarkMode } = useTheme();
  const styles = getThemeStyles(isDarkMode);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search schemes by title, description, or ministry..."
        placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}