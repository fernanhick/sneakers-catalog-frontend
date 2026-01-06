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
  alertMessageVisibleSize,
  setAlertMessageVisibleSize,
  newSneaker,
  submitSneaker,
  handleOnChange,
  /* EDIT Section props */
  isEditing,
  setIsEditing,
  editedText,
  submitSneakerEdit,
}) => {
  const handleOnCancel = () => {
    setModalVisible(false);
    setAlertMessageVisibleSize(false);
    setAlertMessageVisible(false);
    setIsEditing(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isEditing ? "Edit Sneaker" : "Add Sneaker"}
          </Text>
          <TextInput
            style={styles.textInputModel}
            placeholder="Enter Model"
            placeholderTextColor={"#aaa"}
            value={isEditing ? editedText.model : newSneaker}
            onChangeText={(e) => handleOnChange(e, "model")}
          />
          <TextInput
            style={styles.textInputModel}
            placeholder="Enter Brand"
            placeholderTextColor={"#aaa"}
            value={isEditing ? editedText.brand : newSneaker}
            onChangeText={(e) => handleOnChange(e, "brand")}
          />
          <TextInput
            style={styles.textInputModel}
            placeholder="Enter Color"
            placeholderTextColor={"#aaa"}
            value={isEditing ? editedText.color : newSneaker}
            onChange={(e) => handleOnChange(e, "color")}
          />
          <TextInput
            style={styles.textInputSize}
            placeholder="Enter Size"
            placeholderTextColor={"#aaa"}
            value={isEditing ? String(editedText.size) : newSneaker}
            onChangeText={(e) => handleOnChange(e, "size")}
          />
          {alertMessageVisible ? (
            <Text style={styles.alertMessage}>
              Please insert Model and Size
            </Text>
          ) : (
            ""
          )}
          {alertMessageVisibleSize ? (
            <Text style={styles.alertMessage}>
              Please insert a number for Size
            </Text>
          ) : (
            ""
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                handleOnCancel();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            {isEditing ? (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => submitSneakerEdit()}
              >
                <Text style={styles.saveButtonText}>Save Editing</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => submitSneaker()}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            )}
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
