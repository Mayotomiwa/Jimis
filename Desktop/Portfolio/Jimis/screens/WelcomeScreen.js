import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
const green = '#495E57';
const yellow = '#F4CE14'

const WelcomeScreen = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/Landing_Page.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.Text}>
                    <Text style={styles.mainText}>Welcome To{"\n"}
                        <Text style={styles.colorText}>Little Lemon{"\n"}</Text>
                    </Text>
                    <Text style={styles.mainText}>
                        Your Local Nigerian Bistro
                    </Text>
                </Text>

                <Button
                    onPress={() => { navigation.navigate("Signin"); }}>Sign In</Button>
                <Button
                    onPress={() => { navigation.navigate("Signup"); }}>Sign Up</Button>
            </ImageBackground>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    Text: {
        flex: 0.5,
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 85,
        textAlign: 'center',
        color: '#FFFFFF',
        bottom: 20,
    },
    mainText: {
        color: "white",
        fontSize: 22,
        marginTop: 1000,
        textAlign: "center",
        fontWeight: "bold"

    },
    colorText: {
        color: yellow,
        fontSize: 32,
        marginTop: 1000,
        textAlign: "center",
        fontWeight: "bold"
    },
});

export default WelcomeScreen;
