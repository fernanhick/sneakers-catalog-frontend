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
  /*  */
  async createSneaker(dbId, colId, id = null, data) {
    try {
      return await database.createDocument(
        dbId,
        colId,
        id || undefined,
        data || undefined
      );
    } catch (error) {
      console.error("Error creating document:", error.messsage);
      return {
        error: error.messsage,
      };
    }
  },
  /* DELETE Item from DB */
  async deleteSneakerDB(dbId, colId, id) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting Item", error.messsage);
      return;
    }
  },
  /* Update Item in Database */
  async updateSneakerDB(dbId, colId, id, data) {
    try {
      return await database.updateDocument(dbId, colId, id, {
        model: data.model || undefined,
        brand: data.brand || undefined,
        size: data.size || undefined,
        color: data.color || undefined,
      });
    } catch (error) {
      console.error("Error updating Item", error.messsage);
      return {
        error: error.messsage,
      };
    }
  },
};

export default databaseService;
