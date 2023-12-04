import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrashIcon } from 'react-native-heroicons/outline';

const CardComponent = ({ title, description, onDelete }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = () => {
    // Implement your logic for handling delete here
    // You can update the state or make an API call to delete the data
    // For simplicity, we'll just log a message to the console
    console.log('Deleted:', title)
    setModalVisible(false);
    onDelete();
  };

  return (
    <View style={styles.cardContainer}>
      {/* Card Content */}
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>

      {/* Trash Icon */}
      <TouchableOpacity onPress={toggleModal} style={styles.trashIconContainer}>
        <TrashIcon size={24} color="red" />
      </TouchableOpacity>

      {isModalVisible && (
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalText}>{`Deseja excluir "${title}"?`}</Text>
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleDelete} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    padding: 35,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  trashIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'lightgray',
    padding: 20,
    height: '100%',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#010922",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    flex: 1, // Take equal space in the row
    marginHorizontal: 5, // Add horizontal margin for spacing
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CardComponent;
