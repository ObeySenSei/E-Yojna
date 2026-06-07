import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { getThemeStyles } from '../styles/styles';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const [aboutVisible, setAboutVisible] = React.useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getThemeStyles(isDarkMode);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.tricolor}>
          <View style={[styles.saffron, { flex: 1 }]} />
          <View style={[styles.white, { flex: 1 }]} />
          <View style={[styles.green, { flex: 1 }]} />
        </View>
        
        <View style={headerStyles.headerContent}>
          {/* Centered title */}
          <View style={headerStyles.centeredTitle}>
            <Text style={[headerStyles.headerText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              E-Yojna
            </Text>
          </View>
          
          {/* Theme Toggle & Info buttons */}
          <View style={headerStyles.menuButtons}>
            <TouchableOpacity 
              style={headerStyles.iconButton}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={[headerStyles.iconText, { color: isDarkMode ? '#FFD700' : '#333333' }]}>
                {isDarkMode ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={headerStyles.iconButton}
              onPress={() => setAboutVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={[headerStyles.iconText, { color: '#000000' }]}>
                ℹ️
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* About Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={aboutVisible}
        onRequestClose={() => setAboutVisible(false)}
      >
        <View style={[modalStyles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FA' }]}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>🇮🇳 About E-Yojna</Text>
            <TouchableOpacity onPress={() => setAboutVisible(false)}>
              <Text style={modalStyles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={modalStyles.content}>
            <Text style={[modalStyles.version, { color: isDarkMode ? '#B0B0B0' : '#666' }]}>Version 1.0.0</Text>
            
            <Text style={modalStyles.sectionTitle}>📖 Our Mission</Text>
            <Text style={[modalStyles.text, { color: isDarkMode ? '#B0B0B0' : '#555' }]}>
              E-Yojna connects Indian citizens with government welfare schemes. 
              Our mission is to make government benefits accessible to every citizen.
            </Text>
            
            <Text style={modalStyles.sectionTitle}>✨ Features</Text>
            <Text style={[modalStyles.bullet, { color: isDarkMode ? '#B0B0B0' : '#555' }]}>• 🎯 Smart Eligibility Checker</Text>
            <Text style={[modalStyles.bullet, { color: isDarkMode ? '#B0B0B0' : '#555' }]}>• 🔍 Advanced Search & Filters</Text>
            <Text style={[modalStyles.bullet, { color: isDarkMode ? '#B0B0B0' : '#555' }]}>• ❤️ Save Favorites</Text>
            <Text style={[modalStyles.bullet, { color: isDarkMode ? '#B0B0B0' : '#555' }]}>• 📱 Apply Directly to Schemes</Text>
            
            <Text style={modalStyles.sectionTitle}>📊 Statistics</Text>
            <Text style={[modalStyles.stat, { color: isDarkMode ? '#4CAF50' : '#138808' }]}>• 20+ Active Schemes</Text>
            <Text style={[modalStyles.stat, { color: isDarkMode ? '#4CAF50' : '#138808' }]}>• 11+ Occupation Categories</Text>
            <Text style={[modalStyles.stat, { color: isDarkMode ? '#4CAF50' : '#138808' }]}>• 100% Free to Use</Text>
            
            <Text style={modalStyles.sectionTitle}>📞 Contact</Text>
            <Text style={[modalStyles.text, { color: isDarkMode ? '#B0B0B0' : '#555' }]}>📧 Email: nielittezpur@gmail.com</Text>
            <Text style={[modalStyles.text, { color: isDarkMode ? '#B0B0B0' : '#555' }]}>📞 Helpline: 1800-XXX-XXXX</Text>
            
            <View style={modalStyles.developedByContainer}>
              <View style={modalStyles.developedByContent}>
                <Text style={[modalStyles.developedByText, { color: isDarkMode ? '#B0B0B0' : '#666' }]}>Debanga Hazarika</Text>
                <Text style={[modalStyles.developedBySubtext, { color: isDarkMode ? '#888' : '#999' }]}>Bachelor of Computer Applications (BCA)</Text>
                <Text style={[modalStyles.developedBySubtext, { color: isDarkMode ? '#888' : '#999' }]}>Final Year Project – E-Yojana</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const headerStyles = {
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 8,
    position: 'relative',
  },
  centeredTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  menuButtons: {
    flexDirection: 'row',
    gap: 16,
    zIndex: 2,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 22,
    fontWeight: '400',
  }
};

const modalStyles = {
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF9933',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  closeText: { fontSize: 24, color: '#FFF', fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 30 },
  version: { textAlign: 'center', marginBottom: 20, fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FF9933', marginTop: 20, marginBottom: 10 },
  text: { fontSize: 14, lineHeight: 20, marginBottom: 10 },
  bullet: { fontSize: 14, marginBottom: 6 },
  stat: { fontSize: 14, marginBottom: 6, fontWeight: '500' },
  developedByContainer: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  developedByContent: {
    alignItems: 'flex-end',
  },
  developedByText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 2,
  },
  developedBySubtext: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 2,
  }
};