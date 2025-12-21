import { database } from "./appWrite";

const databaseService = {
  /* Define all the CRUD options */

  /* List Sneakers Item from DB */
  async listSneakers(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching documents:", error.messsage);
      return { error: error.messsage };
    }
  },

  /* Created Sneakers Item in DB*/
  async createSneaker(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
    } catch (error) {
      console.error("Error creating document:", error.messsage);
      return {
        error: error.messsage,
      };
    }
  },
};

export default databaseService;
