import React from 'react';
import styled from 'styled-components';
import {
  TextInput,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import { transparentize } from 'polished';
import { TextInputMask as BaseTextInputMask } from 'react-native-masked-text';
import { TextError } from '../Common/Common';
import {
  BaseInputsContainer,
  BaseInputsContainerStyle,
  BaseTextInputStyle,
  InputProps,
} from './Common';
import Icon from '../Icon/Icon';

export const Input: React.FunctionComponent<InputProps> = ({
  children,
  errorIsInvalid,
  errorMessage,
  iconName,
  iconColor,
  iconSize,
  ...props
}) => (
  <>
    <BaseInputsContainer errorIsInvalid={errorIsInvalid}>
      {iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
      {!children && (
        <BaseTextInput
          placeholderTextColor={transparentize(0.3, '#fff')}
          {...props}
        />
      )}
      {children && children}
    </BaseInputsContainer>
    {errorIsInvalid && <TextError>{errorMessage}</TextError>}
  </>
);

const BaseTextInput = styled(TextInput)`
  ${BaseTextInputStyle};
  font-size: ${({ theme }) => theme.fontsSize.md};
`;

interface ButtonProps extends TouchableOpacityProps {}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  ...props
}) => (
  <CustomButton {...props}>
    <BaseTextButton>{children}</BaseTextButton>
  </CustomButton>
);

const CustomButton = styled(TouchableOpacity)`
  ${BaseInputsContainerStyle};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const BaseTextButton = styled(Text)`
  color: #fff;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontsSize.lg};
`;

export const TextInputMask = styled(({ children, ...props }) => (
  <BaseTextInputMask
    {...props}
    placeholderTextColor={transparentize(0.3, '#fff')}>
    {children}
  </BaseTextInputMask>
))`
  ${BaseTextInputStyle};
  font-size: ${({ theme }) => theme.fontsSize.md};
`;
