import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  ActivityIndicator, TouchableOpacity 
} from 'react-native';
import Header from '../components/Header';
import ToggleBar from '../components/ToggleBar';
import OccupationGrid from '../components/OccupationGrid';
import SchemeCard from '../components/SchemeCard';
import SchemeModal from '../components/SchemeModal';
import { MOCK_SCHEMES } from '../constants/schemes';
import { OCCUPATIONS } from '../constants/data';
import { filterSchemesByOccupation, getOccupationName } from '../utils/helpers';

const API_URL = 'http://localhost:5000/api';

export default function HomeScreen() {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    if (schemes.length > 0 && selectedOccupation && !showAll) {
      const filtered = filterSchemesByOccupation(schemes, selectedOccupation);
      setFilteredSchemes(filtered);
    } else if (showAll) {
      setFilteredSchemes(schemes);
    }
  }, [selectedOccupation, schemes, showAll]);

  const fetchSchemes = async () => {
    try {
      // Try to fetch from your backend
      // const response = await fetch(`${API_URL}/schemes`);
      // const data = await response.json();
      
      // Using mock data for now
      setTimeout(() => {
        setSchemes(MOCK_SCHEMES);
        setFilteredSchemes(MOCK_SCHEMES);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('API Error:', error);
      setSchemes(MOCK_SCHEMES);
      setFilteredSchemes(MOCK_SCHEMES);
      setLoading(false);
    }
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
      
      <ToggleBar 
        showAll={showAll}
        setShowAll={setShowAll}
        setSelectedOccupation={setSelectedOccupation}
      />

      {!showAll && (
        <>
          <OccupationGrid 
            selectedOccupation={selectedOccupation}
            setSelectedOccupation={setSelectedOccupation}
          />
          
          {selectedOccupation && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedText}>
                Showing schemes for {getOccupationName(OCCUPATIONS, selectedOccupation)}
              </Text>
            </View>
          )}
        </>
      )}

      <View style={styles.statsBar}>
        <Text style={styles.statsText}>
          🎯 {filteredSchemes.length} Schemes Found
        </Text>
        {!showAll && !selectedOccupation && (
          <Text style={styles.hintText}>👆 Select an occupation above</Text>
        )}
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredSchemes.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataEmoji}>😔</Text>
            <Text style={styles.noDataTitle}>No schemes found</Text>
            <Text style={styles.noDataText}>
              {!showAll && !selectedOccupation 
                ? "Select an occupation to see relevant schemes"
                : "Try selecting a different occupation"}
            </Text>
            {!showAll && selectedOccupation && (
              <TouchableOpacity 
                style={styles.viewAllBtn}
                onPress={() => setShowAll(true)}
              >
                <Text style={styles.viewAllBtnText}>View All Schemes →</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredSchemes.map(scheme => (
            <SchemeCard 
              key={scheme.id}
              scheme={scheme}
              onPressDetails={(scheme) => {
                setSelectedScheme(scheme);
                setModalVisible(true);
              }}
              onPressApply={(link) => {
                // Handle apply in a separate function if needed
                if (link) {
                  Linking.openURL(link);
                }
              }}
            />
          ))
        )}
      </ScrollView>

      <SchemeModal 
        scheme={selectedScheme}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  loadingText: { marginTop: 10, color: '#666', fontSize: 16 },
  selectedInfo: { 
    backgroundColor: '#FFF8F0', 
    padding: 12, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFE0B2'
  },
  selectedText: { fontSize: 13, color: '#FF9933', fontWeight: '500' },
  statsBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#E8F5E9',
    borderBottomWidth: 1,
    borderBottomColor: '#C8E6C9'
  },
  statsText: { fontSize: 14, fontWeight: '600', color: '#138808' },
  hintText: { fontSize: 12, color: '#FF9933', fontWeight: '500' },
  list: { flex: 1, padding: 16 },
  noDataContainer: { alignItems: 'center', marginTop: 60, padding: 20 },
  noDataEmoji: { fontSize: 64, marginBottom: 16 },
  noDataTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  noDataText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  viewAllBtn: { backgroundColor: '#FF9933', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  viewAllBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});