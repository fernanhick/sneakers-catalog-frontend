
//Import Stylesheet for tyling the components
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <View
      style={ styles.container}
    >
      <Text>This is the index page.</Text>
    </View>
  );
}


// Create the stylesheet for each componen assigning a pointer
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen;