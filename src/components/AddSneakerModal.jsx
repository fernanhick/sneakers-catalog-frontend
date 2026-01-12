import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import aiService from "../services/aiService";
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
  /* Camera props */
  uploadImage,
  image,
  setImage,
  imageAsset,
}) => {
  const [aiSneakerResponse, setAiSneakerResponse] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const handleOnCancel = () => {
    setModalVisible(false);
    setAlertMessageVisibleSize(false);
    setAlertMessageVisible(false);
    setIsEditing(false);
  };
  const handleAiInput = async (data) => {
    const response = await aiService.getSneakerDescription(data);
    setLoadingAi(true);
    setAiSneakerResponse(response);
  };
  useState(() => {
    if (loadingAi && aiSneakerResponse) {
      console.log("rerendering with AI response:", aiSneakerResponse);
    }
  }, [loadingAi, aiSneakerResponse]);
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
            value={
              isEditing
                ? editedText.model
                : loadingAi
                ? aiSneakerResponse.model
                : newSneaker.model
            }
            onChangeText={(e) => handleOnChange(e, "model")}
          />
          <TextInput
            style={styles.textInputModel}
            placeholder="Enter Brand"
            placeholderTextColor={"#aaa"}
            value={
              aiSneakerResponse ? aiSneakerResponse.brand : newSneaker.brand
            }
            onChangeText={(e) => handleOnChange(e, "brand")}
          />
          <TextInput
            style={styles.textInputModel}
            placeholder="Enter Color"
            placeholderTextColor={"#aaa"}
            value={
              isEditing
                ? editedText.color
                : loadingAi
                ? aiSneakerResponse.color
                : newSneaker.color
            }
            onChangeText={(e) => handleOnChange(e, "sneaker_color")}
          />
          <TextInput
            style={styles.textInputSize}
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
                    width: "100%",
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
                  <MaterialCommunityIcons
                    name="close-box"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  height: 100,
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => uploadImage()}
                >
                  <Text style={styles.saveButtonText}>Upload Image</Text>
                </TouchableOpacity>
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
              <Text style={styles.cancelButtonText}>AI Detection</Text>
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
