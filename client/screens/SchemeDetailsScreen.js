import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants/colors';
import { formatters } from '../utils/formatters';
import { storage } from '../utils/storage';

const SchemeDetailsScreen = ({ route, navigation }) => {
  const { scheme } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const favorites = await storage.getFavorites();
    const exists = favorites.some((fav) => fav.id === scheme.id);
    setIsFavorite(exists);
  };

  const handleFavoritePress = async () => {
    const favorites = await storage.getFavorites();
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== scheme.id);
      Alert.alert('Removed', 'Scheme removed from favorites');
    } else {
      updatedFavorites = [...favorites, scheme];
      Alert.alert('Added', 'Scheme added to favorites');
    }

    await storage.setFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this scheme: ${scheme.title}\n\n${scheme.description}\n\nBenefits: ${formatters.formatCurrency(scheme.benefits)}`,
        title: scheme.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Icon name="share" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavoritePress} style={styles.actionButton}>
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? colors.error : colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{scheme.title}</Text>
          {scheme.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{scheme.category}</Text>
            </View>
          )}
        </View>

        {scheme.ministry && (
          <Text style={styles.ministry}>Ministry: {scheme.ministry}</Text>
        )}

        {scheme.benefits && (
          <View style={styles.benefitsSection}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <Text style={styles.benefitsAmount}>
              {formatters.formatCurrency(scheme.benefits)}
            </Text>
          </View>
        )}

        {scheme.eligibility && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eligibility</Text>
            <Text style={styles.sectionText}>{scheme.eligibility}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{scheme.description}</Text>
        </View>

        {scheme.applyLink && (
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              Alert.alert('Apply', 'This will open the application link');
              // Handle apply navigation
            }}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  ministry: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  benefitsSection: {
    backgroundColor: colors.primaryLight + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  benefitsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.success,
  },
  section: {
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  applyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SchemeDetailsScreen;