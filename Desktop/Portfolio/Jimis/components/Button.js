import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const green = '#495E57';
const yellow = '#F4CE14'

const Button = ({onPress, children, disabled}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonWrapper, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 50,
    backgroundColor: yellow,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    marginBottom: '5%',
    marginHorizontal: 20
  },
  disabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: 'black',
  }
});

export default Button;
