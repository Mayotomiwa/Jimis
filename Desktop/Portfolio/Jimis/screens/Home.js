import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView,Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Button from '../components/Button';

const Home = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                setUserDetails(JSON.parse(userData))
            }
        } catch (e) {
            Alert.alert(`${e.message}`)
        }

    }

    return (
        <SafeAreaView style={homeStyles.container}>
            <View style={homeStyles.top}>
                <View style = {homeStyles.header}>
                    <Text style={homeStyles.colorText}>Little Lemon {'\n'} </Text>
                    <Text style={homeStyles.headerText}>Lagos {'\n'}</Text>
                </View>
                <View style={homeStyles.text}>
                    <Text style={homeStyles.textColor}>We are a family owned Nigerian restaurant,
                        focused on traditional recipes served with a modern twist.</Text>
                        <Image resizeMode='cover' style={homeStyles.image} source={require('../assets/images/Home_PageA.jpg')} />
                </View>
                <TouchableOpacity style={homeStyles.Button}>
                    <Text style={homeStyles.buttonText}>Reseve A Table</Text>
                </TouchableOpacity>
                <Input></Input>
            </View>
        </SafeAreaView>
    )
};

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 0.6,
        backgroundColor: Colors.green,
    },
    header: {
        position: 'absolute',
        left: 10,
        top: 30,
        width: 410,
        height: 108,
        marginBottom: 20,
    },
    colorText: {
        position: 'absolute',
        color: Colors.yellow,
        fontSize: 46,
        fontWeight: 400,
    },
    headerText: {
        color: Colors.white,
        fontSize: 35,
        top: 50,
        fontWeight: 400,
        marginBottom: 10,
    },
    textColor: {
        color: Colors.white,
        position: 'absolute',
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 28,
        marginTop: 20,
    },
    text: {
        position: 'absolute',
        left: 10,
        top: 108,
        width: 190,
        height: 220,
        textAlign: 'left',
    },
    image: {
        position: 'absolute',
        left: 190,
        width: 180,
        height: 220,
    },
    Button: {
        position: 'absolute',
        marginTop: 5,
        backgroundColor: Colors.yellow,
        color: Colors.white,
        borderColor: Colors.green,
        borderWidth: 1,
        borderRadius: 30,
        width: 180,
        top: 300,
        left: 10,
        height: 40,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 20,
        top: 5,
        textAlign: 'center',
        fontWeight: 300,
    }
})
export default Home;

    // const logout = () => {
    //     AsyncStorage.setItem('userData',JSON.stringify({ ...userDetails, loggedIn: false }),
    //     );
    //     navigation.navigate('WelcomeScreen');
    // };