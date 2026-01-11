import { ID } from "react-native-appwrite";
import databaseService from "./databaseService";

/* Appwrite database and collection ID */
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_DB_TABLE_ID;
const bucketId = process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT.replace(/\/$/, "");
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

const sneakerService = {
  /* Get Sneakers List */
  async getSneakers() {
    const response = await databaseService.listSneakers(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  getSneakerWithImage: async (userId) => {
    /* To be implemented */
    const response = await sneakerService.getSneakersByUser(userId);
    if (response.error) {
      return { error: response.error };
    }
    /* for (let sneaker of response.data) {
      if (sneaker.image_id) {
        const imageResponse = await sneakerService.getSneakerImage(
          sneaker.image_id
        );
        if (!imageResponse.error) {
          //console.log("Image URL for sneaker:", imageResponse.data);
          sneaker.uri = imageResponse.data; // Assuming the response has a 'href' property for the image URL
        } else {
          console.error(
            "Error fetching image for sneaker:",
            sneaker.$id,
            imageResponse.error
          );
        }
      } else {
        //console.log("No image_id for sneaker:", sneaker.$id);
      }
    } */
    //console.log("Final sneakers with images:", response.data);

    return response;
  },
  async getSneakersByUser(userId) {
    const response = await databaseService.listSneakersByUser(
      dbId,
      colId,
      userId
    );
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  async getSneakerImage(fileId) {
    const response = await databaseService.getImageFromDatabase(
      bucketId,
      fileId
    );
    if (response.error) {
      return { error: response.error };
    }

    // Construct Appwrite "view" URL so it can be loaded directly by Image uri
    // Example: https://HOST/v1/storage/buckets/{bucketId}/files/{fileId}/view?project={projectId}
    if (
      !process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
      !process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
    ) {
      return { error: "Missing Appwrite config" };
    }

    const url = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;

    return { data: url };
  },
  async addSneakerWithImage(userId, sneaker, imageFile) {
    if (imageFile) {
      const uploadResponse = await this.uploadSneakerImage(imageFile);
      if (uploadResponse?.error) {
        return { error: uploadResponse.error };
      }
      sneaker.image_id = uploadResponse.data.$id;
      sneaker.image_uri = uploadResponse.data.uri;
      //console.log("Uploaded image response:", uploadResponse.data);
    }

    const response = await this.addSneaker(userId, sneaker);
    return response;
  },

  /* Add Image to pair with Sneaker */
  async uploadSneakerImage(file) {
    const fileId = ID.unique();
    //console.log("Uploading image file:", file, bucketId, fileId);
    const response = await databaseService.uploadImageToBucket(
      bucketId,
      fileId,
      file
    );
    const url = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;

    response.uri = url;
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  /* Delete Image from Bucket */
  async deleteSneakerImage(fileId) {
    const response = await databaseService.deleteImageFromBucket(
      bucketId,
      fileId
    );
    if (response?.error) {
      return { error: response.error };
    }
    return { success: true };
  },
  /* Add new sneaker to DB */
  async addSneaker(userId, sneaker) {
    //console.log("Adding sneaker:", sneaker);
    if (!sneaker.model || !sneaker.size) {
      return { error: "Sneaker model or size not included" };
    }
    //console.log("Adding sneaker for user:", sneaker.color);
    const sneakerData = {
      model: sneaker.model || undefined,
      size: parseFloat(sneaker.size) || undefined,
      brand: sneaker.brand || undefined,
      color: sneaker.sneaker_color || undefined,
      user_id: userId || undefined,
      image_id: sneaker.image_id || undefined, // Placeholder for future image upload feature
      image_uri: sneaker.image_uri || undefined,
    };
    //console.log("Adding sneaker with data:", sneakerData);
    const response = await databaseService.createSneaker(
      dbId,
      colId,
      ID.unique(),
      sneakerData
    );
    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  /* Delete Sneaker from Database using ID */
  async deleteSneaker(sneaker) {
    /* Delete associated image first */
    if (sneaker.image_id !== null) {
      console.log("Deleting associated image:", sneaker.image_id);
      const imageDeleteResponse = await this.deleteSneakerImage(
        sneaker.image_id
      );
      if (imageDeleteResponse?.error) {
        return { error: imageDeleteResponse.error };
      } // Image deleted successfully
    }
    const response = await databaseService.deleteSneakerDB(
      dbId,
      colId,
      sneaker.$id
    );
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
  /* Update Item in Database */
  async updateSneaker(id, sneaker) {
    const response = await databaseService.updateSneakerDB(
      dbId,
      colId,
      id,
      sneaker
    );

    {
      if (response?.error) {
        return { error: response.error };
      }
      return { data: response };
    }
  },
};

export default sneakerService;
