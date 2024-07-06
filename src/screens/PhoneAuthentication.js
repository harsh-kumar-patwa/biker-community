import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

function PhoneAuthentication({navigation}){
    //initialising all the states
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirm, setConfirm] = useState(null);

    //function to send OTP to the phone number
    const signInWithPhoneNumber = async () => {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    };

    //function to confirm the OTP that was sent to the phone number
    const confirmCode = async()=>{
        //try-catch block to handle the invalid otp or some error
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
            //if confirmation is not sent then showing the phone number input field
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
            //if confirmation is sent then showing the verification code input field
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
// a basic styling 
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
