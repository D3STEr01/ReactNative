import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from "../contexts/AuthContext";

const SECTIONS = [
  {
    header: 'Preferecias',
    items: [
      { id: 'language', icon: 'globe', label: 'Linguagem', type: 'select' },
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
    ],
  },
  {
    header: 'Ajuda',
    items: [
      { id: 'bug', icon: 'flag', label: 'Reportar Bug', type: 'link' },
      { id: 'contact', icon: 'mail', label: 'Entrar em contato', type: 'link' },
    ],
  },
  {
    header: 'Conta',
    items: [
      { id: 'logout', icon: 'arrow-left', label: 'Logout', type: 'link' },
    ],
  },
];

export default function Profile({ navigation }) {
  const [form, setForm] = useState({
    language: 'Português',
    darkMode: false,
  });

  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.goBackButton}
        >
          <FeatherIcon name="x" size={24} color="#616161" />
        </TouchableOpacity>

        <View style={styles.profile}>
          <Image
            alt=""
            source={require('../../assets/images/avatar.png')}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>{currentUser?.use_name}</Text>

          <Text style={styles.profileEmail}>{currentUser?.use_email}</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        if (id === 'logout') {
                          handleLogout();
                        } else {
                          // handle other onPress actions
                        }
                      }}>
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />

                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer} />

                        {type === 'select' && (
                          <Text style={styles.rowValue}>{form[id]}</Text>
                        )}

                        {type === 'toggle' && (
                          <Switch
                            onChange={val => setForm({ ...form, [id]: val })}
                            value={form[id]}
                          />
                        )}

                        {(type === 'select' || type === 'link') && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  goBackButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    marginTop: 25,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    marginTop: 10,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 25,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8080D7',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
