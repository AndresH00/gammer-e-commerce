import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { loginApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { formStyles } from "../../styles";

export default function LoginForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await loginApi(formData);
        if (response.statusCode) throw "Invalid username or password";
        console.log(response);
        login(response);
      } catch (error) {
        setLoading(false);
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Email or Username"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("identifier", text)}
        value={formik.values.identifier}
        error={formik.errors.identifier}
      />
      <TextInput
        label="Password"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={formStyles.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Login
      </Button>
      <Button
        mode="text"
        style={formStyles.btnText}
        labelStyle={formStyles.btnTextLabel}
        onPress={changeForm}
      >
        Register
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
