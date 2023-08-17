import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CustomTextInputProps extends TextInputProps {
  error?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  onFocus,
  onBlur,
  error,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const placeholderY = useSharedValue(restProps.value ? -20 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
    placeholderY.value = withTiming(-20, {
      duration: 200,
      easing: Easing.ease,
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
    placeholderY.value = withTiming(0, { duration: 200, easing: Easing.ease });
  };

  const animatedStyles = useAnimatedStyle(() => ({
    borderBottomColor: error ? "red" : isFocused ? "blue" : "black",
    transform: [{ translateY: placeholderY.value }],
  }));

  return (
    <Animated.View style={[{ marginBottom: 10 }, animatedStyles]}>
      <TextInput
        {...restProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          borderBottomWidth: 1,
          paddingVertical: 8,
        }}
      />
      <Animated.Text
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          fontSize: 16,
        }}
      >
        {restProps.placeholder}
      </Animated.Text>
    </Animated.View>
  );
};

export default CustomTextInput;
