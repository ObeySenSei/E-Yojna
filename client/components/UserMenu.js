import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Modal, TextInput,
  Alert, ScrollView, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles as globalStyles } from '../styles/styles';

export default function UserMenu({ onAboutPress }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  // Login/Register form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Check login status on mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Mock login - In production, this would call your backend
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = users ? JSON.parse(users) : [];
    const foundUser = parsedUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      await AsyncStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      setIsLoggedIn(true);
      setLoginModalVisible(false);
      setEmail('');
      setPassword('');
      Alert.alert('Success', `Welcome back, ${foundUser.name}!`);
    } else {
      Alert.alert('Error', 'Invalid credentials or user not found');
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Mock registration
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = users ? JSON.parse(users) : [];
    
    // Check if user exists
    if (parsedUsers.find(u => u.email === email)) {
      Alert.alert('Error', 'User already exists');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password,
      createdAt: new Date().toISOString()
    };

    parsedUsers.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsLoggedIn(true);
    setRegisterModalVisible(false);
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    Alert.alert('Success', 'Registration successful!');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setMenuVisible(false);
    Alert.alert('Logged Out', 'You have been successfully logged out');
  };

  // Login Modal
  const LoginModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loginModalVisible}
      onRequestClose={() => setLoginModalVisible(false)}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>🔐 Login</Text>
            <TouchableOpacity onPress={() => setLoginModalVisible(false)}>
              <Text style={modalStyles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={modalStyles.label}>Email</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Text style={modalStyles.label}>Password</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity style={modalStyles.submitButton} onPress={handleLogin}>
              <Text style={modalStyles.submitButtonText}>Login →</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => {
                setLoginModalVisible(false);
                setRegisterModalVisible(true);
              }}
            >
              <Text style={modalStyles.switchText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Register Modal
  const RegisterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={registerModalVisible}
      onRequestClose={() => setRegisterModalVisible(false)}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>📝 Register</Text>
            <TouchableOpacity onPress={() => setRegisterModalVisible(false)}>
              <Text style={modalStyles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={modalStyles.label}>Full Name</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            
            <Text style={modalStyles.label}>Email</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Text style={modalStyles.label}>Phone Number</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            
            <Text style={modalStyles.label}>Password</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity style={modalStyles.submitButton} onPress={handleRegister}>
              <Text style={modalStyles.submitButtonText}>Register →</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => {
                setRegisterModalVisible(false);
                setLoginModalVisible(true);
              }}
            >
              <Text style={modalStyles.switchText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // About Modal
  const AboutModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={menuVisible && onAboutPress}
      onRequestClose={() => setMenuVisible(false)}
    >
      <View style={aboutStyles.container}>
        <View style={aboutStyles.header}>
          <Text style={aboutStyles.title}>🇮🇳 About E-Yojna</Text>
          <TouchableOpacity onPress={() => setMenuVisible(false)}>
            <Text style={aboutStyles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={aboutStyles.content}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100x100?text=E-Yojna' }}
            style={aboutStyles.logo}
          />
          
          <Text style={aboutStyles.version}>Version 2.0.0</Text>
          
          <Text style={aboutStyles.sectionTitle}>📖 Our Mission</Text>
          <Text style={aboutStyles.text}>
            E-Yojna is a revolutionary platform that connects Indian citizens with 
            government welfare schemes. Our mission is to make government benefits 
            accessible, understandable, and easy to apply for every citizen.
          </Text>
          
          <Text style={aboutStyles.sectionTitle}>✨ Features</Text>
          <Text style={aboutStyles.bullet}>• 🎯 Smart Eligibility Checker</Text>
          <Text style={aboutStyles.bullet}>• 🔍 Advanced Search & Filters</Text>
          <Text style={aboutStyles.bullet}>• ❤️ Save Favorites</Text>
          <Text style={aboutStyles.bullet}>• 📱 Apply Directly to Schemes</Text>
          <Text style={aboutStyles.bullet}>• 📤 Share Schemes with Family</Text>
          <Text style={aboutStyles.bullet}>• 💾 Offline Favorites Storage</Text>
          
          <Text style={aboutStyles.sectionTitle}>📊 Statistics</Text>
          <Text style={aboutStyles.stat}>• 12+ Active Schemes</Text>
          <Text style={aboutStyles.stat}>• 11+ Occupation Categories</Text>
          <Text style={aboutStyles.stat}>• 10+ Scheme Categories</Text>
          <Text style={aboutStyles.stat}>• 100% Free to Use</Text>
          
          <Text style={aboutStyles.sectionTitle}>🏛️ Supported Ministries</Text>
          <Text style={aboutStyles.text}>
            Agriculture, Education, Finance, Health, Housing, 
            Social Justice, Sports, Power, Commerce, and more.
          </Text>
          
          <Text style={aboutStyles.sectionTitle}>📞 Contact Us</Text>
          <Text style={aboutStyles.text}>📧 Email: support@eyojna.gov.in</Text>
          <Text style={aboutStyles.text}>📞 Helpline: 1800-XXX-XXXX</Text>
          <Text style={aboutStyles.text}>🌐 Website: www.eyojna.gov.in</Text>
          
          <Text style={aboutStyles.footer}>
            © 2024 E-Yojna. All rights reserved.{'\n'}
            Empowering India, One Scheme at a Time 🇮🇳
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Text style={styles.menuIcon}>👤</Text>
        <Text style={styles.menuText}>
          {isLoggedIn ? user?.name?.split(' ')[0] : 'Menu'}
        </Text>
      </TouchableOpacity>
      
      {menuVisible && (
        <View style={styles.dropdown}>
          {!isLoggedIn ? (
            <>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  setLoginModalVisible(true);
                }}
              >
                <Text style={styles.dropdownIcon}>🔐</Text>
                <Text style={styles.dropdownText}>Login</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  setRegisterModalVisible(true);
                }}
              >
                <Text style={styles.dropdownIcon}>📝</Text>
                <Text style={styles.dropdownText}>Register</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>👋 {user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  onAboutPress && onAboutPress();
                }}
              >
                <Text style={styles.dropdownIcon}>ℹ️</Text>
                <Text style={styles.dropdownText}>About</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.dropdownItem, styles.logoutItem]}
                onPress={handleLogout}
              >
                <Text style={styles.dropdownIcon}>🚪</Text>
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
      
      <LoginModal />
      <RegisterModal />
      <AboutModal />
    </>
  );
}

const styles = {
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9933',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10
  },
  menuIcon: { fontSize: 20, marginRight: 4 },
  menuText: { fontSize: 14, fontWeight: '600', color: '#FFF' },
  dropdown: {
    position: 'absolute',
    top: 70,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    minWidth: 200,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  dropdownIcon: { fontSize: 18, marginRight: 12 },
  dropdownText: { fontSize: 14, color: '#333' },
  userInfo: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF8F0'
  },
  userName: { fontSize: 14, fontWeight: 'bold', color: '#FF9933' },
  userEmail: { fontSize: 12, color: '#666', marginTop: 2 },
  logoutItem: { borderBottomWidth: 0 }
};

const modalStyles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 15
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#FF9933' },
  closeText: { fontSize: 24, color: '#666' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 12, marginBottom: 6 },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  submitButton: {
    backgroundColor: '#138808',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  switchText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#FF9933',
    fontSize: 14
  }
};

const aboutStyles = {
  container: { flex: 1, backgroundColor: '#F8F9FA' },
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
  content: { padding: 20 },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: '#F0F0F0'
  },
  version: { textAlign: 'center', color: '#666', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FF9933', marginTop: 20, marginBottom: 10 },
  text: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 10 },
  bullet: { fontSize: 14, color: '#555', marginBottom: 6, lineHeight: 20 },
  stat: { fontSize: 14, color: '#138808', marginBottom: 6, fontWeight: '500' },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  }
};