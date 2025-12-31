//Import Stylesheet for tyling the components
import PostImage from "@/assets/images/AppIcons/playstore.png";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SneakerHood</Text>
      <Image source={PostImage} style={styles.image} />
      <Text style={styles.text}>Catalogue all your sneakers in one place.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/sneakers");
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/auth");
        }}
      >
        <Text style={styles.buttonText}>Login section</Text>
      </TouchableOpacity>
    </View>
  );
};

// Create the stylesheet for each componen assigning a pointer
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    padding: 30,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    width: 350,
    justifyContent: "center",
    padding: 50,
    color: "#fff",
  },
  button: {
    backgroundColor: "#ff6600ff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
