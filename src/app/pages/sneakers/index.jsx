import AddSneakerModal from "@/src/components/AddSneakerModal";
import SneakersList from "@/src/components/SneakersList";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../contexts/AuthContexts";
import aiService from "../../../services/aiService";
import sneakerService from "../../../services/sneakerService";

const SneakerView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const [alertMessageVisibleSize, setAlertMessageVisibleSize] = useState(false);
  const [newSneaker, setNewSneaker] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sneakers, setSneakers] = useState([]);
  const [iconViewMode, setIconViewMode] = useState(true); // true for grid, false for list
  const navigation = useNavigation();

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  /* Editing State for Modal */
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState({});
  /* ImagePicker handling */
  const [image, setImage] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);

  /* Ai content detection */
  const [aiSneakerResponse, setAiSneakerResponse] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isAiContentLoaded, setIsAiContentLoaded] = useState(false);

  /* Redirect to auth if not logged in */
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

  const handleAiInput = async (data) => {
    setLoadingAi(true);
    //console.log("Handling AI Input with data:", data);
    const response = await aiService.analyzeImage(data);
    console.log("AI Service Response:", response);
    if (response?.error) {
      Alert.alert("AI Error", response.error);
      setLoadingAi(false);
      return;
    }
    if (!response?.error) {
      const aiRes = JSON.parse(response);
      setNewSneaker((prevState) => ({
        ...prevState,
        ["model"]: aiRes.model,
        ["brand"]: aiRes.brand,
        ["color"]: aiRes.color,
        ["size"]: aiRes.size,
      }));
      setIsAiContentLoaded(true);
      console.log("AI Response Set:", response);
      setLoadingAi(false);
    }
    console.log("Final AI Response:", response);
  };

  /* Handle changes in the Text input and append into current object to be injected in the sneakers list */
  const handleOnChange = (text, input) => {
    if (!isEditing) {
      setNewSneaker((prevState) => ({ ...prevState, [input]: text }));
      console.log("New Sneaker State:", newSneaker);
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
    setAiSneakerResponse([]);
    setIsAiContentLoaded(false);
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
  const deleteListItem = async (sneakerData) => {
    /* Display alert for confirming deletion using alert multiple fields */
    Alert.alert("Delete Sneaker", "Are you sure you want to delete the item", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await sneakerService.deleteSneaker(sneakerData);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            /* This will delete item on list by filtering out the id if sucessful */
            setSneakers(
              sneakers.filter((sneaker) => sneaker.$id !== sneakerData.$id)
            );
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
    //setModalVisible(true);
    handleSnapPress(2);
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
        quality: 0.1,
        base64: true,
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

  /* Bottom Sheet */
  // hooks
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        {/* ADD SNEAKER BUTTON */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add Sneaker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSnapPress(2)}
        >
          <Text style={styles.buttonText}>Add Sheet</Text>
        </TouchableOpacity>
        <Text style={styles.topMenuText}>Top</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIconViewMode((prev) => !prev)}
        >
          {iconViewMode ? (
            <MaterialCommunityIcons name="view-list" size={32} color="white" />
          ) : (
            <MaterialCommunityIcons
              name="view-grid-outline"
              size={32}
              color="white"
            />
          )}
        </TouchableOpacity>
      </View>
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
              /* Views */
              iconViewMode={iconViewMode}
            />
          )}
        </>
      )}

      {/* MODAL */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        enablePanDownToClose={true}
        handleClosePress
        backgroundStyle="blue"
      >
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
          imageAsset={imageAsset}
          image={image}
          setImage={setImage}
          /* AI props */
          isAiContentLoaded={isAiContentLoaded}
          aiSneakerResponse={aiSneakerResponse}
          handleAiInput={handleAiInput}
          loadingAi={loadingAi}
          /* BottomSheet Handle */
          handleClosePress={handleClosePress}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: "row",
    backgroundColor: "#414141ff",
    height: 50,
    padding: 5,
    justifyContent: "space-between",
    borderBottomColor: "#7a7a7aff",
    borderBottomWidth: 1,
  },
  buttonView: {
    backgroundColor: "#474747ff",
    borderColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
  },
  topMenuText: {
    width: 50,
    backgroundColor: "green",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 0,
    paddingBottom: 100,
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#474747ff",
    borderBottomColor: "#a8a8a8ff",
    borderBottomWidth: 1,
    borderRightColor: "#a8a8a8ff",
    borderRightWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
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
