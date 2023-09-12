import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { InputField } from "../../../components/InputField";
import { Button } from "../../../components/Button";
import { Space } from "../../../components/Space";
import { Txt } from "../../../components/Txt";
import AppForm from "../../../components/AppForm";
import { SafeAreaView } from "moti";
import tw from "../../../lib/tailwind";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter valid email")
    .label("Email"),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .label("Password"),
});

const Forms = () => {
  return (
    <SafeAreaView style={tw`flex-1 items-center m-4 justify-center`}>
      <Txt title="Sign Up" h1 />
      <Space />
      <AppForm
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values: any) => console.log(values)}
      >
        <Field
          component={InputField}
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          // onBlur={() => setFieldTouched("email")}
          // onChangeText={handleChange("email")}
        />
        <Space />
        <Field
          name="password"
          component={InputField}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
          // onBlur={() => setFieldTouched("password")}
          // onChangeText={handleChange("password")}
        />
        <Space />
        <Button theme="primary" title="Login" />
      </AppForm>
    </SafeAreaView>
  );
};

export default Forms;

const styles = StyleSheet.create({});
