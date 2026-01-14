import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SneakerItem = ({ sneaker, onDelete, onEdit, iconViewMode }) => {
  return (
    <TouchableOpacity
      style={[
        styles.sneakerItem,
        {
          width: iconViewMode ? 90 : "98%",
          height: iconViewMode ? 90 : 50,
        },
      ]}
      onPress={() => {
        console.log("Pressed");
      }}
    >
      {sneaker.image_uri ? (
        <Image
          source={{ uri: sneaker.image_uri }}
          style={[
            styles.image,
            {
              height: iconViewMode ? "100%" : "100%",
              width: iconViewMode ? "100%" : 50,
            },
          ]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      {iconViewMode ? null : (
        <>
          <View style={styles.sneakerRow}>
            <Text style={styles.sneakerModel} numberOfLines={1}>
              {sneaker.model}
            </Text>
            <Text style={styles.sneakerBrand}>{sneaker.brand}</Text>
          </View>
          <View style={styles.itemControllers}>
            <Pressable
              style={styles.sneakerEdit}
              onPress={() => {
                onEdit(sneaker.$id);
              }}
            >
              <MaterialCommunityIcons
                name="comment-edit"
                size={32}
                color="#ff8c00"
              />
            </Pressable>
            <Pressable
              style={styles.sneakerDelete}
              onPress={() => {
                onDelete(sneaker);
              }}
            >
              <MaterialCommunityIcons
                name="delete-forever"
                size={32}
                color="#ff8c00"
              />
            </Pressable>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sneakerItem: {
    //flex: 1,
    flexDirection: "row",
    //backgroundColor: "#ff8c00",
    backgroundColor: "#2b2b2bff",
    padding: 0,
    margin: 2,
    borderRadius: 10,
    gap: 10,
    // width: 90,
    //aspectRatio: 1,
    borderBottomColor: "#a8a8a8ff",
    borderBottomWidth: 1,
    borderRightColor: "#a8a8a8ff",
    borderRightWidth: 1,
  },
  sneakerModel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  sneakerSize: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sneakerBrand: {
    fontSize: 18,
    color: "#d3d3d3ff",
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffffff",
    borderRadius: 10,
  },
  sneakerRow: {
    flex: 1,
    flexDirection: "column",
  },
  itemControllers: {
    height: "100%",

    flexDirection: "row",
    alignSelf: "flex-end",
  },
  sneakerDelete: {
    //borderLeftWidth: 1,
    borderLeftColor: "#ff8c00",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  sneakerEdit: {
    //borderLeftWidth: 1,
    borderLeftColor: "#ff8c00",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SneakerItem;
