import { FlatList } from "react-native";
import SneakerItem from "./SneakerItem";

const SneakersList = ({ sneakers, onDelete, onEdit }) => {
  return (
    <FlatList
      data={sneakers}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <SneakerItem sneaker={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};

export default SneakersList;
