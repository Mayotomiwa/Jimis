import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Keyboard, Alert, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const green = '#495E57';
const yellow = '#F4CE14';
const blue = '#024BA1';
const red = '#C00404';

import Input from "../components/Input";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Loader from "../components/Loader";

const Signin = ({ navigation }) => {

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isloading, setLoading] = useState(false)

    const logIn = () => {

        Keyboard.dismiss();
        let valid = true;

        if (!inputs.email) {
            handleerror('Please Enter Your Email', 'email');
            valid = false;
        }

        if (!inputs.password) {
            handleerror('Please Enter Your Password', 'password');
            valid = false;
        }

        if (valid) {
            handlelogin();
        }
    };

    const handlelogin = () => {
        setLoading(true);
        setTimeout(async () => {
          setLoading(false);
          let userData = await AsyncStorage.getItem('userData');
          if (userData) {
            userData = JSON.parse(userData);
            if (
              inputs.email == userData.email &&
              inputs.password == userData.password
            ) {
              navigation.navigate('Home');
              AsyncStorage.setItem(
                'userData',
                JSON.stringify({...userData, loggedIn: true}),
              );
            } else {
              Alert.alert('Invalid', 'Invalid Details');
            }
          } else {
            Alert.alert('Invalid', 'User does not exist');
          }
        }, 3000);
      };

    const handleonChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    };

    const handleerror = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }))
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Loader visible={isloading} />
            <ImageBackground
                source={require('../assets/images/Landing_Page.jpg')}
                resizeMode="cover"
                style={styles.image}>

                <Text style={styles.Text}>

                    <Text style={styles.mainText}>Welcome To{"\n"}
                        <Text style={styles.colorText}>Little Lemon{"\n"}</Text>
                    </Text>

                    <Text style={styles.mainText}>Your Local Nigerian Bistro</Text>


                </Text>

                <Text style={styles.headerText}>Sign In</Text>

                <View style={styles.fieldSet}>

                    <Input
                        value={inputs.email}
                        onChangeText={(text) => handleonChange(text, 'email')}
                        onFoucs={() => { handleerror(null, 'email') }}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        placeholder={"Type your email"}
                        error={errors.email}
                    />

                    <Input
                        value={inputs.password}
                        onChangeText={(text) => handleonChange(text, 'password')}
                        onFoucs={() => { handleerror(null, 'password') }}
                        placeholder="Enter Password"
                        error={errors.password}
                        password
                    />

                    <Text style={styles.subText}>OR</Text>

                    <FontAwesome.Button name="google" style={styles.GoogleButton} backgroundColor='rgba(52, 52, 52, 0)'
                        onPress={() => { navigation.navigate("Signin"); }}>
                        Continue with Google
                    </FontAwesome.Button>

                    <FontAwesome.Button name="facebook" style={styles.FacebookButton} backgroundColor='rgba(52, 52, 52, 0)'
                        onPress={() => { navigation.navigate("Signin"); }}>
                        Continue with Facebook
                    </FontAwesome.Button>

                </View>

                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={logIn}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>Don't Have An Acconut?
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Signup"); }}

                    >

                        <Text style={styles.footerButton}>Sign Up</Text>

                    </TouchableOpacity>

                </Text>

            </ImageBackground>

        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    Text: {
        flex: 0.7,
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 45,
        textAlign: 'center',
        color: '#FFFFFF',
        bottom: 30,
    },
    mainText: {
        color: "white",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold"
    },
    subText: {
        color: "white",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 10
    },
    colorText: {
        color: yellow,
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold"
    },
    headerText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        bottom: 70,
    },
    fieldSet: {
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: green,
        borderStyle: "solid",
        bottom: 70,
        // marginTop: '40%'
    },
    wrapperIcon: {
        position: 'absolute',
        right: 0,
        padding: 10,
        color: green,
        fontWeight: 'bold',
        fontSize: 20
    },
    iconText: {
        position: 'absolute',
        right: 15,
        padding: 32,
        color: green,
        fontSize: 18
    },
    FacebookButton: {
        borderRadius: 50,
        backgroundColor: blue,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        marginBottom: '5%',
        marginHorizontal: 20
    },
    GoogleButton: {
        borderRadius: 50,
        backgroundColor: red,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        marginBottom: '5%',
        marginHorizontal: 20
    },
    buttonWrapper: {
        borderRadius: 50,
        backgroundColor: yellow,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        marginBottom: '5%',
        bottom: 50,
        marginHorizontal: 20
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    buttonDisabled: {
        backgroundColor: 'grey',
        opacity: 0.5,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        marginBottom: '5%',
        marginHorizontal: 20
    },
    footerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        bottom: 50,
    },
    footerButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: green,
        textAlign: 'center',
        marginHorizontal: 5,
        top: 3
    }

})

export default Signin;