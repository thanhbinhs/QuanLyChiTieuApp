import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React , {useState} from "react";
import { COLORS } from "../constants";

export default function ViewOptions() {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal style={styles.modal} isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.menuOption} onPress={() => { toggleModal();}}>
          <Text style={styles.menuOptionText}>Chi tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption} onPress={() => { toggleModal();}}>
          <Text style={styles.menuOptionText}>Thu tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption} onPress={() => { toggleModal();}}>
          <Text style={styles.menuOptionText}>Chuyển khoản</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  menuOption: {
    padding: 10,
    width: "100%",
  },
  menuOptionText: {
    fontSize: 18,
    textAlign: "center",
  },
});
