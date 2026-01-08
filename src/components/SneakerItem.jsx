import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const SneakerItem = ({ sneaker, onDelete, onEdit }) => {
  return (
    <View style={styles.sneakerItem}>
      {sneaker.uri ? (
        <Image
          source={{ uri: sneaker.uri }}
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
        <Text style={styles.sneakerSize}>size: {sneaker.size}</Text>
      </View>
      <View style={styles.itemControllers}>
        <Pressable
          style={styles.sneakerEdit}
          onPress={() => {
            onEdit(sneaker.$id);
          }}
        >
          <Text style={styles.sneakerEditText}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.sneakerDelete}
          onPress={() => {
            onDelete(sneaker.$id);
          }}
        >
          <Text style={styles.sneakerDeleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sneakerItem: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ebebebff",
    padding: 0,
    margin: 2,
    borderRadius: 10,
    gap: 10,
    maxWidth: 400,
  },
  sneakerModel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sneakerSize: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: "#aaa",
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
    backgroundColor: "red",
    width: 50,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  sneakerEdit: {
    backgroundColor: "green",
    width: 50,
  },
});

export default SneakerItem;
