import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Index from '../../app/index';
import { Alert } from 'react-native';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Index', () => {
  it('renders correctly', () => {
    render(<Index />);
    expect(screen.getByPlaceholderText('Ingresa tu correo electrónico')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
    expect(screen.getByText('Regístrate')).toBeTruthy();
    expect(screen.getByTestId('image1')).toBeTruthy();
  });

  describe('Navigation', () => {
    it('navigates to the register screen on "Regístrate" button press', () => {
      render(<Index />);
      const registerButton = screen.getByText('Regístrate');
      
      // Simula el clic en el botón "Regístrate"
      fireEvent.press(registerButton);
      
      // Verifica que `push` fue llamado con la ruta correcta
      expect(mockPush).toHaveBeenCalledWith({
        pathname: './register',
      });
    });
  });

  describe('validates email', () => {
    it('empty email', () => {
      render(<Index />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const button = screen.getByText('Iniciar sesión');
      fireEvent.changeText(emailInput, '');
      fireEvent.changeText(passwordInput, 'Password!');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login',
        '▪️ Correo no ingresado'
      );
    });
    it('invalid email', () => {
      render(<Index />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const button = screen.getByText('Iniciar sesión');
      fireEvent.changeText(emailInput, 'user@test');
      fireEvent.changeText(passwordInput, 'Password!');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login',
        '▪️ Correo inválido'
      );
    });
  });

  describe('validates password', () => {
    it('empty password', () => {
      render(<Index />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const button = screen.getByText('Iniciar sesión');
      fireEvent.changeText(emailInput, 'user@test.com');
      fireEvent.changeText(passwordInput, '');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login',
        '▪️ Contraseña no ingresada'
      );
    });

    it('invalid password', () => {
      render(<Index />);
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const button = screen.getByText('Iniciar sesión');
      fireEvent.changeText(emailInput, 'user@test.com');
      fireEvent.changeText(passwordInput, 'pw');
      fireEvent.press(button);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login',
        `▪️ La contraseña debe tener al menos 8 caracteres\n▪️ La contraseña debe incluir al menos una mayúscula\n▪️ La contraseña debe incluir al menos un carácter especial`
      );
    });
  });

  it('submits the form', () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo electrónico');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const button = screen.getByText('Iniciar sesión');
    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, 'Password!');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Login',
      '▪️ Campos validados correctamente ✅'
    );
  });
});
