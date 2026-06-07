import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getThemeStyles } from '../styles/styles';
import { useTheme } from '../context/ThemeContext';

export default function SchemeCard({ scheme, isFavorite, onPressDetail, onPressApply, onToggleFavorite }) {
  const { isDarkMode } = useTheme();
  const styles = getThemeStyles(isDarkMode);

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.schemeTitle}>{scheme.title}</Text>
          <TouchableOpacity onPress={() => onToggleFavorite(scheme.id)}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.schemeMinistry}>{scheme.ministry}</Text>
        <Text style={styles.schemeDesc}>{scheme.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.benefitsText}>{scheme.benefits}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{scheme.category}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.detailBtn} onPress={() => onPressDetail(scheme)}>
          <Text style={styles.detailBtnText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={() => onPressApply(scheme.applyLink)}>
          <Text style={styles.applyBtnText}>Apply Now →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}