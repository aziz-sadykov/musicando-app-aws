import React, { useState } from 'react';
import { transparentize } from 'polished';
import styled from 'styled-components';
import { TextInput } from 'react-native-gesture-handler';
import { BaseTextInputStyle, InputProps, BaseInputsContainer } from './Common';
import { TextError } from '../Common/Common';

interface TextArea extends InputProps {}

export const TextArea: React.FunctionComponent<InputProps> = ({
  children,
  onContentSizeChange,
  errorMessage,
  errorIsInvalid,
  ...props
}) => {
  const [height, setHeight] = useState<number>(50);

  return (
    <>
      <CustomBaseInputsContainer
        height={height}
        errorIsInvalid={errorIsInvalid}>
        {!children && (
          <BaseTextInput
            multiline={true}
            onContentSizeChange={(e) => {
              const height = e.nativeEvent.contentSize.height;
              setHeight(height);
              if (onContentSizeChange) onContentSizeChange(e);
            }}
            placeholderTextColor={transparentize(0.3, '#fff')}
            {...props}
          />
        )}
        {children && children}
      </CustomBaseInputsContainer>
      {errorIsInvalid && <TextError>{errorMessage}</TextError>}
    </>
  );
};

export default TextArea;

const CustomBaseInputsContainer = styled(({ height: number, ...props }) => (
  <BaseInputsContainer {...props} />
))`
  height: ${({ height }) => Math.max(50, height)}px;
  align-items: flex-start;
`;

const BaseTextInput = styled(TextInput)`
  ${BaseTextInputStyle};
  justify-content: flex-start;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fontsSize.md};
`;
