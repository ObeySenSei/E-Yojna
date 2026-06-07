import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { getThemeStyles } from '../styles/styles';
import { useTheme } from '../context/ThemeContext';

export default function OccupationSelector({ selectedOccupation, setSelectedOccupation, occupations = [] }) {
  const { isDarkMode } = useTheme();
  const styles = getThemeStyles(isDarkMode);
  
  if (!occupations || occupations.length === 0) {
    return null;
  }
  
  return (
    <View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.occupationScrollView}
        contentContainerStyle={styles.occupationScrollContent}
      >
        {occupations.map((occ) => (
          <TouchableOpacity 
            key={occ.id}
            style={[
              styles.occCard, 
              selectedOccupation === occ.id && styles.occCardActive
            ]}
            onPress={() => {
              console.log('Selected occupation:', occ.id);
              setSelectedOccupation(occ.id);
            }}
          >
            <Text style={styles.occIcon}>{occ.icon || '📌'}</Text>
            <Text style={[
              styles.occName, 
              selectedOccupation === occ.id && styles.occNameActive
            ]}>
              {occ.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {selectedOccupation && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedText}>
            Showing schemes for {occupations.find(o => o.id === selectedOccupation)?.name || selectedOccupation}
          </Text>
        </View>
      )}
    </View>
  );
}