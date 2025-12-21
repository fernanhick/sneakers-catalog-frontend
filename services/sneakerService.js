import { ID } from "react-native-appwrite";
import databaseService from "./databaseService";

/* Appwrite database and collection ID */
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_DB_TABLE_ID;

const sneakerService = {
  /* Get Sneakers List */
  async getSneakers() {
    const response = await databaseService.listSneakers(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  /* Add new sneaker to DB */
  async addSneaker(sneaker) {
    if (!sneaker.model || !sneaker.size) {
      return { error: "Sneaker model or size not included" };
    }
    const data = {
      model: sneaker.model || undefined,
      size: parseFloat(sneaker.size) || undefined,
      brand: "nike" || undefined,
      color: "red" || undefined,
      //createdAt: new Date().toISOString,
    };

    const response = await databaseService.createSneaker(
      dbId,
      colId,
      ID.unique(),
      data
    );
    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
};

export default sneakerService;
