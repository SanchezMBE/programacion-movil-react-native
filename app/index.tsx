import React, { useState } from "react";
import styled from "styled-components";
import { Text, View, TextInput, Image, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getMusicData } from "./api-client";

const MainContainer = styled(View)`
  flex: 1;
  background-color: #F5FCFF;
  align-items: center;
  justify-content: start;
`

const ContentContainer = styled(View)`
  height: 100%;
  max-height: 550px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`

const Input = styled(TextInput)`
  width: 300px;
  height: 40px;
  border: 2px orange solid;
  border-radius: 4px;
  padding: 0 10px;
`

const ButtonStyle = styled(Pressable)`
  width: 150px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 2px gray solid;
  border-radius: 4px;
  padding: 0 10px;
`

const LoginButton = styled(ButtonStyle)`
  border: 2px darkturquoise solid;
`

const RegisterButton = styled(ButtonStyle)`
  border: 2px purple solid;
`

export default function Index() {
  getMusicData().then(data => console.warn(data))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const onPressRegister = () => {
    router.push({
      pathname: "./register",
    })
  }
  const onPressHome = () => {
    router.push({
      pathname: "./home",
    })
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === '') return '▪️ Correo no ingresado';
    if (!emailRegex.test(email)) return '▪️ Correo inválido';
    return '';
  };

  const validatePassword = (password: string) => {
    const minimumCharactersRegex = /.{8,}/;
    const capperCaseCharacterRegex = /[A-Z]/;
    const specialCharactersRegex = /[\W]/;
    
    let validationMessages = [];
    if (password === '') {
      validationMessages.push('▪️ Contraseña no ingresada');
    } else {
      if (!minimumCharactersRegex.test(password)) {
        validationMessages.push('▪️ La contraseña debe tener al menos 8 caracteres');
      }
      if (!capperCaseCharacterRegex.test(password)) {
        validationMessages.push('▪️ La contraseña debe incluir al menos una mayúscula');
      }
      if (!specialCharactersRegex.test(password)) {
        validationMessages.push('▪️ La contraseña debe incluir al menos un carácter especial');
      }
    }
    return validationMessages.join('\n');
  };

  const onPressLogin = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const validationMessages = [emailError, passwordError].filter(msg => msg !== '');

    if (validationMessages.length > 0) {
      Alert.alert('Login', validationMessages.join('\n'));
    } else {
      Alert.alert('Login', '▪️ Campos validados correctamente ✅');
    }
  };

  const onChangeEmailInput = (value: string) => setEmail(value);
  const onChangePasswordInput = (value: string) => setPassword(value);

  return (
    <MainContainer>
      <ContentContainer>
        <Image source={require('../assets/images/image1.jpg')} testID="image1"/>
        <Input
          placeholder="Ingresa tu correo electrónico" 
          onChangeText={onChangeEmailInput}
        />
        <Input
          placeholder="Ingresa tu contraseña"
          onChangeText={onChangePasswordInput}
          secureTextEntry={true}
        />
        <LoginButton onPress={onPressLogin} accessibilityLabel="Botón de inicio de sesión">
          <Text>Iniciar sesión</Text>
        </LoginButton>
      </ContentContainer>
      <RegisterButton onPress={onPressRegister} accessibilityLabel="Botón de registro">
        <Text>Regístrate</Text>
      </RegisterButton>
      <RegisterButton onPress={onPressHome} accessibilityLabel="Botón de registro">
        <Text>Home</Text>
      </RegisterButton>
    </MainContainer>
  );
}