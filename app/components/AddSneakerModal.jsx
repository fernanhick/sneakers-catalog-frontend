import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const AddSneakerModal = ({
  modalVisible,
  setModalVisible,
  alertMessageVisible,
  setAlertMessageVisible,
  newSneaker,
  setNewSneaker,
  submitHandler,
  handleOnChange,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Sneaker</Text>
          <TextInput
            style={styles.textInputModel}
            placeholder="Enter Model"
            placeholderTextColor={"#aaa"}
            value={newSneaker}
            onChangeText={(e) => handleOnChange(e, "model")}
          />
          <TextInput
            style={styles.textInputSize}
            placeholder="Enter Size"
            placeholderTextColor={"#aaa"}
            value={newSneaker}
            onChangeText={(e) => handleOnChange(e, "size")}
          />
          {alertMessageVisible ? (
            <Text style={styles.alertMessage}>
              Please insert Model and Size
            </Text>
          ) : (
            ""
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => submitHandler()}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "60%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  textInputModel: {
    borderWidth: 1,
    borderBlockColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
  textInputSize: {
    borderWidth: 1,
    borderBlockColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  alertMessage: {
    fontSize: 10,
    color: "red",
    textAlign: "center",
  },
});

export default AddSneakerModal;
