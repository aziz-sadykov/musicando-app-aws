import React from 'react';
import { BaseText } from '~/components/Text/Text';
import styled from 'styled-components';
import { transparentize, darken } from 'polished';

interface Props {
  color?: string;
}

const Tag: React.FunctionComponent<Props> = ({ children, color }) => {
  return <Text color={color}>#{children}</Text>;
};

export default Tag;

const Text = styled(BaseText)<{ color?: string }>`
  flex: 1 1 auto;
  font-size: ${({ theme }) => theme.fontsSize.sm};
  font-weight: 700;
  margin: 2px;
  background-color: ${({ color }) =>
    color ? darken(0.035, color) : transparentize(0.5, '#000')};
  padding: 1px 2px;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  justify-content: center;
`;
