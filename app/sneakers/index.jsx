import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sneakerService from "../../services/sneakerService";
import AddSneakerModal from "../components/AddSneakerModal";
import SneakersList from "../components/SneakersList";

const SneakerView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const [alertMessageVisibleSize, setAlertMessageVisibleSize] = useState(false);
  const [newSneaker, setNewSneaker] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sneakers, setSneakers] = useState([]);

  /* UseEffect  is used for fetching the initial data from server */

  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    setLoading(true);
    const response = await sneakerService.getSneakers();

    if (response.error) {
      setError(response.error);
      Alert.alert(error, response.error);
    } else {
      setSneakers(response.data);
      setError(null);
    }
  };

  /* Handle changes in the Text input and append into current object to be injected in the sneakers list */
  const handleOnChange = (text, input) => {
    setNewSneaker((prevState) => ({ ...prevState, [input]: text }));
    setAlertMessageVisible(false);
  };
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

  return (
    <View style={styles.container}>
      <SneakersList sneakers={sneakers} />
      {/* ADD SNEAKER BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Sneaker</Text>
      </TouchableOpacity>
      {/* MODAL */}
      <AddSneakerModal
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
  /* MODAL STYLES */
});

export default SneakerView;
