import { Text, View } from "react-native";

import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ReactElement, useState } from "react";
import { Space } from "../../components/Space";
import { Input } from "../../components/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextError } from "../../components/TextError";
import { AppContainer } from "../../components/AppContainer";
import { ButtonLink } from "../../components/ButtonLink";
import { Auth } from "aws-amplify";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/authContext";
import { goBack } from "../../constants";

export default function ConfirmSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const navigation = useNavigation();
  const router = useRouter();

  const { email, password } = useLocalSearchParams<{
    email?: string;
    password?: string;
  }>();

  const _onPress = async (values: { code: string }): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const { code } = values;
      await Auth.confirmSignUp(email as string, code, {
        forceAliasCreation: true,
      });
      const user = await Auth.signIn(email as string, password);
      setUser(user);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      if (err.code === "UserNotConfirmedException") {
        setError("Account not verified yet");
      } else if (err.code === "PasswordResetRequiredException") {
        setError("Existing user found. Please reset your password");
      } else if (err.code === "NotAuthorizedException") {
        setError("Forgot Password?");
      } else if (err.code === "UserNotFoundException") {
        setError("User does not exist!");
      }
    }
  };

  const _onResend = async (): Promise<void> => {
    try {
      const { email } = useLocalSearchParams();
      await Auth.resendSignUp(email as string);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <AppContainer
        title="Confirmation"
        onPress={goBack(navigation)}
        loading={loading}
      >
        <Formik
          initialValues={{ code: "" }}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            code: Yup.string().min(6).required(),
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
              <Space height={180} />
              <Input
                name="code"
                value={values.code}
                onChangeText={handleChange("code")}
                onBlur={async () => {
                  await setFieldTouched("code");
                }}
                placeholder="Insert code"
                touched={touched}
                errors={errors}
              />
              <ButtonLink
                title="Resend code?"
                onPress={_onResend}
                textStyle={{ alignSelf: "center" }}
              />
              {error !== "Forgot Password?" && <TextError title={error} />}
              <Button title="Confirm" onPress={handleSubmit} />
              <Space height={50} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  );
}
