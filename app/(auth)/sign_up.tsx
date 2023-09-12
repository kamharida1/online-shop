import "@fullstackcraft/react-native-keyboard-shift";
import * as SecureStore from 'expo-secure-store'
import * as Yup from "yup";
import { Field,  } from "formik";
import {  useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "expo-router";

import { AppContainer } from "../../components/AppContainer";
import { Space } from "../../components/Space";
import Cart from "../../assets/svgs/cart.svg";

import tw from "../../lib/tailwind";
import { Txt } from "../../components/Txt";
import AppForm from "../../components/AppForm";
import { InputField } from "../../components/InputField";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import { View } from "moti";
import { ButtonLink } from "../../components/ButtonLink";

const validationSchema = Yup.object().shape({
  //name: Yup.string().required("Name is required").label("Name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required")
    .label("Email"),
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

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter();

  return (
    <AppContainer style={tw`mt-12`}>
      <View style={tw`mx-3`}>
        <Cart width={100} height={100} style={{ alignSelf: "center" }} />

        <Txt textStyle={tw`self-center`} title="Sign Up" h1 />
        <Space />
        <AppForm
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values: {
            email: string;
            password: string;
            confirmPassword: string;
          }): Promise<void> => {
            const { email, password, confirmPassword } = values;
            if (password !== confirmPassword) {
              setError("Passwords do not match!");
            } else {
              setLoading(true);
              setError("");
              try {
                const user = await Auth.signUp(email, password);
                await SecureStore.setItemAsync("authKeyEmail", email);
                await SecureStore.setItemAsync("authKeyPassword", password);
                user &&
                  router.push({
                    pathname: "/(auth)/confirm_signup",
                    params: { email, password },
                  });
                setLoading(false);
              } catch (err: any) {
                setLoading(false);
                if (err.code === "UserNotConfirmedException") {
                  setError("Account not verified yet");
                } else if (err.code === "PasswordResetRequiredException") {
                  setError("Existing user found. Please reset your password");
                } else if (err.code === "NotAuthorizedException") {
                  setError("Forgot Password?");
                } else if (err.code === "UserNotFoundException") {
                  setError("User does not exist!");
                } else {
                  setError(err.code);
                }
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
          />
          <Space />
          <Field
            name="confirmPassword"
            component={InputField}
            placeholder="Confirm Password"
            isPassword
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
          />
          <Space />
          <ButtonSubmit title="Sign Up" loading={loading} />
          <Space />
          {error !== "" && (
            <Txt h3 title={error as string} textStyle={{ color: "red" }} />
          )}
          <ButtonLink
            onPress={() => {
              router.push("/(auth)/sign_in");
            }}
            title="Already have an account?  Sign In"
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
