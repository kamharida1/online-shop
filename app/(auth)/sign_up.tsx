import "@fullstackcraft/react-native-keyboard-shift";
import * as SecureStore from 'expo-secure-store'
import * as Yup from "yup";
import { Formik } from "formik";
import { ReactElement, useState } from "react";
import { Auth } from "aws-amplify";
import { Stack, useNavigation, useRouter } from "expo-router";

import { Input } from "../../components/Input";
import { AppContainer } from "../../components/AppContainer";
import { Space } from "../../components/Space";
import { TextError } from "../../components/TextError";
import { Button } from "../../components/Button";
import { goBack } from "../../constants";

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter();
  const navigation = useNavigation()

  const _onPress = async (values: { email: string; password: string; passwordConfirmation: string }): Promise<void> => {
    const { email, password, passwordConfirmation } = values
    if (password !== passwordConfirmation) {
      setError('Passwords do not match!');
    } else {
      setLoading(true);
      setError('');
      try {
        const user = await Auth.signUp(email, password);
        user &&
          router.push({
            pathname: '/(auth)/confirm_signup',
            params: { email, password },
          });
        setLoading(false);
       } catch (err: any) {
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
  }
  return (
    <AppContainer
      onPress={goBack(navigation)}
      title="Sign Up"
      loading={loading}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Formik
        initialValues={{ email: "", password: "", passwordConfirmation: "" }}
        onSubmit={(values): Promise<void> => _onPress(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
          passwordConfirmation: Yup.string().min(6).required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
        }): ReactElement => (
          <>
            <Input
              name="email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={async () => {
                await setFieldTouched("email");
              }}
              placeholder="E-mail"
              touched={touched}
              errors={errors}
              autoCapitalize="none"
            />
            <Input
              name="password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={async () => {
                await setFieldTouched("password");
              }}
              placeholder="Password"
              touched={touched}
              errors={errors}
              autoCapitalize="none"
              secureTextEntry
            />
            <Input
              name="passwordConfirmation"
              value={values.passwordConfirmation}
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={async () => {
                await setFieldTouched("passwordConfirmation");
              }}
              placeholder="Password confirm"
              touched={touched}
              errors={errors}
              autoCapitalize="none"
              secureTextEntry
            />
            <Space height={30} />
            {error !== "" && (
              <TextError title={error} textStyle={{ alignSelf: "center" }} />
            )}
            <Button
              title="Sign Up"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </AppContainer>
  );
}
