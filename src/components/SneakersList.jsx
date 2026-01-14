import { FlatList } from "react-native";
import SneakerItem from "./SneakerItem";

const SneakersList = ({ sneakers, onDelete, onEdit, iconViewMode }) => {
  console.log("SneakersList render with iconViewMode:", iconViewMode);
  return (
    <FlatList
      key={iconViewMode ? "grid" : "view"}
      data={sneakers}
      keyExtractor={(item) => item.$id}
      numColumns={iconViewMode ? 4 : 1}
      contentContainerStyle={{
        showsVerticalScrollIndicator: "false",
        showsHorizontalScrollIndicator: "false",

        //backgroundColor: "black",
        gap: 0,
        alignItems: "center",
        padding: 10,
      }}
      renderItem={({ item }) => (
        <SneakerItem
          sneaker={item}
          onDelete={onDelete}
          onEdit={onEdit}
          iconViewMode={iconViewMode}
        />
      )}
    />
  );
};

export default SneakersList;
