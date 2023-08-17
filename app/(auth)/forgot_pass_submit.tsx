import { StyleSheet, Text, View } from 'react-native'
import React, { ReactElement, useState } from 'react'
import { Auth } from 'aws-amplify';
import * as Yup from "yup";

import * as SecureStore from "expo-secure-store";
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { goBack } from '../../constants/Dimensions';
import { AppContainer } from '../../components/AppContainer';
import { Formik } from 'formik';
import { Input } from '../../components/Input';
import { TextError } from '../../components/TextError';
import { Space } from '../../components/Space';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/auth';


export default function forgot_pass_submit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const { setUser } = useAuth();

  const {email} = useLocalSearchParams()

  const _onPress = async (values: {
    email: string;
    password: string;
    code: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      const { email, code, password } = values;
      await Auth.forgotPasswordSubmit(email, code, password);
      const user = await Auth.signIn(email, password);
      setUser(user)
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <>
      <AppContainer
        title="Confirmation"
        onPress={goBack(navigation)}
        loading={loading}
        //message={error}
      >
        <Formik
          initialValues={{
            email: (email as string) || "",
            code: "",
            password: "",
            passwordConfirmation: "",
          }}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            code: Yup.string().min(6).required(),
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
                name="code"
                value={values.code}
                onChangeText={handleChange("code")}
                onBlur={async () => {
                  await setFieldTouched("code");
                }}
                placeholder="Code"
                touched={touched}
                errors={errors}
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
              {error !== "" && (
                <TextError title={error} textStyle={{ alignSelf: "center" }} />
              )}
              <Space height={30} />
              <Button title="Confirm" onPress={handleSubmit} />
              <Space height={80} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  );
}