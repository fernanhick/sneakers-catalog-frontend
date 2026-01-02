import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContexts";
import sneakerService from "../../services/sneakerService";
import AddSneakerModal from "../components/AddSneakerModal";
import SneakersList from "../components/SneakersList";

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
  const inputRef = useRef(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth");
    }
  }, [user, authLoading]);

  /* UseEffect  is used for fetching the initial data from server */
  useEffect(() => {
    if (user) {
      console.log("Fetching sneakers for user:", user);
      fetchSneakers();
    }
  }, [user]);

  const fetchSneakers = async () => {
    setLoading(true);
    const response = await sneakerService.getSneakers();

    if (response.error) {
      setError(response.error);
      Alert.alert(error, response.error);
    } else {
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
  /* Handles changes to the Text input while editing an Item */
  /*   const handleOnEdit = (text, input) => {
    setEditedText((prevState) => ({ ...prevState, [input]: text }));
    setAlertMessageVisible(false);
  }; */
  const submitSneaker = async () => {
    /* Handle if the model or size are undefined then exit function */
    newSneaker.size = parseFloat(newSneaker.size);
    if (newSneaker.model === undefined || newSneaker.size === undefined) {
      setAlertMessageVisible(true);
      return;
    }
    if (!Number(newSneaker.size)) {
      setAlertMessageVisibleSize(true);
      return;
    }

    const response = await sneakerService.addSneaker(newSneaker);

    if (response.error) {
      Alert.alert("Error:", response.error);
    } else {
      setSneakers([...sneakers, response.data]);
    }

    setNewSneaker({});
    setModalVisible(false);
    setAlertMessageVisible(false);
    setAlertMessageVisibleSize(false);
  };
  /* Update Sneaker Items */
  const submitSneakerEdit = async () => {
    /* Handle if the model or size are undefined then exit function */
    editedText.size = parseFloat(editedText.size);

    if (editedText.model === undefined || editedText.size === undefined) {
      setAlertMessageVisible(true);
      return;
    }
    if (!Number(editedText.size)) {
      setAlertMessageVisibleSize(true);
      return;
    }
    const response = await sneakerService.updateSneaker(
      editedText.$id,
      editedText
    );
    if (response.error) {
      Alert.alert("Error:", response.error);
    } else {
      /* Remove the item from Array based on ID */
      setSneakers(sneakers.filter((sneaker) => sneaker.$id !== editedText.$id));
      /* Checking Previous State of the Array and adding the updated value of the items removed previously */
      setSneakers((prevState) => [...prevState, editedText]);
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
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <SneakersList
            sneakers={sneakers}
            onDelete={deleteListItem}
            onEdit={editListItem}
          />
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
