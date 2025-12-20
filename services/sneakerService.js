import databaseService from "./databaseService";

/* Appwrite database and collection ID */
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_DB_TABLE_ID;

const sneakerService = {
  async getSneakers() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
};

export default sneakerService;
