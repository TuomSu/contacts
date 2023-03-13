import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.PhoneNumbers,
          ]

      })
      if (data.length > 0) {
        //const items = data ? Object.keys(data).map(key =>({key, ...data[key]})) : [];
    //console.log(items[3].phoneNumbers[0].number)
    setContacts(data);
      }
    }
  }


  return (

    <View style={styles.container} >
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.key} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.name},{item.phoneNumbers[0].number}  </Text>
        </View>} 
        data={contacts} />
      <Button title="Get contact" onPress={getContacts} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
});
