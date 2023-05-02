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

const SignUp = ({ navigation }) => {

    const checkPasswordValidity = value => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            return 'Password must not contain Whitespaces.';
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            return 'Password must have at least one Uppercase Character.';
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            return 'Password must have at least one Lowercase Character.';
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            return 'Password must contain at least one Digit.';
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            return 'Password must be 8-16 Characters Long.';
        }

        // const isContainsSymbol =
        //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        // if (!isContainsSymbol.test(value)) {
        //   return 'Password must contain at least one Special Symbol.';
        // }

        return null;
    };


    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isloading, setLoading] = useState(false)

    const validate = () => {
        const checkpassword = checkPasswordValidity(inputs.password)

        Keyboard.dismiss();
        let valid = true;

        if (!inputs.email) {
            handleerror('Please Enter Your Email', 'email');
            valid = false;
        } else if (!inputs.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            handleerror('Please Enter A Valid Email', 'email');
            valid = false;
        }

        if (!inputs.name) {
            handleerror('Please Enter Your Name', 'name');
            valid = false;
        }

        
        if (!inputs.password) {
            handleerror('Please Enter Password', 'password');
            valid = false;
        } else if(checkpassword){
            Alert.alert(`Password Invalid: ${checkpassword}`);
            valid = false
        }
        if (valid) {
            register();
        }
    };
    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            try {
                AsyncStorage.setItem('userData', JSON.stringify(inputs))
                navigation.navigate('Signin')
            } catch (e) {
                Alert.alert(`Error: ${e.message}`)
            }
        }, 3000)
    }



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

                <Text style={styles.headerText}>Sign Up</Text>

                <View style={styles.fieldSet}>

                    <Input
                        onFoucs={() => {handleerror(null, 'name');}}
                        onChangeText={(text) => handleonChange(text, 'name')}
                        placeholder={"Enter your full name"}
                        error={errors.name}
                    />

                    <Input
                        value={inputs.email}
                        onChangeText={(text) => handleonChange(text, 'email')}
                        onFoucs={() => {handleerror(null, 'email')}}
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
                        Sign Up with Google
                    </FontAwesome.Button>

                    <FontAwesome.Button name="facebook" style={styles.FacebookButton} backgroundColor='rgba(52, 52, 52, 0)'
                        onPress={() => { navigation.navigate("Signin"); }}>
                        Sign Up with Facebook
                    </FontAwesome.Button>

                </View>

                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={validate}

                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>Already Have An Acconut?
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Signin"); }}

                    >

                        <Text style={styles.footerButton}>Sign In</Text>

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
        // marginBottom: 20
    },
    fieldSet: {
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: green,
        borderStyle: "solid",
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
        textAlign: 'center'
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

export default SignUp;