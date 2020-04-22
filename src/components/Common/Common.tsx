import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground as BaseImageBackground,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/EvilIcons';
import { BaseText } from '../Text/Text';

interface ActionInterface extends TouchableOpacityProps {}

const CustomTouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const Divider = styled(View)<{
  marginBottom?: string | number;
  marginTop?: string | number;
  color?: string;
}>`
  width: 100%;
  height: 2px;
  background-color: ${({ color }) => color || '#fff'};
  margin-top: ${({ marginTop }) => marginTop || 0};
  margin-bottom: ${({ marginBottom }) => marginBottom || 0};
`;

export const BaseView = styled(View)`
  flex: 1;
  padding: 10px 10px 0;
`;

export const Close: React.FunctionComponent<ActionInterface> = ({
  ...props
}) => (
  <CustomTouchableOpacity {...props}>
    <Icon name="close" size={30} color="#fff" />
  </CustomTouchableOpacity>
);

export const ContainerCenterSB = styled(BaseView)`
  flex: 1;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

export const TitleCenter = styled(BaseText)`
  margin-top: 25%;
  color: #fff;
  letter-spacing: 7px;
  font-size: ${({ theme }) => theme.fontsSize.xl};
  font-weight: 700;
  text-transform: uppercase;
`;

export const ToBack: React.FunctionComponent<ActionInterface> = ({
  ...props
}) => (
  <CustomToBackTouchableOpacity {...props}>
    <Icon name="arrow-left" size={30} color="#fff" />
  </CustomToBackTouchableOpacity>
);

const CustomToBackTouchableOpacity = styled(CustomTouchableOpacity)`
  left: 10px;
  right: auto;
`;

export const TextError = styled(BaseText)`
  color: #c0392b;
  font-size: ${({ theme }) => theme.fontsSize.sm};
  font-weight: 700;
  margin-top: 2px;
  margin-left: 15px;
`;

export const ImageBackground = styled(({ children, ...props }) => (
  <BaseImageBackground {...props}>{children}</BaseImageBackground>
))`
  flex: 1;
  width: 100%;
`;
