import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddSneakerModal from "../components/AddSneakerModal";
import SneakersList from "../components/SneakersList";

const SneakerView = () => {
  const sneakerEntry = {
    model: "",
    size: "",
    uri: "",
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const [newSneaker, setNewSneaker] = useState({});

  const [sneakers, setSneakers] = useState([
    { id: "1", model: "Air One", size: "7" },
    { id: "2", model: "Air Max", size: "9" },
    { id: "3", model: "Air Jordan", size: "8.5" },
    { id: "4", model: "Air One", size: "7" },
    { id: "5", model: "Air Max", size: "9" },
    { id: "6", model: "Air Jordan", size: "8.5" },
    { id: "7", model: "Air One", size: "7" },
    { id: "8", model: "Air Max", size: "9" },
    { id: "9", model: "Air Jordan", size: "8.5" },
    { id: "10", model: "Air One", size: "7" },
    { id: "11", model: "Air Max", size: "9" },
    { id: "12", model: "Air Jordan", size: "8.5" },
    { id: "13", model: "Air One", size: "7" },
    { id: "14", model: "Air Max", size: "9" },
    { id: "15", model: "Air Jordan", size: "8.5" },
    { id: "16", model: "Air One", size: "7" },
    { id: "17", model: "Air Max", size: "9" },
    { id: "18", model: "Air Jordan", size: "8.5" },
  ]);

  /* Handle changes in the Text input and append into current object to be injected in the sneakers list */
  const handleOnChange = (text, input) => {
    setNewSneaker((prevState) => ({ ...prevState, [input]: text }));
    setAlertMessageVisible(false);
  };
  const submitHandler = () => {
    /* Handle if the model or size are undefined then exit function */
    if (newSneaker.model === undefined || newSneaker.size === undefined) {
      setAlertMessageVisible(true);
      return;
    }
    newSneaker.id = sneakers.length + 1;
    setSneakers([...sneakers, newSneaker]);
    setNewSneaker({});
    setModalVisible(false);
    setAlertMessageVisible(false);
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
        submitHandler={submitHandler}
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
