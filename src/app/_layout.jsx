import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LogoutButton from "../components/LogoutButton";
import { AuthProvider } from "../contexts/AuthContexts";
const RootLayout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ff8c00",
              borderBottomColor: "#353535ff",
              borderBottomWidth: 2,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
            },
            contentStyle: {
              paddingHorizontal: 20,
              paddingTop: 20,
              backgroundColor: "#000",
            },
            headerTitleAlign: "center",
            headerRight: () => <LogoutButton />,
          }}
        >
          {/*     Assign header titles for each of the pages added to the Stack */}
          <Drawer.Screen
            name="index"
            options={{ headerTitle: "Home", drawerLabel: "Home" }}
          />
          <Drawer.Screen
            name="pages/sneakers"
            options={{
              headerTitle: "Sneakers",
              drawerLabel: "Sneakers",
            }}
          />
          <Drawer.Screen
            name="pages/auth"
            options={{ headerTitle: "Login", drawerLabel: "Login" }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
