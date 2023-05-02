import React from 'react';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from "react-native-paper";

const green = '#495E57';

const Loader = ({ visible = false }) => {
    const { height, width } = useWindowDimensions
    return (
        visible &&
            <View style={[loaderStyles.container, { height, width }]}>
                <View style={loaderStyles.loader}>
                    <ActivityIndicator size={"large"} color={green} />
                </View>
            </View>
    )
};

const loaderStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 550,
    },
    loader: {
        height: 70,
        marginHorizontal: -370,
        marginVertical: -50,
        bottom: 70,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
});

export default Loader;