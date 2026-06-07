import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const getThemeStyles = (isDarkMode) => {
  const colors = {
    background: isDarkMode ? '#121212' : '#F8F9FA',
    surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    card: isDarkMode ? '#2C2C2C' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    lightBorder: isDarkMode ? '#2C2C2C' : '#F0F0F0',
    primary: '#FF9933',
    secondary: '#138808',
    accent: isDarkMode ? '#FFB366' : '#FF9933',
    inputBg: isDarkMode ? '#2C2C2C' : '#F5F5F5',
    statsBg: isDarkMode ? '#1A3A1A' : '#E8F5E9',
    clearFilterBg: isDarkMode ? '#332400' : '#FFF0E0',
    modalBg: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    headerBg: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  };

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    loadingText: { marginTop: 10, color: colors.textSecondary, fontSize: 16 },
    
    // Header
    header: { backgroundColor: colors.headerBg, paddingTop: 20, paddingBottom: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border, elevation: 2 },
    tricolor: { flexDirection: 'row', height: 4, width: '100%', position: 'absolute', top: 0 },
    saffron: { backgroundColor: '#FF9933' },
    white: { backgroundColor: '#FFF' },
    green: { backgroundColor: '#138808' },
    headerText: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginTop: 8 },
    headerSubtext: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    
    // Search Bar
    searchContainer: { padding: 16, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.lightBorder },
    searchInput: { backgroundColor: colors.inputBg, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, borderWidth: 1, borderColor: colors.border, color: colors.text },
    
    // Category Filters
    categoryContainer: { paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.lightBorder },
    categoryScroll: { paddingHorizontal: 16 },
    categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.inputBg, marginRight: 10, borderWidth: 1, borderColor: colors.border },
    categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    categoryText: { fontSize: 14, color: colors.textSecondary },
    categoryTextActive: { color: '#FFF', fontWeight: '600' },
    
    // Toggle Bar
    toggleBar: { flexDirection: 'row', padding: 16, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.lightBorder, gap: 12 },
    toggleBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 12, backgroundColor: colors.inputBg },
    toggleBtnActive: { backgroundColor: colors.secondary },
    toggleBtnText: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
    toggleBtnTextActive: { color: '#FFF' },
    
    // Occupation Scroll
    occupationScrollView: { maxHeight: 120, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.lightBorder },
    occupationScrollContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
    occCard: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, backgroundColor: colors.inputBg, minWidth: 120 },
    occCardActive: { backgroundColor: colors.primary },
    occIcon: { fontSize: 28, marginBottom: 6 },
    occName: { fontSize: 12, color: colors.textSecondary, fontWeight: '500' },
    occNameActive: { color: '#FFF' },
    
    selectedInfo: { backgroundColor: isDarkMode ? '#332400' : '#FFF8F0', padding: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#664400' : '#FFE0B2' },
    selectedText: { fontSize: 13, color: colors.primary, fontWeight: '500' },
    
    statsBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.statsBg, borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#2A4A2A' : '#C8E6C9' },
    statsText: { fontSize: 14, fontWeight: '600', color: colors.secondary },
    hintText: { fontSize: 12, color: colors.primary, fontWeight: '500' },
    favoritesBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    favoritesBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600', marginLeft: 4 },
    
    // Cards
    list: { flex: 1, padding: 16 },
    card: { backgroundColor: colors.card, borderRadius: 16, marginBottom: 16, elevation: 3, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
    cardContent: { padding: 16 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' },
    schemeTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text, flex: 1, marginRight: 8 },
    categoryBadge: { backgroundColor: isDarkMode ? '#1A3A1A' : '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    schemeMinistry: { fontSize: 12, color: colors.textSecondary, marginBottom: 8 },
    schemeDesc: { fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginBottom: 10 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
    benefitsText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
    favoriteIcon: { fontSize: 24, padding: 4 },
    buttonRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.lightBorder },
    detailBtn: { flex: 1, backgroundColor: colors.inputBg, paddingVertical: 12, alignItems: 'center', borderRightWidth: 1, borderRightColor: colors.lightBorder },
    detailBtnText: { fontSize: 13, fontWeight: '600', color: colors.secondary },
    applyBtn: { flex: 1, backgroundColor: colors.secondary, paddingVertical: 12, alignItems: 'center' },
    applyBtnText: { fontSize: 13, fontWeight: '600', color: '#FFF' },
    
    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: colors.modalBg, borderRadius: 20, width: width * 0.9, maxHeight: height * 0.85, padding: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 15 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primary, flex: 1, flexWrap: 'wrap' },
    closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.inputBg, justifyContent: 'center', alignItems: 'center' },
    closeBtnText: { fontSize: 18, color: colors.textSecondary },
    modalSection: { marginBottom: 16 },
    modalLabel: { fontSize: 14, fontWeight: 'bold', color: colors.secondary, marginBottom: 6 },
    modalValue: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
    bulletPoint: { fontSize: 13, color: colors.textSecondary, marginLeft: 8, marginTop: 2, lineHeight: 20 },
    applyButton: { backgroundColor: colors.secondary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    applyButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    shareButton: { backgroundColor: colors.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    shareButtonText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
    
    // No Data
    noDataContainer: { alignItems: 'center', marginTop: 60, padding: 20 },
    noDataEmoji: { fontSize: 64, marginBottom: 16 },
    noDataTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
    noDataText: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: 24 },
    viewAllBtn: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
    viewAllBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    
    // Favorites Modal
    favoritesModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    favoritesModalContent: { backgroundColor: colors.modalBg, borderRadius: 20, width: width * 0.95, maxHeight: height * 0.9, padding: 20 },
    favoritesModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 15 },
    favoritesModalTitle: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
    favoriteItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: colors.lightBorder },
    favoriteTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
    favoriteCategory: { fontSize: 12, color: colors.secondary, marginTop: 4 },
    
    // ScrollView styles
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 20 },
    
    // Connection Status
    connectionBadge: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 10,
      paddingVertical: 4,
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 8,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    connectionBadgeText: {
      color: '#FFF',
      fontSize: 10,
      fontWeight: '600',
    },
    loadingSubtext: {
      marginTop: 8,
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
};

export const styles = getThemeStyles(false);