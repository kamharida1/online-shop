import React, { ReactNode } from "react";
import {
  Pressable,
  Text,
  View,
  PressableProps,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ToggleButtonProps {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export function ToggleButton({
  children,
  selected,
  onPress,
}: ToggleButtonProps) {
  return (
    <Button
      onPress={onPress}
      style={{ marginRight: 8 }}
      buttonStyle={{ backgroundColor: selected ? "#F29938" : "#D1D1D6" }}
    >
      {children}
    </Button>
  );
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function Button({
  children,
  onPress,
  style,
  buttonStyle,
  textStyle,
  disabled
}: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={style}>
      {({ pressed, hovered }) => (
        <View
          style={[
            {
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 8,
              justifyContent: "center",
              alignItems: "center",
              opacity: disabled ? 0.6 : 1
            },
            buttonStyle,
            hovered && { opacity: 0.8 },
            pressed && { opacity: 0.6 },
          ]}
        >
          <Text
            selectable={false}
            style={[
              { color: "white", fontSize: 16, textAlign: "center" },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
