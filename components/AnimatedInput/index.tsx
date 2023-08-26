import React, { useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  Animated,
} from "react-native";

interface AnimatedTextInputProps {
  borderColor?: string;
  borderRadius?: number;
  shadowColor?: string;
}

const AnimatedTextInput: React.FC<AnimatedTextInputProps> = ({
  borderColor = "#ccc",
  borderRadius = 8,
  shadowColor = "#000",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderWidth = isFocused ? 2 : 1;
  const inputBorderColor = isFocused ? "blue" : borderColor;

  const shadowOpacity = isFocused ? 0.2 : 0.1;
  const shadowOffset = {
    width: 0,
    height: isFocused ? 3 : 1,
  };

  const placeholderTranslateY = new Animated.Value(isFocused ? -20 : 0);
  const placeholderColor = isFocused ? inputBorderColor : "#999";

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(placeholderTranslateY, {
      toValue: -20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(placeholderTranslateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    borderColor: inputBorderColor,
    borderWidth,
    borderRadius,
    shadowColor,
    shadowOpacity,
    shadowOffset,
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.Text
        style={[
          styles.placeholder,
          {
            transform: [{ translateY: placeholderTranslateY }],
            color: placeholderColor,
          },
        ]}
      >
        Enter text...
      </Animated.Text>
      <RNTextInput
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "white",
    width: "100%",
  },
  input: {
    flex: 1,
  },
  placeholder: {
    position: "absolute",
    left: 12,
    top: 14,
    backgroundColor: "transparent",
  },
});

export default AnimatedTextInput;
