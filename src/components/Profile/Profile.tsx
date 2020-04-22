import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

interface ProfileProps {
  onPress?(): void;
  source: string;
}

const Profile: React.FunctionComponent<ProfileProps> = ({
  source,
  onPress,
}) => {
  return (
    <Container
      style={{ width: 130, height: 130 }}
      onPress={() => {
        if (onPress) onPress();
      }}>
      {source === '' && <CustomIcon name="picture" size={22} />}
      {source !== '' && <CustomImage source={{ uri: source }} />}
    </Container>
  );
};

export default Profile;

const Container = styled(TouchableOpacity)`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  margin-bottom: 25px;
`;

const CustomImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CustomIcon = styled(Icon)`
  margin: 0;
`;
