import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

function PhoneAuthentication({navigation}){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirm, setConfirm] = useState(null);

    const signInWithPhoneNumber = async () => {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    };

    const confirmCode = async()=>{
        try{
            await confirm.confirm(verificationCode);
            navigation.navigate('Home');
        }
        catch(error){
            console.log('Invalid code.');
        }
    };

    return (
        <View style={styles.container}>
        {!confirm ?(
            <>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Button title="Send OTP" onPress={signInWithPhoneNumber} />
            </>
        ):(
            <>
                <TextInput
                    style={styles.input}
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />
                <Button title="Confirm Code" onPress={confirmCode} />
            </>
        )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
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
  
  export default PhoneAuthentication;
