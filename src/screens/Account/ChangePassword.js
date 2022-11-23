import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { formStyles } from "../../styles";

export default function ChangePassword() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        await formik.setFieldValue("password", response.password);
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "Error when changing Password";
        navigation.goBack();
      } catch (error) {
        Toast.show(error, { position: Toast.positions.CENTER });
        setLoading(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="New Password"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />
      <TextInput
        label="Repeat New Password"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={formStyles.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Change password
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(4, true).required(true),
    repeatPassword: Yup.string()
      .min(4, true)
      .oneOf([Yup.ref("password")], true)
      .required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
