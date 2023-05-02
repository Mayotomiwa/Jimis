import * as React from 'react'
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import Colors from '../constants/Colors';

const green = '#495E57';
const red = '#C00404';

const Input = ({
    error,
    password,
    onFocus = () => { },
    ...props
}) => {
    const [focused, setFocused] = useState(false)
    const [seePassword, setSee] = useState(password)

    return (
        <View>
            <View style={[inputStyes.inputContainer,
            {
                borderColor: error
                ? Colors.red
                : focused
                ? Colors.green
                : Colors.light,
              alignItems: 'center',
            }
            ]}>
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setFocused(true);
                    }}
                    onBlur={() => setFocused(false)}
                    secureTextEntry={seePassword}
                    style={inputStyes.input}
                    {...props}
                />
                {password && (
                    <TouchableOpacity
                        style={inputStyes.wrapperIcon}
                        onPress={() => setSee(!seePassword)}>
                        <Text style={inputStyes.iconText}>{seePassword ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                )}



            </View>
            {error && (
                <Text style={inputStyes.errorText}>{error}</Text>
            )}
        </View>
    )
};

const inputStyes = StyleSheet.create({
    inputContainer: {
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 24,
        padding: 10,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: green
    },
    input: {
        fontSize: 16,
        color: 'black',
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
        color: green,
        fontSize: 18
    },
    errorText: {
        flexDirection: 'row',
        color: red,
        fontSize: 12,
        fontWeight: 900,
        marginHorizontal: 45,
    }
});

export default Input;