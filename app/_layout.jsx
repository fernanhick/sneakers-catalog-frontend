import { Stack } from "expo-router";

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
      paddingHorizontal:20,
      paddingTop:20,
      backgroundColor: '#000',
      
    },
    headerTitleAlign: 'center'
  }}
  >
{/*     Assign header titles for each of the pages added to the Stack */}
    <Stack.Screen name='index' options={{title:'Home'}}/>
    <Stack.Screen name='sneakers' options={{headerTitle:'Catalogue',

    }}/>
  </Stack>;
}



export default RootLayout;