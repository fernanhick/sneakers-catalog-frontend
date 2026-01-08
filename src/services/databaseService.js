import { Query } from "react-native-appwrite";
import { database, storage } from "./appWrite";

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

  async listSneakersByUser(dbId, colId, userId) {
    try {
      const response = await database.listDocuments(dbId, colId, [
        Query.equal("user_id", [userId]),
      ]);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching documents:", error.messsage);
      return { error: error.messsage };
    }
  },
  async getImageFromDatabase(bucketId, fileId) {
    try {
      const response = await storage.getFileView(bucketId, fileId);
      //console.log("Image fetched successfully:", response);
      return response;
    } catch (error) {
      console.error("Error fetching image:", error.message);
      return { error: error.message };
    }
  },
  /* Upload Image to Bucket */
  async uploadImageToBucket(bucketId, fileId, file) {
    console.log("Uploading image file DBServ:", file);
    try {
      const data = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
      };
      console.log("File data prepared for upload:", data);
      const response = await storage.createFile(bucketId, fileId, data);
      return response;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return { error: error.message };
    }
  },
  /* Created Sneakers Item in DB*/

  async createSneaker(dbId, colId, id = null, sneakerData) {
    //console.log("Creating sneaker with data:", sneakerData);
    try {
      return await database.createDocument(
        dbId,
        colId,
        id || undefined,
        sneakerData || undefined
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
