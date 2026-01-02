import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContexts";

const LogoutButton = () => {
  const { user, logout } = useAuth();

  if (!user) return null; // Hide when not logged in

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#444443ff",
    borderRadius: 6,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LogoutButton;
