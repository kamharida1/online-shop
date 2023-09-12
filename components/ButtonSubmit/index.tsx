import React from "react";
import { ActivityIndicator, Button, Pressable } from "react-native";
import { useFormikContext } from "formik";
import { Txt } from "../Txt";

interface AppFormSubmitButtonProps {
  title: string;
  disabled?: boolean;
  //onPress: () => void;
  loading?: boolean;
}
const ButtonSubmit = ({ title, disabled, loading}: AppFormSubmitButtonProps) => {

  const { handleSubmit, isValid } = useFormikContext();
  // return <Button  onPress={() => handleSubmit()} title={title} disabled={!isValid} />;
  return (
    <Pressable
    style={{
      backgroundColor: disabled ? "#ccc" : "#007BFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    }}
    onPress={() => handleSubmit()}
    disabled={!isValid && disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
        <Txt title={title} h4  textStyle={{ color: "#fff" }} />
    )}
  </Pressable>
  )
};
export { ButtonSubmit };
