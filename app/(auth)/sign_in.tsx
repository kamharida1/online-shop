import { Auth } from "aws-amplify";
import { ReactElement, useState } from "react";
import * as Yup from "yup";
import * as SecureStore from 'expo-secure-store'
import { Redirect, useNavigation, useRouter } from "expo-router";
import { goBack } from "../../constants/Dimensions";
import { AppContainer } from "../../components/AppContainer";
import { Formik } from "formik";
import { Space } from "../../components/Space";
import { Input } from "../../components/Input";
import { TextError } from "../../components/TextError";
import { ButtonLink } from "../../components/ButtonLink";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/authContext";

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
   const { loading, error, signIn } = useAuth();

  const router = useRouter();
  const navigation = useNavigation();

  const _onPress = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
      const { email, password } = values;
      signIn(email, password);
  };
  return (
    <>
      <AppContainer
        onPress={goBack(navigation)}
        title="Sign In"
        loading={loading}
        // message={error}
      >
        <Formik
          enableReinitialize
          initialValues={userInfo}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
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
              <Space height={90} />
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
              {error !== "Forgot Password?" && (
                // <TextError title={error} textStyle={{ alignSelf: "center" }} />
                ""
              )}
              {error === "Forgot Password?" && (
                <ButtonLink
                  title={error}
                  onPress={() =>
                    router.push({ pathname: '/(auth)/forgot_password', params: {email: userInfo.email} })}
                  textStyle={{ alignSelf: "center" }}
                />
              )}
              <Button title="Sign In" onPress={handleSubmit} />
              <Space height={130} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  );
}
