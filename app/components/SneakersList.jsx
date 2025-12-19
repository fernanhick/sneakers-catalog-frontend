import { FlatList } from "react-native";
import SneakerItem from "./SneakerItem";

const SneakersList=({sneakers})=> {
  return (
    <>
        <FlatList 
          data={sneakers}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>
            <SneakerItem sneaker={item}/>}
        />
        </>
    );
};

export default SneakersList