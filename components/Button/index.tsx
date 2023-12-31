import React, { memo } from "react";
import {
  Platform,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  TouchableOpacity,
  ViewStyle,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Txt } from "../Txt";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { card, primary, secondary, tint } from "../../constants";
import { useFormikContext } from "formik";


const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 55,
    alignSelf: 'center',
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginVertical: 12,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#000000",
  },
  buttonIcon: {
    paddingRight: 8,
    // width: 40,
    // height: 40,
  },
});

interface ButtonT {
  title: string;
  cancel?: boolean;
  onPress?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  theme?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = memo<ButtonT>((
  {
    title,
    onPress,
    theme,
    loading = false,
    viewStyle,
  }) => {
  const { handleSubmit, isValid } = useFormikContext();
  { 
    !isValid && (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 4,
            borderColor: primary,
            borderRadius: 18,
            opacity: 0.5,
          },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#666" }]}
          onPress={() => handleSubmit()}
        >
          <Txt textStyle={{ color: "#666"}} button title={title} />
        </Pressable>
      </View>
    );
  }
  {
    loading && (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: primary, borderRadius: 18, opacity: 0.5 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={() => handleSubmit()}
        >
          <ActivityIndicator animating={loading} color={tint}  style={styles.buttonIcon} />
          <Txt button title={title} />
        </Pressable>
      </View>
    );
  }
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: tint, borderRadius: 10 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: '#000' }]}
          onPress={() => handleSubmit()} 
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Txt textStyle={{ color: "#fff" }} button title={title} />
        </Pressable>
      </View>
    );
  } else if (theme === "secondary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: tint, borderRadius: 10 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => handleSubmit()}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#000"
            style={styles.buttonIcon}
          />
          <Txt textStyle={{ color: "#000000" }} button title={title} />
        </Pressable>
      </View>
    );
  }
  return (
    <View style={[styles.buttonContainer, viewStyle]}>
      <Pressable onPress={onPress} style={styles.button}>
        <Txt body textStyle={styles.buttonLabel} button title={title} />
      </Pressable>
    </View>
  )
})

export { Button };
