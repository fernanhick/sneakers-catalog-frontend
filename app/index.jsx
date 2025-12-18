//Import Stylesheet for tyling the components
import PostImage from "@/assets/images/splash-icon.png";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sneakalogue</Text>
      <Image source={PostImage} style={styles.image} />
      <Text style={styles.text}>Catalogue all your sneakers in one place.</Text>
      
      <TouchableOpacity style={styles.button} onPress={()=>{router.push('/sneakers')}}>
        <Text style={styles.buttonText}>Get Started</Text>
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
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    margin: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 20,
    width: 250,
    justifyContent: "center",
    padding:50
  },
  button:{
    backgroundColor:'#ff6600ff',
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:10
  },
  buttonText: {
    fontSize:20,
    fontWeight:'bold',
    color: '#fff'
  }
});

export default HomeScreen;
