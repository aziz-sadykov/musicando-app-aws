import React from 'react';
import { Route } from '~/Types/PageList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMusic } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native';
import styled from 'styled-components';

interface ConfigStackTag {
  route: Route;
}

const ConfigStackTag: React.FunctionComponent<ConfigStackTag> = ({ route }) => {
  return <></>;
};

export default ConfigStackTag;

const Container = styled(View)`
  flex: 1;
  width: 100%;
  padding: 0 10px 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;
