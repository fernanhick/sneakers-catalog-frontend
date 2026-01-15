import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
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
  setNewSneaker,
  submitSneaker,
  handleOnChange,
  /* EDIT Section props */
  isEditing,
  setIsEditing,
  editedText,
  submitSneakerEdit,
  /* Camera props */
  uploadImage,
  image,
  setImage,
  imageAsset,
  /* AI props  */
  isAiContentLoaded,
  aiSneakerResponse,
  handleAiInput,
  /* loading AI */
  loadingAi,
  /* BottomSheet */
  handleClosePress,
}) => {
  const { focusedField, setFocusedField } = useState(null);

  const handleOnCancel = () => {
    setImage(null);
    setNewSneaker({});
    setModalVisible(false);
    setAlertMessageVisibleSize(false);
    setAlertMessageVisible(false);
    setIsEditing(false);
    handleClosePress();
  };
  return (
    <ScrollView style={styles.modalContent}>
      <Text style={styles.modalTitle}>
        {isEditing ? "Edit Sneaker" : "Add Sneaker"}
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter Brand"
        placeholderTextColor={"#aaa"}
        value={isEditing ? editedText.brand : newSneaker.brand}
        onChangeText={(e) => handleOnChange(e, "brand")}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Model"
        placeholderTextColor={"#aaa"}
        value={isEditing ? editedText.model : newSneaker.model}
        onChangeText={(e) => handleOnChange(e, "model")}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Color"
        placeholderTextColor={"#aaa"}
        value={isEditing ? editedText.color : newSneaker.color}
        onChangeText={(e) => handleOnChange(e, "color")}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Enter Size"
        placeholderTextColor={"#aaa"}
        value={isEditing ? String(editedText.size) : newSneaker.size}
        onChangeText={(e) => handleOnChange(e, "size")}
      />
      <View
        style={{
          /* width: "100%",
              height: 180, */
          justifyContent: "center",

          marginBottom: 10,
        }}
      >
        {image ? (
          <View>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../assets/images/partial-react-logo.png")
              }
              style={{
                width: "50%",
                aspectRatio: 1,
                alignSelf: "center",
                marginBottom: 10,
              }}
            />
            <TouchableOpacity
              style={{
                alignSelf: "center",
                position: "absolute",
                top: 1,
                right: 1,
              }}
              onPress={() => setImage(null)}
            >
              <MaterialCommunityIcons name="close-box" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              //height: 100,
              justifyContent: "center",
              gap: 10,
            }}
          >
            {/* <TouchableOpacity
              style={styles.saveButton}
              onPress={() => uploadImage()}
            >
              <Text style={styles.saveButtonText}>Upload Image</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => uploadImage()}
            >
              <Text style={styles.saveButtonText}>Capture Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {alertMessageVisible ? (
        <Text style={styles.alertMessage}>Please insert Model and Size</Text>
      ) : (
        ""
      )}
      {alertMessageVisibleSize ? (
        <Text style={styles.alertMessage}>Please insert a number for Size</Text>
      ) : (
        ""
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.cancelButton,
            backgroundColor: "#28a745",
          }}
          onPress={() => {
            //console.log("imageBase64:", imageAsset.base64);
            handleAiInput(imageAsset.base64);
          }}
        >
          {loadingAi ? (
            <ActivityIndicator animating={loadingAi} size="small" />
          ) : (
            <Text style={styles.cancelButtonText}>AI Detection</Text>
          )}
        </TouchableOpacity>
      </View>

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
    </ScrollView>
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
    backgroundColor: "#242424ff",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  textInput: {
    borderWidth: 1,
    borderBlockColor: "#ccc",
    backgroundColor: "white",
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
