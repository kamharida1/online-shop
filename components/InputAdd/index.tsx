import { Text, View } from "moti";
import { memo, useState } from "react";
import { Pressable, TextInput } from "react-native";
import tw from "../../lib/tailwind";
import { Space } from "../Space";
import { Ionicons } from "@expo/vector-icons";

const InputAdd = memo((props: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    placeholder,
    icon,
    isPassword,
    label,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  const hasError = errors[name] && touched[name];
  return (
    <View style={{ marginVertical: 10}}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
        {label}
      </Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        secureTextEntry={isPassword && secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        {...inputProps}
        style={{ 
          padding: 10,
          borderWidth: 1,
          borderColor: "#D0D0D0",
          borderRadius: 5,
          marginTop: 10,
         }}
      />

      <Space height={5} />
      {hasError && (
        <Text style={{ color: "red", fontFamily: "AirMedium" }}>
          {errors[name]}
        </Text>
      )}
    </View>
  );
});

export { InputAdd };
