import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContexts";
import LogoutButton from "./components/LogoutButton";
const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ff8c00",
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
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen
          name="sneakers"
          options={{
            headerTitle: "Catalogue",
          }}
        />
        <Stack.Screen name="auth" options={{ headerTitle: "Login" }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
