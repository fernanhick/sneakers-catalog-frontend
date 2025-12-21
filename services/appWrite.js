import { Platform } from "react-native";
import { Client, Databases } from "react-native-appwrite";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  dbId: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    sneakers: process.env.EXPO_PUBLIC_APPWRITE_DB_TABLE_ID,
  },
};
/* Iniate instance for the Client and setup Project ID and Endpoint */
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

/* Verify OS using react native and switch between OS detected */
switch (Platform.OS) {
  case "ios":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
    break;
  case "android":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
}

const database = new Databases(client);

export { client, config, database };
