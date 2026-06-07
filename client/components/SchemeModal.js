import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Linking, Alert, Share } from 'react-native';
import { styles } from '../styles/styles';

const handleApply = (applyLink) => {
  if (applyLink) {
    Linking.openURL(applyLink);
  } else {
    Alert.alert('Apply', 'Visit official ministry website for application details');
  }
};

const handleShare = async (scheme) => {
  try {
    await Share.share({
      message: `📌 ${scheme.title}\n\n${scheme.description}\n\n💰 Benefits: ${scheme.benefits}\n\n✅ Eligibility: ${scheme.eligibility}\n\nApply at: ${scheme.applyLink}`,
      title: scheme.title
    });
  } catch (error) {
    Alert.alert('Error', 'Share failed');
  }
};

export default function SchemeModal({ scheme, visible, onClose }) {
  if (!scheme) return null;
  
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{scheme.title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>🏛️ Ministry</Text>
              <Text style={styles.modalValue}>{scheme.ministry}</Text>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>📝 Description</Text>
              <Text style={styles.modalValue}>{scheme.description}</Text>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>💰 Benefits</Text>
              <Text style={styles.modalValue}>{scheme.benefits}</Text>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>✓ Eligibility</Text>
              <Text style={styles.modalValue}>{scheme.eligibility || 'As per scheme guidelines'}</Text>
            </View>
            
            {scheme.documents && (
              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>📄 Documents Required</Text>
                {scheme.documents.map((doc, i) => (
                  <Text key={i} style={styles.bulletPoint}>• {doc}</Text>
                ))}
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => handleApply(scheme.applyLink)}
            >
              <Text style={styles.applyButtonText}>Apply Now →</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => handleShare(scheme)}
            >
              <Text style={styles.shareButtonText}>📤 Share Scheme</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}