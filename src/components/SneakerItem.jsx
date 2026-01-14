import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const SneakerItem = ({ sneaker, onDelete, onEdit }) => {
  return (
    <View style={styles.sneakerItem}>
      {sneaker.image_uri ? (
        <Image
          source={{ uri: sneaker.image_uri }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

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
          <MaterialIcons name="mode-edit" size={32} color="#ff8c00" />
        </Pressable>
        <Pressable
          style={styles.sneakerDelete}
          onPress={() => {
            onDelete(sneaker);
          }}
        >
          <MaterialIcons name="delete-forever" size={32} color="#ff8c00" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sneakerItem: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "#ff8c00",
    backgroundColor: "#2b2b2bff",
    padding: 0,
    margin: 2,
    borderRadius: 10,
    gap: 10,
    maxWidth: 400,
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
    height: 50,
    width: 50,
    backgroundColor: "#ffffffff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
