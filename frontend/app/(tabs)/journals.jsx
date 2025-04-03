import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal, Pressable, Image, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../assets/images/logo-circle.png';
import background from '../../assets/images/new-background.jpg';
import { FontAwesome } from "@expo/vector-icons";

export default function JournalApp() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); // For viewing full note

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const saveJournalEntry = async () => {
    if (newEntry.trim()) {
      const updatedEntries = [...journalEntries, { id: Date.now(), text: newEntry }];
      setJournalEntries(updatedEntries);
      setNewEntry('');
      setModalVisible(false);
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

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <FontAwesome name="ellipsis-v" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.entryList}>
          <Text style={styles.heading}>All Notes</Text>

          {/* Journal Entries Grid */}
          <FlatList
            data={journalEntries}
            numColumns={2} // 2x2 Grid Layout
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.entryContainer}
                onPress={() => setSelectedNote(item)}
                onLongPress={() => deleteJournalEntry(item.id)} // Long press to delete
              >
                <Text numberOfLines={4} ellipsizeMode="tail" style={styles.entryText}>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Floating Add Button */}
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>

        {/* Modal for Adding Notes */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Close (X) Button */}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Write a Note</Text>

              <TextInput
                style={styles.input}
                placeholder="Write your journal entry..."
                value={newEntry}
                onChangeText={setNewEntry}
                multiline
              />

              <Pressable style={styles.saveButton} onPress={saveJournalEntry}>
                <Text style={styles.saveButtonText}>Save Entry</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal for Viewing Full Note */}
        <Modal visible={!!selectedNote} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Close (X) Button */}
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedNote(null)}>
                <FontAwesome name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.fullNoteText}>{selectedNote?.text}</Text>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: 'space-around',
  },
  icon: { 
    marginLeft: 10, 
    height: 80, 
    width: 60, 
    marginRight: 10 
  },
  appName: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#000", 
    flex: 1 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  entryList: {
    padding: 20,
  },
  entryContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    minHeight: 100,
    maxWidth: '48%', // Ensures two items per row
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  
  entryText: {
    fontSize: 14,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#38b6ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fullNoteText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#38b6ff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});

