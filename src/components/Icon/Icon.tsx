import React from 'react';
import styled from 'styled-components';
import { default as BaseIcon } from 'react-native-vector-icons/SimpleLineIcons';

const Icon = styled(
  ({
    name,
    size,
    color,
    ...props
  }: {
    name: string;
    size?: number;
    color?: string;
  }) => (
    <BaseIcon
      {...props}
      name={name}
      size={size || 18}
      color={color || '#fff'}
    />
  ),
)`
  margin-left: 15px;
`;

export default Icon;
