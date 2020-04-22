import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { BaseText } from '../Text/Text';

interface LoadingInterface {
  message?: string;
}

const Loading: React.FunctionComponent<LoadingInterface> = ({ message }) => {
  return (
    <Container>
      <ActivityIndicator />
      {message && (
        <View>
          <Text>{message}</Text>
        </View>
      )}
    </Container>
  );
};

export default Loading;

const Container = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const Text = styled(BaseText)`
  font-size: ${({ theme }) => theme.fontsSize.sm};
`;
