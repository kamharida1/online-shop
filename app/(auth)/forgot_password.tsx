import { Auth } from "aws-amplify";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {  useState } from "react";
import * as Yup from "yup";
import { Field } from "formik";
import Cart from "../../assets/svgs/cart.svg";


import { AppContainer } from "../../components/AppContainer";
import { Space } from "../../components/Space";
import { Button } from "../../components/Button";
import { Txt } from "../../components/Txt";
import AppForm from "../../components/AppForm";
import { InputField } from "../../components/InputField";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import tw from "../../lib/tailwind";
import { View } from "moti";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const navigation = useNavigation();

  const { email } = useLocalSearchParams();

  return (
    <>
      <AppContainer style={tw`mt-12`}>
        <View style={tw`mx-3`}>
          <Cart width={100} height={100} style={{ alignSelf: "center" }} />
          <Txt textStyle={{alignSelf: 'center'}} title="Forgot Password" h1 />
          <Space />
          <AppForm
            initialValues={{ email: email || "" }}
            validationSchema={validationSchema}
            onSubmit={async (values: { email: string }): Promise<void> => {
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
                setLoading(false)
                setError(error);
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
            <Space height={10} />
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