import { ID } from "react-native-appwrite";
import { account } from "./appWrite";

const authService = {
  // Register a User

  async register(email, password) {
    try {
      console.log(email, password);
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      console.log("Trying to register");
      return {
        error: error.message || "Error registering User.",
      };
    }
  },
  // Login a User
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      return {
        error: error.message || "Error Login session.",
      };
    }
  },
  // Get User info
  async getUser() {
    try {
      const response = await account.getUser();
      return response;
    } catch (error) {
      return null;
    }
  },
  // Logout User
  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      return {
        error: error.message || "Logout Failed.",
      };
    }
  },
};

export default authService;
