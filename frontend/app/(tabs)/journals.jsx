import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../assets/images/logo-circle.png'; // Adjust the path as needed

export default function JournalApp() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const saveJournalEntry = async () => {
    if (newEntry.trim()) {
      const updatedEntries = [...journalEntries, { id: Date.now(), text: newEntry }];
      setJournalEntries(updatedEntries);
      setNewEntry('');
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    }
  };

  const loadJournalEntries = async () => {
    const storedEntries = await AsyncStorage.getItem('journalEntries');
    if (storedEntries) {
      setJournalEntries(JSON.parse(storedEntries));
    }
  };

  const deleteJournalEntry = async (id) => {
    const updatedEntries = journalEntries.filter((entry) => entry.id !== id);
    setJournalEntries(updatedEntries);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const renderItem = ({ item }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.entryText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteJournalEntry(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>MindMend</Text>
      </View>
      <ScrollView style={styles.entryList}>
        <Text style={styles.heading}>My Journal</Text>
        <TextInput
          style={styles.input}
          placeholder="Write a new journal entry..."
          value={newEntry}
          onChangeText={setNewEntry}
          multiline
        />
        
        {/* Custom Save Button */}
        <Pressable style={styles.saveButton} onPress={saveJournalEntry}>
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </Pressable>

        {/* Journal Entries List */}
        <FlatList
          data={journalEntries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.entryFlatList} // Updated width same as input
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#38b6ff',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
    width: '90%', // Set consistent width
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#38b6ff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '90%', // Set same width as input
    alignSelf: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryList: {
    padding: 20,
  },
  entryFlatList: {
    width: '90%', // Same width as input field
    alignSelf: 'center',
  },
  entryContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5,
  },
  entryText: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
