import { Stack } from "expo-router";

const RootLayout =() => {
  return <Stack 
  screenOptions={{
    headerStyle:{
      backgroundColor:'#ff8c00',
      },
    headerTitle:{
      backgroundColor:'#fff'
    }
  }}
  />;
}

export default RootLayout;