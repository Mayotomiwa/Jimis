import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignUp from "../screens/Signup";
import Signin from "../screens/Signin";
import Home from "../screens/Home";
import Personal from '../screens/personal_Info';

import Loading from "../screens/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../screens/Profile';
import Settings from '../screens/settings';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RootNavigator = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);
    const [initRoute, setInitRoute] = React.useState('');

    React.useEffect(() => {
        setTimeout(() => {
            getUserData();
        }, 7000)
    }, [])
    const getUserData = async () => {
        try {
            let userData = await AsyncStorage.getItem('userData');
            if (userData) {
                userData = JSON.parse(userData);
                if (userData?.loggedIn) {
                    setInitRoute('Home')
                }
                else {
                    setInitRoute('WelcomeScreen')
                }
            }
            else {
                setInitRoute('WelcomeScreen')
            }
        } catch (e) {
            setInitRoute('WelcomeScreen')

        }
    }
    return (
        <>
            {!initRoute ? (
                <Loading visible={true} />
            ) : (

                <>
                    <Stack.Navigator
                        initialRouteName={initRoute}
                        screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                        <Stack.Screen name="Signin" component={Signin} />
                        <Stack.Screen name="Signup" component={SignUp} />
                        
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="Personal" component={Personal} />
                        <Stack.Screen name="Settings" component={Settings} />
                    </Stack.Navigator>

                </>
            )}
        </>

    )
}
export default RootNavigator;