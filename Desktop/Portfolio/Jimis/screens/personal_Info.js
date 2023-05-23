import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';


const Personal = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [userDetails, setUserDetails] = useState();
    const [isEditable, setIsEditable] = useState(false);

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                setUserDetails(JSON.parse(userData))
                // console.log(userData);
            }
        } catch (e) {
            Alert.alert(`Error: The error is here 1 ${e.message}`)
        }
    }
    const Logout = () => {
        AsyncStorage.setItem('userData', JSON.stringify({...userDetails, loggedIn: false}));
        navigation.navigate('WelcomeScreen')
    };
    const pickImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(_image));
        if (!_image.canceled) {
            setImage(_image.assets);
        }
    };
    const UpdateState = async () => {
        setIsEditable(!isEditable)
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <SafeAreaView style={profileStyles.mainContanier}>

            <Text style={profileStyles.textHeader}>Personal Information</Text>

            <View style={profileStyles.container}>

                {image && <Image source={image} style={profileStyles.image} />}

                <View style={profileStyles.imageContainer}>
                    <TouchableOpacity onPress={pickImage} style={profileStyles.btn} >
                        <Text style={profileStyles.textStyles}>{image ? 'Edit' : 'Upload'} Image</Text>
                        <AntDesign name="camera" size={20} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style = {profileStyles.buttonWrapper} onPress={UpdateState}>
                <Text style={profileStyles.textStyles}>
                    {isEditable ? 'Save Information' : 'Edit Information'}
                </Text>
            </TouchableOpacity>
            <View style={profileStyles.textInputStyle}>
            <TextInput
                        placeholder={isEditable ? 'Please Insert Name' : 'Input Disabled'}
                        underlineColorAndroid="transparent"
                        value= {userDetails.name}
                        style={[
                            profileStyles.textInputStyle,
                            {
                                borderColor: isEditable ? 'black' : 'red',
                                backgroundColor: isEditable ? 'white' : '#d8d8d8',
                                //updating the border color on enable/disable
                            },
                        ]}
                        //editable is used to make TextInput enable/disable
                        editable={isEditable}
                    />
                     <TextInput
                        placeholder={isEditable ? 'Please Insert Email' : 'Input Disabled'}
                        underlineColorAndroid="transparent"
                        value= {userDetails.email}
                        style={[
                            profileStyles.textInputStyle,
                            {
                                borderColor: isEditable ? 'black' : 'red',
                                backgroundColor: isEditable ? 'white' : '#d8d8d8',
                                //updating the border color on enable/disable
                            },
                        ]}
                        //editable is used to make TextInput enable/disable
                        editable={isEditable}
                    />
                    
                </View>
                <TouchableOpacity style = {profileStyles.logoutButton} onPress={() => { navigation.navigate("Home"); }}>
                <Text style={profileStyles.textStyles}>Done</Text>
            </TouchableOpacity>
                <TouchableOpacity style = {profileStyles.logoutButton} onPress={Logout}>
                <Text style={profileStyles.textStyles}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Personal;

const profileStyles = StyleSheet.create({
    mainContanier: {
        flex: 1,
    },
    container: {
        elevation: 2,
        height: 180,
        width: 180,
        backgroundColor: Colors.grey,
        marginHorizontal: 20,
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    image: {
        width: 200,
        height: 200,
    },
    btn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    imageContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: Colors.green,
        width: '100%',
        height: '25%',
    },
    textStyles: {
        color: Colors.white,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    textHeader: {
        color: Colors.green,
        fontSize: 24,
        fontFamily: 'Helvetica',
        fontWeight: 500,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    textInputStyle: {
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    buttonWrapper: {
        borderRadius: 50,
        backgroundColor: Colors.yellow,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 30,
        padding: 12,
        marginBottom: '5%',
        marginHorizontal: 20
    },
    logoutButton: {
        borderRadius: 50,
        backgroundColor: Colors.yellow,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 300,
        padding: 12,
        marginBottom: '5%',
        marginHorizontal: 20
    }
});