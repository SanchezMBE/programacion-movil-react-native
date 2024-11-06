import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Alert } from "react-native";
import styled from "styled-components";
import { useRouter } from "expo-router";

const MainContainer = styled(View)`
  flex: 1;
  background-color: #F5FCFF;
  align-items: center;
  justify-content: start;
`

const ContentContainer = styled(View)`
  height: 100%;
  max-height: 400px;
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

const RegisterButton = styled(ButtonStyle)`
  border: 2px darkturquoise solid;
`

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  
  const router = useRouter()
  const onPressNavigation = () => {
    router.push({
      pathname: "/",
    });
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === '') return '▪️ Correo no ingresado';
    if (!emailRegex.test(email)) return '▪️ Correo inválido';
    return '';
  };

  const validateName = (name: string) => {
    if (name === '') return '▪️ Nombre no ingresado';
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

  const validateConfirmation = (password: string, confirmation: string) => {
    if (confirmation === '') return '▪️ Contraseña de confirmación no ingresada';
    if (password !== confirmation) return '▪️ Contraseñas no coinciden';
    return '';
  };

  const onPressRegister = () => {
    const emailError = validateEmail(email);
    const nameError = validateName(name);
    const passwordError = validatePassword(password);
    const confirmationError = validateConfirmation(password, confirmation);

    const validationMessages = [emailError, nameError, passwordError, confirmationError].filter(msg => msg !== '');

    if (validationMessages.length > 0) {
      Alert.alert('Register', validationMessages.join('\n'));
    } else {
      Alert.alert('Register', '▪️ Campos validados correctamente ✅', [
        {text: 'OK', onPress: () => onPressNavigation()},
      ]);
    }
  };

  const onChangeEmailInput = (value: string) => setEmail(value);
  const onChangeNameInput = (value: string) => setName(value);
  const onChangePasswordInput = (value: string) => setPassword(value);
  const onChangeConfirmationInput = (value: string) => setConfirmation(value);

  return (
    <MainContainer>
      <ContentContainer>
        <Input
          placeholder="Ingresa tu correo electrónico" 
          onChangeText={onChangeEmailInput}
        />
        <Input
          placeholder="Ingresa tu nombre de usuario" 
          onChangeText={onChangeNameInput}
        />
        <Input
          placeholder="Ingresa tu contraseña"
          onChangeText={onChangePasswordInput}
          secureTextEntry={true}
        />
        <Input
          placeholder="Ingresa otra vez tu contraseña"
          onChangeText={onChangeConfirmationInput}
          secureTextEntry={true}
        />
        <RegisterButton onPress={onPressRegister} accessibilityLabel="Botón de registro">
          <Text>Regístrate</Text>
        </RegisterButton>
      </ContentContainer>
    </MainContainer>
  );
}
