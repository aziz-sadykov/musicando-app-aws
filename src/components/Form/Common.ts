import styled, { css } from 'styled-components';
import { View } from 'react-native';

export const BaseTextInputStyle = css`
  flex: 1;
  color: #fff;
  font-weight: 600;
  padding: 10px;
`;

export const BaseInputsContainerStyle = css`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const BaseInputsContainer = styled(View)<{ errorIsInvalid?: boolean }>`
  ${BaseInputsContainerStyle};
  ${({ errorIsInvalid }) =>
    errorIsInvalid &&
    css`
      border: 1px solid #c0392b;
    `}
`;
