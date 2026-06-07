import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeStyles } from './styles/styles';
import { MOCK_SCHEMES, CATEGORIES, fetchSchemesFromBackend, fetchOccupationsFromBackend } from './constants/data';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilters from './components/CategoryFilters';
import ToggleBar from './components/ToggleBar';
import OccupationSelector from './components/OccupationSelector';
import SchemeCard from './components/SchemeCard';
import SchemeModal from './components/SchemeModal';
import FavoritesModal from './components/FavoritesModal';
import EligibilityChecker from './components/EligibilityChecker';

function AppContent() {
  const { isDarkMode } = useTheme();
  const styles = getThemeStyles(isDarkMode);
  
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favoritesModalVisible, setFavoritesModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [occupations, setOccupations] = useState([]);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    loadFavorites();
    loadOccupations();
    loadSchemes();
  }, []);

  useEffect(() => {
    if (schemes.length > 0) {
      filterSchemes();
    }
  }, [schemes, selectedOccupation, showAll, searchQuery, selectedCategory]);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = (schemeId) => {
    let newFavorites;
    if (favorites.includes(schemeId)) {
      newFavorites = favorites.filter(id => id !== schemeId);
    } else {
      newFavorites = [...favorites, schemeId];
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const loadOccupations = async () => {
    try {
      const occ = await fetchOccupationsFromBackend();
      if (occ && occ.length > 0) {
        setOccupations(occ);
        console.log('✅ Loaded occupations:', occ.length);
      }
    } catch (error) {
      console.error('Failed to load occupations:', error);
    }
  };

  const loadSchemes = async () => {
    setLoading(true);
    try {
      const data = await fetchSchemesFromBackend();
      if (data && data.length > 0) {
        setSchemes(data);
        setBackendStatus('connected');
        console.log('✅ Connected to backend, loaded', data.length, 'schemes');
      } else {
        setSchemes(MOCK_SCHEMES);
        setBackendStatus('offline');
      }
    } catch (error) {
      console.error('Error loading schemes:', error);
      setSchemes(MOCK_SCHEMES);
      setBackendStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = [...schemes];
    
    if (!showAll && selectedOccupation) {
      filtered = filtered.filter(scheme => 
        scheme.occupations && scheme.occupations.includes(selectedOccupation)
      );
      console.log(`Filtered by ${selectedOccupation}: ${filtered.length} schemes`);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(scheme =>
        scheme.title?.toLowerCase().includes(query) ||
        scheme.description?.toLowerCase().includes(query) ||
        scheme.ministry?.toLowerCase().includes(query) ||
        scheme.benefits?.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }
    
    setFilteredSchemes(filtered);
  };

  const handleApply = (applyLink) => {
    if (applyLink) {
      Linking.openURL(applyLink);
    } else {
      Alert.alert('Apply', 'Visit official ministry website for application details');
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedOccupation(null);
    setShowAll(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF9933" />
        <Text style={styles.loadingText}>Loading schemes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      {backendStatus === 'connected' && (
        <View style={styles.connectionBadge}>
          <Text style={styles.connectionBadgeText}>🟢 Live Data</Text>
        </View>
      )}
      
      <EligibilityChecker 
        schemes={schemes} 
        onViewScheme={(scheme) => {
          setSelectedScheme(scheme);
          setModalVisible(true);
        }} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Category Filters - ONLY show when BY OCCUPATION tab is active */}
        {!showAll && (
          <CategoryFilters 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}
        
        <ToggleBar 
          showAll={showAll} 
          setShowAll={setShowAll} 
          setSelectedOccupation={setSelectedOccupation} 
        />
        
        {!showAll && occupations.length > 0 && (
          <OccupationSelector 
            selectedOccupation={selectedOccupation} 
            setSelectedOccupation={setSelectedOccupation}
            occupations={occupations}
          />
        )}

        <View style={styles.statsBar}>
          <Text style={styles.statsText}>🎯 {filteredSchemes.length} Schemes Found</Text>
          <TouchableOpacity 
            style={styles.favoritesBtn}
            onPress={() => setFavoritesModalVisible(true)}
          >
            <Text>❤️</Text>
            <Text style={styles.favoritesBtnText}>Favorites ({favorites.length})</Text>
          </TouchableOpacity>
        </View>

        {(searchQuery || selectedCategory !== 'All' || (!showAll && selectedOccupation)) && (
          <TouchableOpacity 
            onPress={clearAllFilters} 
            style={{ 
              padding: 12, 
              alignItems: 'center', 
              backgroundColor: isDarkMode ? '#332400' : '#FFF0E0' 
            }}
          >
            <Text style={{ color: '#FF9933', fontWeight: '600' }}>Clear All Filters ✕</Text>
          </TouchableOpacity>
        )}

        {filteredSchemes.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataEmoji}>😔</Text>
            <Text style={styles.noDataTitle}>No schemes found</Text>
            <Text style={styles.noDataText}>
              {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
            </Text>
            <TouchableOpacity style={styles.viewAllBtn} onPress={clearAllFilters}>
              <Text style={styles.viewAllBtnText}>Clear All Filters →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredSchemes.map(scheme => (
            <SchemeCard 
              key={scheme.id}
              scheme={scheme}
              isFavorite={favorites.includes(scheme.id)}
              onPressDetail={(s) => {
                setSelectedScheme(s);
                setModalVisible(true);
              }}
              onPressApply={handleApply}
              onToggleFavorite={toggleFavorite}
            />
          ))
        )}
      </ScrollView>

      <SchemeModal 
        scheme={selectedScheme}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        isFavorite={selectedScheme ? favorites.includes(selectedScheme.id) : false}
        onToggleFavorite={() => selectedScheme && toggleFavorite(selectedScheme.id)}
      />
      
      <FavoritesModal 
        visible={favoritesModalVisible}
        onClose={() => setFavoritesModalVisible(false)}
        favorites={favorites}
        schemes={schemes}
        onSelectScheme={(scheme) => {
          setSelectedScheme(scheme);
          setModalVisible(true);
        }}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}