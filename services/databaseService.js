import { database } from "./appWrite";

const databaseService = {
  /* Define all the CRUD options */
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching documents:", error.messsage);
      return { error: error.messsage };
    }
  },
};

export default databaseService;
