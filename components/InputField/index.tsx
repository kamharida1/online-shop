import { Text, View } from "moti";
import { memo, useState } from "react";
import { Pressable, TextInput } from "react-native";
import tw from "../../lib/tailwind";
import { Space } from "../Space";
import { Ionicons } from "@expo/vector-icons";

const InputField = memo((props: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const {
    placeholder,
    icon,
    isPassword,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  const hasError = errors[name] && touched[name];
  return (
    <>
      <View style={tw`border-zinc-400 border rounded w-full  p-4 flex-row`}>
        {icon && (
          <Ionicons
            name={icon}
            size={25}
            color="black"
            style={{
              left: 15,
              right: 10,
              position: "absolute",
              zIndex: 1,
            }}
          />
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          secureTextEntry={ isPassword && secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
          style={{ fontFamily: "AirMedium", flex: 1 }}
        />
        {isPassword && (
          <Pressable
            style={{
              position: "absolute",
              right: 10,
              top: 14,
              zIndex: 1,
            }}
            onPress={toggleSecureTextEntry}
          >
            <Ionicons
              name={secureTextEntry ? "md-eye-off" : "md-eye"}
              size={25}
              color="black"
            />
          </Pressable>
        )}
      </View>
      <Space height={5} />
      {hasError && (
        <Text style={{ color: "red", fontFamily: "AirMedium" }}>
          {errors[name]}
        </Text>
      )}
    </>
  );
 });

export { InputField }