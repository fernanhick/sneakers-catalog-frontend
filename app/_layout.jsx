import { Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const RootLayout = () => {
  return <Stack 
  screenOptions={{
    headerStyle:{
      backgroundColor:'#ff8c00',
      
      },
    headerTintColor:'#fff',
    headerTitleStyle: {
      fontSize:25,
      fontWeight:'bold'
    
    },
    contentStyle:{
      paddingHorizontal:10,
      paddingTop:10,
      backgroundColor: '#fff',
      
    },
    headerTitleAlign: 'center'
  }}
  >
{/*     Assign header titles for each of the pages added to the Stack */}
    <Stack.Screen name='index' options={{title:'Home'}}/>
    <Stack.Screen name='sneakers' options={{headerTitle:'Catalogue',
    /* Add button to header */
        headerRight: () => (
             <TouchableOpacity style={styles.button} onPress={()=>{alert("This is a button")}}>
              <Text style={styles.buttonText}>+</Text>
             </TouchableOpacity>
   
        )
    }}/>
  </Stack>;
}

const styles = { 
  button:{
    backgroundColor:'#474747ff',
    borderColor: '#fff', 
    paddingHorizontal:12,
    paddingVertical:3,
    borderRadius:10,
    borderWidth:0.5,
    
  },
  buttonText: {
    fontSize:30,
    fontWeight:'bold',
    color: '#fff'
  }
}

export default RootLayout;