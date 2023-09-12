import { Text, View } from "react-native";

import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ReactElement, useState } from "react";
import { Space } from "../../components/Space";
import { Input } from "../../components/Input";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { TextError } from "../../components/TextError";
import { AppContainer } from "../../components/AppContainer";
import { ButtonLink } from "../../components/ButtonLink";
import { Auth } from "aws-amplify";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/authContext";
import { goBack } from "../../constants";
import { Txt } from "../../components/Txt";
import AppForm from "../../components/AppForm";
import { InputField } from "../../components/InputField";
import { ButtonSubmit } from "../../components/ButtonSubmit";

const validationSchema = Yup.object().shape({
  code: Yup.string().min(6).required(),
});

export default function ConfirmSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  

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
      <AppContainer loading={loading}>
        <Txt title="Confirm SignUp" h0 />
        <Space />
        <AppForm
          initialValues={{ code: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values: { code: string }): Promise<void> => {
            setLoading(true);
            setError("");
            try {
              const { code } = values;
              const { email, password } = useLocalSearchParams<{
                email?: string;
                password?: string;
              }>();
              await Auth.confirmSignUp(email as string, code, {
                forceAliasCreation: true,
              });
              const user = await Auth.signIn(email as string, password);
              user && router.push("/(app)/home");
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
          }}
        >
          <Field
            component={InputField}
            name="code"
            placeholder="Insert code"
            autoCapitalize="none"
            keyboardType="numeric"
            textContentType="oneTimeCode"
          />
          <Space />
          <ButtonLink
            title="Resend code?"
            onPress={_onResend}
            textStyle={{ alignSelf: "center" }}
          />
          <Space />
          {error !== "" && (
            <Txt h3 title={error as string} textStyle={{ color: "red" }} />
          )}
          <ButtonSubmit title="Confirm" />
        </AppForm>
      </AppContainer>
    </>
  );
}
