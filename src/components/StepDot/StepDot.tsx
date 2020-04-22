import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { transparentize } from 'polished';

interface StepDotInterface {
  lastDotWithoutBar?: boolean;
  color?: string;
}

interface StepInterface extends StepDotInterface {
  total: number;
  colorCurrentStep?: string;
  currentStep: number;
}

const StepDot: React.FunctionComponent<StepInterface> = ({
  total,
  currentStep,
  lastDotWithoutBar,
  colorCurrentStep,
  color,
}) => {
  const steps = new Array(total).fill(null);

  return (
    <StepsInfo>
      {steps.map((_, k: number) => {
        const showBar: boolean = lastDotWithoutBar === true && k === total - 1;
        const colorDot: boolean = k <= currentStep;
        const colorBar: boolean = k < currentStep;
        return (
          <DotContainer key={k}>
            <DotStyle color={colorDot ? colorCurrentStep : color} />
            {!showBar && (
              <BarStyle color={colorBar ? colorCurrentStep : color} />
            )}
          </DotContainer>
        );
      })}
    </StepsInfo>
  );
};

StepDot.defaultProps = {
  lastDotWithoutBar: false,
  colorCurrentStep: '#fff',
  total: 0,
};

export default StepDot;

const StepsInfo = styled(View)`
  position: absolute;
  flex-direction: row;
  top: 8%;
`;

const DotStyle = styled(View)<{ color?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ color }) => color || transparentize(0.5, '#fff')};
`;

const BarStyle = styled(View)<{ color?: string }>`
  width: 70px;
  height: 3px;
  background-color: ${({ color }) => color || transparentize(0.5, '#fff')};
`;

const DotContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;
