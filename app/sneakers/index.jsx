import { useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";




const SneakerView = () => {

  const sneakerEntry ={
    model: '',
    size: ''
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [newSneaker, setNewSneaker] = useState({});

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
const handleOnChange = (text, input)=>{
  setNewSneaker(prevState => ({...prevState, [input]:text}))

}
const submitHandler = ()=>{
  alert(newSneaker)
}

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
        {/* ADD SNEAKER BUTTON */}
             <TouchableOpacity style={styles.button} onPress={()=> setModalVisible(true)}>
              <Text style={styles.buttonText}>Add Sneaker</Text>
             </TouchableOpacity>
         {/* MODAL */}
         <Modal
         visible={modalVisible}
         animationType="slide"
         transparent
         onRequestClose={()=> setModalVisible(false)}
         >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add a New Sneaker</Text>
                  <TextInput
                    style={styles.textInputModel}
                     
                    placeholder="Enter Model"
                    placeholderTextColor={'#aaa'}
                    value={newSneaker}
                    onChangeText={e => handleOnChange(e, 'model')}
                  />
                                    <TextInput
                    style={styles.textInputSize}
                    placeholder="Enter Size"
                    placeholderTextColor={'#aaa'}
                    value={newSneaker}
                    onChangeText={e => handleOnChange(e, 'size')}
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=> setModalVisible(false)} ><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={()=> submitHandler()} ><Text style={styles.saveButtonText}>Save</Text></TouchableOpacity>
                  </View>
            </View>

          </View>
         </Modal>
    </View>

);
};

const styles = StyleSheet.create({
  
  container: {
    
    width:'100%',
    padding: 20,
    paddingBottom:80,
    backgroundColor: "#000",
    
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
  button:{
    backgroundColor:'#474747ff',
    borderColor: '#fff', 
    paddingHorizontal:12,
    paddingVertical:10,
    borderRadius:10,
    borderWidth:0.5,
    alignItems:'center'
    
  },
  buttonText: {
    fontSize:20,
    fontWeight:'bold',
    color: '#fff'
  },
/* MODAL STYLES */
 modalOverlay:{
  flex:1,
  backgroundColor:'rgba(0, 0, 0, 0.5)',
  justifyContent:'center',
  alignItems:'center'

 },
modalContent:{
  backgroundColor:'#fff',
  padding:10,
  borderRadius:10,
  width:'60%',
},
modalTitle:{
  fontSize:20,
  fontWeight:'bold',
  textAlign:'center',
  marginBottom: 10
},
textInputModel:{
  borderWidth:1,
  borderBlockColor: '#ccc',
  borderRadius: 8,
  fontSize:16,
  padding:10,
  marginBottom:10
},
textInputSize:{
    borderWidth:1,
  borderBlockColor: '#ccc',
  borderRadius: 8,
  fontSize:16,
  padding:10,
  marginBottom:10
},
modalButtons:{
flexDirection:'row',
justifyContent:'space-between'
},
cancelButton:{
  backgroundColor: '#ccc',
  borderRadius: 5,
  padding:10,
  marginRight:10,
  flex:1,
  alignItems:'center'
},
cancelButtonText:{
  fontSize:16,
  color:'#333'
},
saveButton:{
 backgroundColor: '#007bff',
  borderRadius: 5,
  padding:10,
  marginRight:10,
  flex:1,
  alignItems:'center'
},
saveButtonText:{
  fontSize:16,
  color:'#fff'
}
});


export default SneakerView;

