import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Modal, Alert, FlatList
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../styles/styles';

export default function EligibilityChecker({ schemes, onViewScheme }) {
  const { isDarkMode } = useTheme();
  const globalStyles = getThemeStyles(isDarkMode);
  
  // Dynamic styles based on theme
  const styles = getDynamicStyles(isDarkMode);
  const pickerStyles = getPickerStyles(isDarkMode);
  
  const [checkerModalVisible, setCheckerModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [showOccupationPicker, setShowOccupationPicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  
  const [formData, setFormData] = useState({
    age: '',
    occupation: '',
    gender: '',
    income: '',
    category: '',
    hasGirlChild: false,
    isHomeowner: false,
    isEntrepreneur: false,
    isStudent: false,
    hasSportsAchievement: false,
    isRegisteredStartup: false,
    bplCard: false
  });

  const OCCUPATIONS_FOR_CHECKER = [
    "Farmer", "Student", "Women", "Senior Citizen", 
    "SC/ST", "Entrepreneur", "Health Worker", "Home Seeker", 
    "Athlete", "Ex-Serviceman", "Solar Rooftop"
  ];

  const GENDERS = ["Male", "Female", "Other"];
  const CATEGORIES = ["General", "OBC", "SC", "ST"];

  // Map user occupation to scheme occupation IDs
  const mapOccupationToId = (occupation) => {
    const mapping = {
      "Farmer": "farmer",
      "Student": "student",
      "Women": "women",
      "Senior Citizen": "senior",
      "SC/ST": "scst",
      "Entrepreneur": "entrepreneur",
      "Health Worker": "healthcare",
      "Home Seeker": "housing",
      "Athlete": "sports",
      "Ex-Serviceman": "exserviceman",
      "Solar Rooftop": "solar"
    };
    return mapping[occupation] || occupation.toLowerCase();
  };

  const checkEligibility = () => {
    // Simple validation - check if fields are empty
    if (formData.age === '' || formData.age === null) {
      Alert.alert("Missing Information", "❌ Age field cannot be left empty. Please enter your age.");
      return;
    }
    
    if (formData.occupation === '' || formData.occupation === null) {
      Alert.alert("Missing Information", "❌ Occupation field cannot be left empty. Please select your occupation.");
      return;
    }
    
    if (formData.gender === '' || formData.gender === null) {
      Alert.alert("Missing Information", "❌ Gender field cannot be left empty. Please select your gender.");
      return;
    }
    
    if (formData.category === '' || formData.category === null) {
      Alert.alert("Missing Information", "❌ Category field cannot be left empty. Please select your category.");
      return;
    }

    const age = parseInt(formData.age);
    if (isNaN(age)) {
      Alert.alert("Invalid Input", "❌ Please enter a valid age (numbers only).");
      return;
    }
    
    const income = parseInt(formData.income) || 0;
    const occupationId = mapOccupationToId(formData.occupation);
    
    // Filter eligible schemes
    const eligible = schemes.filter(scheme => {
      if (!scheme.occupations || scheme.occupations.length === 0) {
        return false;
      }
      
      const occupationMatch = scheme.occupations.includes(occupationId);
      if (!occupationMatch) return false;
      
      return true;
    });
    
    if (eligible.length === 0) {
      Alert.alert("No Schemes Found", "😔 No eligible schemes found based on your criteria. Try adjusting your inputs.");
    } else {
      setEligibleSchemes(eligible);
      setCheckerModalVisible(false);
      setResultsModalVisible(true);
    }
  };

  // Picker Modal Component
  const PickerModal = ({ visible, onClose, title, options, onSelect, selectedValue }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={pickerStyles.modalOverlay}>
        <View style={pickerStyles.pickerModal}>
          <View style={pickerStyles.pickerHeader}>
            <Text style={pickerStyles.pickerTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={pickerStyles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  pickerStyles.pickerOption,
                  selectedValue === item && pickerStyles.pickerOptionActive
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={[
                  pickerStyles.pickerOptionText,
                  selectedValue === item && pickerStyles.pickerOptionTextActive
                ]}>
                  {item}
                </Text>
                {selectedValue === item && <Text style={pickerStyles.checkMark}>✓</Text>}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      {/* Main Eligibility Button */}
      <TouchableOpacity 
        style={styles.checkerButton}
        onPress={() => setCheckerModalVisible(true)}
      >
        <Text style={styles.checkerIcon}>🎯</Text>
        <View>
          <Text style={styles.checkerTitle}>Check My Eligibility</Text>
          <Text style={styles.checkerSubtitle}>Find schemes you qualify for in seconds</Text>
        </View>
        <Text style={styles.checkerArrow}>→</Text>
      </TouchableOpacity>

      {/* Main Form Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={checkerModalVisible}
        onRequestClose={() => setCheckerModalVisible(false)}
      >
        <ScrollView style={[styles.checkerModal, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FA' }]}>
          <View style={[styles.checkerModalHeader, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FF9933' }]}>
            <Text style={styles.checkerModalTitle}>🎯 Check Your Eligibility</Text>
            <TouchableOpacity onPress={() => setCheckerModalVisible(false)}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>Age <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                color: isDarkMode ? '#FFFFFF' : '#333',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              placeholder="Enter your age"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(text) => setFormData({...formData, age: text})}
            />
            
            <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>Occupation <Text style={styles.requiredStar}>*</Text></Text>
            <TouchableOpacity 
              style={[styles.selectInput, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setShowOccupationPicker(true)}
            >
              <Text style={formData.occupation ? 
                [styles.selectText, { color: isDarkMode ? '#FFFFFF' : '#333' }] : 
                [styles.placeholderText, { color: isDarkMode ? '#888' : '#999' }]}>
                {formData.occupation || "Select Occupation"}
              </Text>
              <Text style={[styles.dropdownIcon, { color: isDarkMode ? '#888' : '#666' }]}>▼</Text>
            </TouchableOpacity>
            
            <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>Gender <Text style={styles.requiredStar}>*</Text></Text>
            <TouchableOpacity 
              style={[styles.selectInput, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setShowGenderPicker(true)}
            >
              <Text style={formData.gender ? 
                [styles.selectText, { color: isDarkMode ? '#FFFFFF' : '#333' }] : 
                [styles.placeholderText, { color: isDarkMode ? '#888' : '#999' }]}>
                {formData.gender || "Select Gender"}
              </Text>
              <Text style={[styles.dropdownIcon, { color: isDarkMode ? '#888' : '#666' }]}>▼</Text>
            </TouchableOpacity>
            
            <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>Annual Income (₹)</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                color: isDarkMode ? '#FFFFFF' : '#333',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              placeholder="Enter your annual income (optional)"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              keyboardType="numeric"
              value={formData.income}
              onChangeText={(text) => setFormData({...formData, income: text})}
            />
            
            <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>Category <Text style={styles.requiredStar}>*</Text></Text>
            <TouchableOpacity 
              style={[styles.selectInput, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setShowCategoryPicker(true)}
            >
              <Text style={formData.category ? 
                [styles.selectText, { color: isDarkMode ? '#FFFFFF' : '#333' }] : 
                [styles.placeholderText, { color: isDarkMode ? '#888' : '#999' }]}>
                {formData.category || "Select Category"}
              </Text>
              <Text style={[styles.dropdownIcon, { color: isDarkMode ? '#888' : '#666' }]}>▼</Text>
            </TouchableOpacity>
            
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FF9933' : '#FF9933' }]}>Additional Qualifications (if applicable)</Text>
            
            <TouchableOpacity 
              style={[styles.checkbox, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setFormData({...formData, hasGirlChild: !formData.hasGirlChild})}
            >
              <Text style={[styles.checkboxText, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>
                {formData.hasGirlChild ? '✅' : '⬜'} Have a girl child below 10 years
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.checkbox, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setFormData({...formData, isHomeowner: !formData.isHomeowner})}
            >
              <Text style={[styles.checkboxText, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>
                {formData.isHomeowner ? '✅' : '⬜'} Own a home with rooftop space
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.checkbox, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setFormData({...formData, isEntrepreneur: !formData.isEntrepreneur})}
            >
              <Text style={[styles.checkboxText, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>
                {formData.isEntrepreneur ? '✅' : '⬜'} Running a business/startup
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.checkbox, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setFormData({...formData, isStudent: !formData.isStudent})}
            >
              <Text style={[styles.checkboxText, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>
                {formData.isStudent ? '✅' : '⬜'} Currently a student
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.checkbox, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setFormData({...formData, hasSportsAchievement: !formData.hasSportsAchievement})}
            >
              <Text style={[styles.checkboxText, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>
                {formData.hasSportsAchievement ? '✅' : '⬜'} Have sports achievements at state/national level
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.checkbox, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0'
              }]}
              onPress={() => setFormData({...formData, bplCard: !formData.bplCard})}
            >
              <Text style={[styles.checkboxText, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>
                {formData.bplCard ? '✅' : '⬜'} Hold a BPL/Ration card
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.submitButton} onPress={checkEligibility}>
              <Text style={styles.submitButtonText}>Find Eligible Schemes →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* Results Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={resultsModalVisible}
        onRequestClose={() => setResultsModalVisible(false)}
      >
        <View style={globalStyles.modalOverlay}>
          <View style={[globalStyles.modalContent, { 
            maxHeight: '90%',
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF'
          }]}>
            <View style={globalStyles.modalHeader}>
              <Text style={[globalStyles.modalTitle, { fontSize: 20, color: isDarkMode ? '#FFF' : '#333' }]}>
                🎯 Eligible Schemes ({eligibleSchemes.length})
              </Text>
              <TouchableOpacity onPress={() => setResultsModalVisible(false)} style={globalStyles.closeBtn}>
                <Text style={[globalStyles.closeBtnText, { color: isDarkMode ? '#FFF' : '#333' }]}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {eligibleSchemes.length === 0 ? (
                <View style={globalStyles.noDataContainer}>
                  <Text style={globalStyles.noDataEmoji}>😔</Text>
                  <Text style={[globalStyles.noDataTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>No eligible schemes found</Text>
                  <Text style={[globalStyles.noDataText, { color: isDarkMode ? '#AAA' : '#666' }]}>
                    Try adjusting your criteria or check back later for new schemes
                  </Text>
                </View>
              ) : (
                eligibleSchemes.map(scheme => (
                  <TouchableOpacity
                    key={scheme.id}
                    style={[styles.eligibleCard, {
                      backgroundColor: isDarkMode ? '#2C2C2C' : '#FFF',
                      borderColor: isDarkMode ? '#444' : '#E0E0E0'
                    }]}
                    onPress={() => {
                      setResultsModalVisible(false);
                      onViewScheme(scheme);
                    }}
                  >
                    <Text style={[styles.eligibleTitle, { color: '#138808' }]}>✓ {scheme.title}</Text>
                    <Text style={[styles.eligibleDesc, { color: isDarkMode ? '#CCC' : '#666' }]}>{scheme.description}</Text>
                    <Text style={[styles.eligibleBenefits, { color: '#FF9933' }]}>💰 {scheme.benefits}</Text>
                    <Text style={[styles.eligibleMinistry, { color: isDarkMode ? '#888' : '#999' }]}>🏛️ {scheme.ministry}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Picker Modals */}
      <PickerModal
        visible={showOccupationPicker}
        onClose={() => setShowOccupationPicker(false)}
        title="Select Occupation"
        options={OCCUPATIONS_FOR_CHECKER}
        onSelect={(value) => setFormData({...formData, occupation: value})}
        selectedValue={formData.occupation}
      />
      
      <PickerModal
        visible={showGenderPicker}
        onClose={() => setShowGenderPicker(false)}
        title="Select Gender"
        options={GENDERS}
        onSelect={(value) => setFormData({...formData, gender: value})}
        selectedValue={formData.gender}
      />
      
      <PickerModal
        visible={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        title="Select Category"
        options={CATEGORIES}
        onSelect={(value) => setFormData({...formData, category: value})}
        selectedValue={formData.category}
      />
    </>
  );
}

// Dynamic styles based on theme
const getDynamicStyles = (isDarkMode) => ({
  checkerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9933',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  checkerIcon: { fontSize: 40, marginRight: 16 },
  checkerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  checkerSubtitle: { fontSize: 12, color: '#FFF', opacity: 0.9, marginTop: 2 },
  checkerArrow: { fontSize: 24, color: '#FFF', marginLeft: 'auto' },
  checkerModal: { flex: 1 },
  checkerModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  checkerModalTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  closeText: { fontSize: 24, color: '#FFF', fontWeight: 'bold' },
  formContainer: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  requiredStar: { color: '#FF0000', fontSize: 14 },
  input: {
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1
  },
  selectInput: {
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectText: { fontSize: 16 },
  placeholderText: { fontSize: 16 },
  dropdownIcon: { fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 12 },
  checkbox: { padding: 12, borderRadius: 12, marginBottom: 8, borderWidth: 1 },
  checkboxText: { fontSize: 14 },
  submitButton: { backgroundColor: '#138808', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  submitButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  eligibleCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2
  },
  eligibleTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  eligibleDesc: { fontSize: 13, marginBottom: 8, lineHeight: 18 },
  eligibleBenefits: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  eligibleMinistry: { fontSize: 11, marginTop: 4 }
});

const getPickerStyles = (isDarkMode) => ({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  pickerModal: {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%'
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#E0E0E0'
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9933'
  },
  closeText: {
    fontSize: 24,
    color: isDarkMode ? '#FFF' : '#666'
  },
  pickerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#F0F0F0'
  },
  pickerOptionActive: {
    backgroundColor: isDarkMode ? '#2C2C2C' : '#FFF8F0'
  },
  pickerOptionText: {
    fontSize: 16,
    color: isDarkMode ? '#FFF' : '#333'
  },
  pickerOptionTextActive: {
    color: '#FF9933',
    fontWeight: '600'
  },
  checkMark: {
    fontSize: 18,
    color: '#138808'
  }
});