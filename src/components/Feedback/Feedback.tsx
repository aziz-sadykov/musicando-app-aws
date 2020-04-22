import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { BaseText } from '../Text/Text';

interface FeedbackProps {
  title: string;
  message?: string;
}

const Feedback: React.FunctionComponent<FeedbackProps> = ({
  title,
  message,
}) => {
  return (
    <ErrorContainer>
      <ErrorTitle>{title}</ErrorTitle>
      {message !== '' && <ErrorText>{message}</ErrorText>}
    </ErrorContainer>
  );
};

export default Feedback;

const ErrorContainer = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ErrorTitle = styled(BaseText)`
  font-size: ${({ theme }) => theme.fontsSize.lg};
`;

const ErrorText = styled(BaseText)`
  font-size: ${({ theme }) => theme.fontsSize.md};
`;
