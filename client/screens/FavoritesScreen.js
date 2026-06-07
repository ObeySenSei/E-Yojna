import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { storage } from '../utils/storage';
import { colors } from '../constants/colors';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    setIsLoading(true);
    const favs = await storage.getFavorites();
    setFavorites(favs);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadFavorites();
    setIsRefreshing(false);
  };

  const handleRemoveFavorite = async (scheme) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== scheme.id);
    setFavorites(updatedFavorites);
    await storage.setFavorites(updatedFavorites);
  };

  const renderSchemeCard = ({ item }) => (
    <SchemeCard
      scheme={item}
      isFavorite={true}
      onPress={() => navigation.navigate('SchemeDetails', { scheme: item })}
      onFavoritePress={() => handleRemoveFavorite(item)}
    />
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>{favorites.length} schemes saved</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderSchemeCard}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No Favorites Yet"
            message="Start adding schemes to your favorites to see them here"
            buttonText="Browse Schemes"
            onButtonPress={() => navigation.navigate('Home')}
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
});

export default FavoritesScreen;