import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getThemeStyles } from '../styles/styles';
import { useTheme } from '../context/ThemeContext';

export default function ToggleBar({ showAll, setShowAll, setSelectedOccupation }) {
  const { isDarkMode } = useTheme();
  const styles = getThemeStyles(isDarkMode);

  return (
    <View style={styles.toggleBar}>
      <TouchableOpacity 
        style={[styles.toggleBtn, showAll && styles.toggleBtnActive]}
        onPress={() => {
          console.log('Switched to ALL SCHEMES');
          setShowAll(true);
          setSelectedOccupation(null);
        }}
      >
        <Text style={[styles.toggleBtnText, showAll && styles.toggleBtnTextActive]}>
          ALL SCHEMES
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.toggleBtn, !showAll && styles.toggleBtnActive]}
        onPress={() => {
          console.log('Switched to BY OCCUPATION');
          setShowAll(false);
        }}
      >
        <Text style={[styles.toggleBtnText, !showAll && styles.toggleBtnTextActive]}>
          BY OCCUPATION
        </Text>
      </TouchableOpacity>
    </View>
  );
}