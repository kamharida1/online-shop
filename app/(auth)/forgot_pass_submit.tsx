import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, useState } from "react";
import { Auth } from "aws-amplify";
import * as Yup from "yup";

import * as SecureStore from "expo-secure-store";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { AppContainer } from "../../components/AppContainer";
import { Field, Formik } from "formik";
import Cart from "../../assets/svgs/cart.svg";

import { Space } from "../../components/Space";
import { InputField } from "../../components/InputField";
import { Txt } from "../../components/Txt";
import AppForm from "../../components/AppForm";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import tw from "../../lib/tailwind";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  code: Yup.string().min(6).required(),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required")
    .label("Confirm Password"),
}); 

export default function forgot_pass_submit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { email } = useLocalSearchParams();

  return (
    <>
      <AppContainer style={tw`mt-12`}>
        <View style={tw`mx-3`}>
          <Cart width={100} height={100} style={{ alignSelf: "center" }} />

          <Txt textStyle={{ alignSelf: "center" }} title="Forgot Password" h1 />
          <Space />
          <AppForm
            initialValues={{
              email: email || "",
              code: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values: {
              email: string;
              password: string;
              code: string;
            }): Promise<void> => {
              setLoading(true);
              try {
                const { email, code, password } = values;
                await Auth.forgotPasswordSubmit(email, code, password);
                await SecureStore.setItemAsync("authKeyEmail", email);
                await SecureStore.setItemAsync("authKeyPassword", password);
                await Auth.signIn(email, password);
                router.push("/(app)/home");
                setLoading(false);
              } catch (err: any) {
                setLoading(false);
                setError(err.message);
              }
            }}
          >
            <Field
              component={InputField}
              name="email"
              placeholder="Email "
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <Field
              component={InputField}
              name="code"
              placeholder="Insert code "
              autoCapitalize="none"
              keyboardType="numeric"
              textContentType="oneTimeCode"
            />
            <Field
              name="password"
              component={InputField}
              placeholder="Password"
              autoCapitalize="none"
              isPassword
              autoCorrect={false}
    
              textContentType="password"
            />
            <Field
              name="confirmPassword"
              component={InputField}
              placeholder="Confirm Password"
              autoCapitalize="none"
              isPassword
              autoCorrect={false}
              textContentType="password"
            />
            <Space />
            {error !== "" && (
              <Txt h3 title={error as string} textStyle={{ color: "red" }} />
            )}
            <ButtonSubmit
              title="Confirm"
              disabled={loading}
              loading={loading}
            />
          </AppForm>
        </View>
      </AppContainer>
    </>
  );
}
