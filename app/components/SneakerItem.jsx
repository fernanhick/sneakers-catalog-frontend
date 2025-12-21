import { Image, StyleSheet, Text, View } from "react-native";

const SneakerItem = ({ sneaker }) => {
  return (
    <View style={styles.sneakerItem}>
      <Image style={styles.image} />
      <View style={styles.sneakerRow}>
        <Text style={styles.sneakerModel} numberOfLines={1}>
          {sneaker.model}
        </Text>
        <Text style={styles.sneakerSize}>size: {sneaker.size}</Text>
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
});

export default SneakerItem;
