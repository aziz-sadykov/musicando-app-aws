import React from 'react';
import { Picker } from '@react-native-community/picker';
import styled from 'styled-components';
import { BaseInputsContainer, BaseTextInputStyle } from './Common';
import { IconInterface } from '~/Types/Common';
import Icon from '../Icon/Icon';

interface SelectProps extends IconInterface {
  onChange(value: string): void;
  value: string;
  title?: string;
}

const Select: React.FunctionComponent<SelectProps> = ({
  onChange,
  value,
  title,
  iconName,
  iconSize,
  iconColor,
  children,
}) => {
  return (
    <BaseInputsContainer>
      {iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
      <CustomPicker
        prompt={title}
        selectedValue={value}
        onValueChange={(e) => onChange(e)}>
        {children}
      </CustomPicker>
    </BaseInputsContainer>
  );
};

export default Select;

const CustomPicker = styled(Picker)`
  ${BaseTextInputStyle};
`;
