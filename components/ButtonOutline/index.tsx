import { Text, Pressable, ViewStyle, TextStyle } from 'react-native'
import React, { memo } from 'react'
import { StyleSheet } from 'react-native';


const ButtonOutline = memo(({ title, onPress, style, textStyle }: { title: string; onPress: () => void; style?: ViewStyle;  textStyle?: TextStyle}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[ styles.container, style]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
});

export { ButtonOutline }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#666",
    borderWidth: 0.6,
    width: 150,
    height: 40,
  },
  text: {
    color: "#888",
    textAlign: "center",
  },
});