import { SafeAreaView, StyleSheet, Text, TouchableOpacity,  } from 'react-native';
import Colors from '../constants/Colors';


const Profile = ({ navigation }) => {
    return (
        <SafeAreaView style={profileStyles.mainContanier}>

            <Text style={profileStyles.textHeader}>Profile</Text>

            <TouchableOpacity style={profileStyles.buttonWrapper} 
            onPress={() => { navigation.navigate("Personal"); }}>
                <Text style={profileStyles.textStyles}>
                    Personal Information
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.logoutButton} onPress={() => { navigation.navigate("Settings"); }}>
                <Text style={profileStyles.textStyles}>Settings</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Profile;

const profileStyles = StyleSheet.create({
    mainContanier: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    textStyles: {
        color: Colors.black,
        fontSize: 22,
        fontStyle: 'italic',
        fontWeight: 'bold',
        width: 400,
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
        textAlign: 'left',
        marginTop: 80,
        fontSize: 66,
    },
    buttonWrapper: {
        backgroundColor: Colors.white,
        borderBottomColor: Colors.green,
        borderBottomWidth: 4,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        top: 30,
        paddingRight: 250,
        paddingHorizontal: 10,
        paddingTop: 90, 
    },
    logoutButton: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 30,
        height: 150,
        paddingTop: 90,
        paddingHorizontal: 10,
        borderBottomColor: Colors.green,
        borderBottomWidth: 4,

    }
});