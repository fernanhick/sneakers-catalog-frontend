import AddSneakerModal from "@/src/components/AddSneakerModal";
import SneakersList from "@/src/components/SneakersList";
import { ImagePicker } from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../contexts/AuthContexts";
import sneakerService from "../../../services/sneakerService";

const SneakerView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const [alertMessageVisibleSize, setAlertMessageVisibleSize] = useState(false);
  const [newSneaker, setNewSneaker] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sneakers, setSneakers] = useState([]);

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  /* Editing State for Modal */
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState({});
  /* ImagePicker handling */
  const [image, setImage] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [convertedImage, setConvertedImage] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (!user && !authLoading) {
        console.log("User not authenticated, redirecting to /auth");
        router.replace("/pages/auth");
      }
    }, [user, authLoading, router])
  );

  /* UseEffect  is used for fetching the initial data from server */
  useEffect(() => {
    if (user) {
      //console.log("Fetching sneakers for user:", user);
      fetchSneakersUser();
    }
  }, [user]);

  const fetchSneakersUser = async () => {
    setLoading(true);
    const response = await sneakerService.getSneakerWithImage(user.$id);

    if (response.error) {
      setError(response.error);
      //Alert.alert(error, response.error);
    } else {
      //console.log("Fetched sneakers:", response.data);
      setSneakers(response.data);
      setError(null);
      setLoading(false);
    }
  };

  /* Handle changes in the Text input and append into current object to be injected in the sneakers list */
  const handleOnChange = (text, input) => {
    if (!isEditing) {
      setNewSneaker((prevState) => ({ ...prevState, [input]: text }));
    } else {
      setEditedText((prevState) => ({ ...prevState, [input]: text }));
    }

    setAlertMessageVisible(false);
  };
  /* Submit New Sneaker Function */
  const submitSneaker = async () => {
    newSneaker.size = parseFloat(newSneaker.size);
    const validation = validateSneaker(newSneaker);
    if (!validation.isValid) {
      setAlertMessageVisible(true);
      return;
    }

    const response = await sneakerService.addSneakerWithImage(
      user.$id,
      newSneaker,
      imageAsset
    );
    //console.log("Add sneaker response:", response.data);
    if (response?.error) {
      Alert.alert("Error:", response.error);
    } else {
      setSneakers([...sneakers, response.data]);
    }
    setImage(null);
    setImageAsset(null);
    setNewSneaker({});
    setModalVisible(false);
    setAlertMessageVisible(false);
    setAlertMessageVisibleSize(false);
  };
  /* Update Sneaker Items */
  const submitSneakerEdit = async () => {
    editedText.size = parseFloat(editedText.size);

    const validation = validateSneaker(editedText);
    if (!validation.isValid) {
      setAlertMessageVisible(true);
      return;
    }

    const response = await sneakerService.updateSneaker(
      editedText.$id,
      editedText
    );

    if (response.error) {
      Alert.alert("Error:", response.error);
    } else {
      // More efficient update approach
      setSneakers(
        sneakers.map((sneaker) =>
          sneaker.$id === editedText.$id ? editedText : sneaker
        )
      );
    }

    setEditedText({});
    setModalVisible(false);
    setAlertMessageVisible(false);
    setAlertMessageVisibleSize(false);
    setIsEditing(false);
  };
  /* Delete Function */
  const deleteListItem = async (id) => {
    /* Display alert for confirming deletion using alert multiple fields */
    Alert.alert("Delete Sneaker", "Are you sure you want to delete the item", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await sneakerService.deleteSneaker(id);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            /* This will delete item on list by filtering out the id if sucessful */
            setSneakers(sneakers.filter((sneaker) => sneaker.$id !== id));
          }
        },
      },
    ]);
  };

  /* Edit Functionality */
  const editListItem = async (id) => {
    sneakers.forEach((item) => {
      if (item.$id === id) {
        setEditedText(item);
      }
    });
    setIsEditing(true);
    setModalVisible(true);
  };

  // Extract validation function
  const validateSneaker = (sneakerData) => {
    if (sneakerData.model === undefined || sneakerData.size === undefined) {
      return { isValid: false, message: "Model and size are required" };
    }
    if (!Number(sneakerData.size)) {
      return { isValid: false, message: "Size must be a valid number" };
    }
    return { isValid: true };
  };

  /* Camera Section */
  const uploadImage = async () => {
    // Image upload logic here
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        //console.log("Image picked:", result);
        /* Convert image to WebP format */
        //const convertedImage = await convertImageToWebP(result.assets[0].uri);
        //console.log("Converted image path:", convertedImage);
        setImageAsset(result.assets[0]);
        setImage(result.assets[0].uri);
        //console.log("Image URI:", result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {!sneakers.length ? (
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              No sneakers found. Add your first sneaker!
            </Text>
          ) : (
            <SneakersList
              sneakers={sneakers}
              onDelete={deleteListItem}
              onEdit={editListItem}
            />
          )}
        </>
      )}

      {/* ADD SNEAKER BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Sneaker</Text>
      </TouchableOpacity>
      {/* MODAL */}
      <AddSneakerModal
        /* Editing section */
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editedText={editedText}
        /* Modal visibility */
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newSneaker={newSneaker}
        setNewSneaker={setNewSneaker}
        alertMessageVisible={alertMessageVisible}
        setAlertMessageVisible={setAlertMessageVisible}
        alertMessageVisibleSize={alertMessageVisibleSize}
        setAlertMessageVisibleSize={setAlertMessageVisibleSize}
        submitSneaker={submitSneaker}
        handleOnChange={handleOnChange}
        submitSneakerEdit={submitSneakerEdit}
        /* Camera props*/
        uploadImage={uploadImage}
        image={image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#474747ff",
    borderColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },
});

export default SneakerView;
