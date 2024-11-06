import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Register from '../../app/register';
import { Alert } from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks(); // Alert.alert.mockClear();
});


describe('Register', () => {
  it('renders conrrectly', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText('Ingresa tu correo electrónico')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu nombre de usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa otra vez tu contraseña')).toBeTruthy();
    expect(screen.getByText('Regístrate')).toBeTruthy();
  })

  describe('validates email', () => {
    it('empty email', () => {
      render(<Register />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const nameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const confirmationInput = screen.getByPlaceholderText('Ingresa otra vez tu contraseña');
      const button = screen.getByText('Regístrate');
      fireEvent.changeText(emailInput, '');
      fireEvent.changeText(nameInput, 'user');
      fireEvent.changeText(passwordInput, 'Password!');
      fireEvent.changeText(confirmationInput, 'Password!');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Register',
        '▪️ Correo no ingresado'
      );
    })
    it('invalid email', () => {
      render(<Register />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const nameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const confirmationInput = screen.getByPlaceholderText('Ingresa otra vez tu contraseña');
      const button = screen.getByText('Regístrate');
      fireEvent.changeText(emailInput, 'user@test');
      fireEvent.changeText(nameInput, 'user');
      fireEvent.changeText(passwordInput, 'Password!');
      fireEvent.changeText(confirmationInput, 'Password!');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Register',
        '▪️ Correo inválido'
      );
    })
  })

  describe('validates name', () => {
    it('empty email', () => {
      render(<Register />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const nameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const confirmationInput = screen.getByPlaceholderText('Ingresa otra vez tu contraseña');
      const button = screen.getByText('Regístrate');
      fireEvent.changeText(emailInput, 'user@test.com');
      fireEvent.changeText(nameInput, '');
      fireEvent.changeText(passwordInput, 'Password!');
      fireEvent.changeText(confirmationInput, 'Password!');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Register',
        '▪️ Nombre no ingresado'
      );
    })
  })
    
  describe('validates password', () => {
    it('empty passwords', () => {
      render(<Register />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const nameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const confirmationInput = screen.getByPlaceholderText('Ingresa otra vez tu contraseña');
      const button = screen.getByText('Regístrate');
      fireEvent.changeText(emailInput, 'user@test.com');
      fireEvent.changeText(nameInput, 'user');
      fireEvent.changeText(passwordInput, '');
      fireEvent.changeText(confirmationInput, '');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Register',
        '▪️ Contraseña no ingresada\n▪️ Contraseña de confirmación no ingresada'
      );
    })
    
    it('invalid passwords', () => {
      render(<Register />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const nameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const confirmationInput = screen.getByPlaceholderText('Ingresa otra vez tu contraseña');
      const button = screen.getByText('Regístrate');
      fireEvent.changeText(emailInput, 'user@test.com');
      fireEvent.changeText(nameInput, 'user');
      fireEvent.changeText(passwordInput, 'pw');
      fireEvent.changeText(confirmationInput, 'pw');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Register',
        `▪️ La contraseña debe tener al menos 8 caracteres\n▪️ La contraseña debe incluir al menos una mayúscula\n▪️ La contraseña debe incluir al menos un carácter especial`
      );
    })

    it('different passwords', () => {
      render(<Register />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const nameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const confirmationInput = screen.getByPlaceholderText('Ingresa otra vez tu contraseña');
      const button = screen.getByText('Regístrate');
      fireEvent.changeText(emailInput, 'user@test.com');
      fireEvent.changeText(nameInput, 'user');
      fireEvent.changeText(passwordInput, 'Password!');
      fireEvent.changeText(confirmationInput, 'pw');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Register',
        '▪️ Contraseñas no coinciden'
      );
    })
  })

  it('submits the form', () => {
    render(<Register />);
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const confirmationInput = screen.getByPlaceholderText('Ingresa otra vez tu contraseña');
    const button = screen.getByText('Regístrate');
    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(nameInput, 'user');
    fireEvent.changeText(passwordInput, 'Password!');
    fireEvent.changeText(confirmationInput, 'Password!');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Register',
      '▪️ Campos validados correctamente ✅',
      [{ text: 'OK', onPress: expect.any(Function) }]
    );
  })
});