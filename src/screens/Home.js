import React from 'react';
import {useState} from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Dialog from 'react-native-dialog';

function Home(){
    const [location, setLocation] = useState('');
    const [groups, setGroups] = useState([]);
    const [newGroups, setNewGroups] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    const searchGroups = async () => {
        const querySnapshot = await firestore().collection('groups').where('location', '==', location).get();
        const groups = querySnapshot.docs.map(doc => doc.data());
        setGroups(groups);

        if(groups.length === 0){
            setShowDialog(true);
        }
    };

    const addGroups = async () => {
        await firestore().collection('groups').add({name:newGroups,location:location});
        searchGroups();
        setShowDialog(false);
    }

    return (
        <View style={styles.container}>

            <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Search location"
                style={styles.input}
            />

            <Button title="Search" onPress={searchGroups} />

            <FlatList
                data={groups}
                renderItem={({item}) => <Text key={item.name}>{item.name}</Text>}
                keyExtractor={(item,index) => item.name + index.toString()}
            />

            <Dialog.Container visible={showDialog}>

                <Dialog.Title>Add Group</Dialog.Title>
                <Dialog.Input 
                    value={newGroups}
                    placeholder="Enter group name"
                />
                <Dialog.Button label="Cancel" onPress={()=>setShowDialog(false)} />
                <Dialog.Button label="Add" 
                onPress={
                    async () => {
                        setShowDialog(false);
                        await firestore().collection('groups').add({name:newGroups,location:location});
                        searchGroups();
                    }} />

            </Dialog.Container>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 8,
    },
  });
  
  export default Home;