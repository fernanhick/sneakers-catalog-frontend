import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const SneakerView = () => {

  const [sneakers, setSneakers] = useState([
    {id:'1', model: 'Air One', size: '7'},
    {id:'2', model: 'Air Max', size: '9'},
    {id:'3', model: 'Air Jordan', size: '8.5'},
    {id:'4', model: 'Air One', size: '7'},
    {id:'5', model: 'Air Max', size: '9'},
    {id:'6', model: 'Air Jordan', size: '8.5'},
    {id:'7', model: 'Air One', size: '7'},
    {id:'8', model: 'Air Max', size: '9'},
    {id:'9', model: 'Air Jordan', size: '8.5'},
    {id:'10', model: 'Air One', size: '7'},
    {id:'11', model: 'Air Max', size: '9'},
    {id:'12', model: 'Air Jordan', size: '8.5'},
    {id:'13', model: 'Air One', size: '7'},
    {id:'14', model: 'Air Max', size: '9'},
    {id:'15', model: 'Air Jordan', size: '8.5'},
    {id:'16', model: 'Air One', size: '7'},
    {id:'17', model: 'Air Max', size: '9'},
    {id:'18', model: 'Air Jordan', size: '8.5'},
    
  ])

  return (
    <View style={styles.container}>
      <FlatList 
        data={sneakers}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <View style={styles.sneakerItem}>
            <Image style={styles.image}/>
            <View style={styles.sneakerRow}>
            <Text style={styles.sneakerModel}>{item.model}</Text>
            <Text style={styles.sneakerSize}>size: {item.size}</Text>
            </View>
          </View>
  )}
      />
         
    </View>

);
};

const styles = StyleSheet.create({
  
  container: {
    
    width:'100%',
    padding: 20,
    paddingBottom:80,
    backgroundColor: "#ebeff",

  },
  sneakerItem:{
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#ebebebff',
    padding:10,
    margin:2,
    borderRadius:10,
    gap:10,
    maxWidth:400

  },
  sneakerModel:{
    fontSize:18,
    fontWeight:'bold'
  },
  image:{
    height:50,
    width:50,
    backgroundColor:'#aaa',
    borderRadius:5
  },
  sneakerRow:{
    flex:1,
    flexDirection:'column'
    
  },
 
});


export default SneakerView;

