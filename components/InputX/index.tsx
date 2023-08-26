import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

interface AnimatedTextInputProps {
  placeholder: string;
}

const AnimatedTextInput: React.FC<AnimatedTextInputProps> = ({
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const translateY = useSharedValue(0);
  const fontSize = useSharedValue(16);

  const handleFocus = () => {
    setIsFocused(true);
    translateY.value = withSpring(-20, { damping: 10, stiffness: 90 });
    fontSize.value = withSpring(12, { damping: 10, stiffness: 90 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    translateY.value = withSpring(0, { damping: 10, stiffness: 90 });
    fontSize.value = withSpring(16, { damping: 10, stiffness: 90 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      fontSize: fontSize.value,
    };
  });

  return (
    <View style={styles.container}>
      <TapGestureHandler onActivated={handleFocus}>
        <Animated.View style={[styles.inputWrapper, animatedStyle]}>
          <TextInput
            placeholder={placeholder}
            onBlur={handleBlur}
            style={styles.input}
          />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    width: 200,
    height: 40,
  },
});

export default AnimatedTextInput;
