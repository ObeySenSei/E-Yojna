import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { styles } from '../styles/styles';

export default function FavoritesModal({ visible, onClose, favorites, schemes, onSelectScheme }) {
  const favoriteSchemes = schemes.filter(s => favorites.includes(s.id));
  
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.favoritesModal}>
        <View style={styles.favoritesModalContent}>
          <View style={styles.favoritesModalHeader}>
            <Text style={styles.favoritesModalTitle}>❤️ My Favorites ({favoriteSchemes.length})</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          {favoriteSchemes.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataEmoji}>💔</Text>
              <Text style={styles.noDataTitle}>No favorites yet</Text>
              <Text style={styles.noDataText}>Tap the heart icon on any scheme to add it to favorites</Text>
            </View>
          ) : (
            <ScrollView>
              {favoriteSchemes.map(scheme => (
                <TouchableOpacity 
                  key={scheme.id} 
                  style={styles.favoriteItem}
                  onPress={() => {
                    onSelectScheme(scheme);
                    onClose();
                  }}
                >
                  <Text style={styles.favoriteTitle}>📌 {scheme.title}</Text>
                  <Text style={styles.favoriteCategory}>{scheme.category}</Text>
                  <Text style={styles.schemeMinistry}>🏛️ {scheme.ministry}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}