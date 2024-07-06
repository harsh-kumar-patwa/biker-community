import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet ,Image} from 'react-native';
import auth from '@react-native-firebase/auth';

function PhoneAuthentication({navigation}){
    //initialising all the states
    const [phoneNumber, setPhoneNumber] = useState('+91 ');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirm, setConfirm] = useState(null);

    //function to send OTP to the phone number
    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
            alert('OTP has been sent to your phone.');
        } catch (error) {
            alert(error.message);
        }
    };

    //function to confirm the OTP that was sent to the phone number
    const confirmCode = async()=>{
        try {
            await confirm.confirm(verificationCode);
            alert('Phone number verified');
            navigation.navigate('Home');
        } catch (error) {
            alert('Invalid code. Please try again.');
        }
    };

    
    return (
        <View style={styles.container}> 
        {!confirm ?
            (
            //if confirmation is not sent then showing the phone number input field
            <>
                <Image source={require('../../assets/auth.jpg')} style={{width: 400, height: 500, alignSelf: 'center'}} />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Button title="Send OTP" onPress={signInWithPhoneNumber} />
            </>
            ):
            
            (
            //if confirmation is sent then showing the verification code input field
            <>
                <Image source={require('../../assets/otp.png')} style={{width: 300, height: 300, alignSelf: 'center',marginBottom:20}} />
                <TextInput
                    style={styles.input}
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />
                <Button title="Confirm Code" onPress={confirmCode} />
            </>
            )
        }
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
