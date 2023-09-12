import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { router } from "expo-router";
import { AppContainer } from "../../components/AppContainer";
import { Field, Formik } from "formik";
import { Space } from "../../components/Space";
import * as SecureStore from "expo-secure-store";

import Cart from '../../assets/svgs/cart.svg'

import { Button } from "../../components/Button";
import tw from "../../lib/tailwind";
import { Txt } from "../../components/Txt";
import AppForm from "../../components/AppForm";
import { InputField } from "../../components/InputField";
import { ButtonLink } from "../../components/ButtonLink";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import { View } from "moti";
import { text } from "../../constants";


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

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);


  // useEffect(() => { 
  //   const checkLoginStatus = async (): Promise<void> => {
  //     try {
  //       const email = await SecureStore.getItemAsync("authKeyEmail");
  //       const password = await SecureStore.getItemAsync("authKeyPassword");
  //       if (email && password) {
  //         router.push("/(app)/home");
  //       }
  //     } catch (err: any) {
  //       alert(err.message)
  //     }
  //   }
  //   checkLoginStatus();
  // }, []);

    return (
      <AppContainer style={tw`mt-12`}>
        <View style={tw`mx-3`}>
          <Cart width={100} height={100} style={{ alignSelf: "center" }} />
          <Txt textStyle={tw`self-center`} title="Sign In" h1 />
          <Space />
          <AppForm
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={async (values: {
              email: string;
              password: string;
            }): Promise<void> => {
              console.log(values);
              setLoading(true);
              setError("");
              try {
                const { email, password } = values;
                const user = await Auth.signIn(email, password);
                await SecureStore.setItemAsync("authKeyEmail", email);
                await SecureStore.setItemAsync("authKeyPassword", password);
                user && router.push("/(app)/home");
                setLoading(false);
              } catch ({ code }: any) {
                setLoading(false);
                if (code === "UserNotConfirmedException") {
                  setError("Account not verified yet");
                } else if (code === "PasswordResetRequiredException") {
                  setError("Existing user found. Please reset your password");
                } else if (code === "NotAuthorizedException") {
                  setUserInfo(values);
                  setError("Forgot Password?");
                } else if (code === "UserNotFoundException") {
                  setError("User does not exist!");
                } else {
                  setError(code);
                }
              }
            }}
          >
            <Field
              component={InputField}
              name="email"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              isPassword={false}
              // onBlur={() => setFieldTouched("email")}
              // onChangeText={handleChange("email")}
            />
            <Space />
            <Field
              name="password"
              component={InputField}
              placeholder="Password"
              autoCapitalize="none"
              isPassword
              autoCorrect={false}
              textContentType="password"
              // onBlur={() => setFieldTouched("password")}
              // onChangeText={handleChange("password")}
            />
            <Space height={20} />
            <ButtonSubmit
              title="Sign In"
              disabled={loading}
              loading={loading}
            />
            <Space height={15} />
            {error !== "" && (
              <Txt body3 title={error as string} textStyle={{ color: "red" }} />
            )}
            {error === "Forgot Password?" && (
              <View style={tw` absolute right-0 bottom-20`}>
                <ButtonLink
                  title="Forgot Password?"
                  onPress={() => {
                    router.push("/(auth)/forgot_password");
                  }}
                />
              </View>
            )}
            
            <ButtonLink
              onPress={() => { 
                router.push("/(auth)/sign_up");
              }}
              title="Don't have an account?  Sign Up"
              textStyle={{
                alignSelf: "center",
                textDecorationLine: "underline",
                color: "#888",
              }}
            />
          </AppForm>
        </View>
      </AppContainer>
    );
}
