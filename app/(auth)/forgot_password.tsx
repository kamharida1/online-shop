import { Auth } from "aws-amplify";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ReactElement, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import { AppContainer } from "../../components/AppContainer";
import { Input } from "../../components/Input";
import { Space } from "../../components/Space";
import { Button } from "../../components/Button";
import { goBack } from "../../constants";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const navigation = useNavigation();

  const { email } = useLocalSearchParams();

  const _onPress = async (values: { email: string }): Promise<void> => {
    setLoading(true);
    try {
      const { email } = values;
      const user = await Auth.forgotPassword(email);
      user &&
        router.push({
          pathname: "/(auth)/forgot_pass_submit",
          params: { email },
        });
      setLoading(false);
    } catch (err) {
      setError(error);
    }
  };

  return (
    <>
      <AppContainer
        title="Forgot"
        onPress={goBack(navigation)}
        loading={loading}
        //message={error}
      >
        <Formik
          initialValues={{ email: email as string || "" }}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
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
              <Space height={30} />
              <Button title="Confirm" onPress={handleSubmit} />
              <Space height={100} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  );
}