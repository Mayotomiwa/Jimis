import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useUpdate from '../constants/useUpdate';
import Colors from '../constants/Colors';

const Settings = ({ navigation }) => {
    const [preferences, setPreferences] = useState({
        pushNotifications: false,
        emailMarketing: false,
        latestNews: false,
    });
    useEffect(() => {
        // Populating preferences from storage using AsyncStorage.multiGet
        (async () => {
            try {
                const values = await AsyncStorage.multiGet(Object.keys(preferences));
                const initialState = values.reduce((acc, curr) => {
                    // Every item in the values array is itself an array with a string key and a stringified value, i.e ['pushNotifications', 'false']
                    acc[curr[0]] = JSON.parse(curr[1]);
                    return acc;
                }, {});
                setPreferences(initialState);
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`);
            }
        })();
    }, []);
    useUpdate(() => {
        (async () => {
            const keyValues = Object.entries(preferences).map((entry) => {
                return [entry[0], String(entry[1])];
            });
            try {
                await AsyncStorage.multiSet(keyValues);
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`);
            }
        })();
    }, [preferences]);

    const updateState = (key) => () =>
        setPreferences((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Account Preferences</Text>
            <View style={styles.row}>
                <Text>Push notifications</Text>
                <Switch
                    value={preferences.pushNotifications}
                    onValueChange={updateState('pushNotifications')}
                />
            </View>
            <View style={styles.row}>
                <Text>Marketing emails</Text>
                <Switch
                    value={preferences.emailMarketing}
                    onValueChange={updateState('emailMarketing')}
                />
            </View>
            <View style={styles.row}>
                <Text>Latest news</Text>
                <Switch style={styles.Switcher}
                    value={preferences.latestNews}
                    onValueChange={updateState('latestNews')}
                />
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={() => { navigation.navigate("Home"); }}>
                <Text style={styles.textStyles}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.white,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        color: Colors.green,
    },
    header: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.green,
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
    },
    textStyles: {
        color: Colors.white,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
});