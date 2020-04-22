import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import {
  Close,
  ContainerCenterSB,
  ImageBackground,
  TitleCenter,
} from '~/components/Common/Common';
import { Button as BaseButton, Input } from '~/components/Form/Inputs';
import { BaseText } from '~/components/Text/Text';
import { PageNavProps } from '~/Types/PageList';

interface LoginPageProps extends PageNavProps<'LoginPage'> {}

const LoginPage: React.FunctionComponent<LoginPageProps> = ({ navigation }) => {
  return (
    <ImageBackground
      blurRadius={2}
      source={require('../../assets/images/backgrounds/loginPage.jpg')}>
      <ContainerCenterSB>
        <Close />
        <View>
          <TitleCenter>Musicando</TitleCenter>
        </View>
        <Full>
          <View>
            <View>
              <Input
                iconName="user"
                keyboardType="email-address"
                placeholder="Email"
              />
              <Input
                iconName="lock"
                secureTextEntry={true}
                placeholder="Password"
              />
            </View>
            <Button>Log in</Button>
          </View>
          <AccountContainer>
            <TouchableOpacity>
              <BaseText onPress={() => navigation.navigate('RegisterPage')}>
                Create Account
              </BaseText>
            </TouchableOpacity>
            <TouchableOpacity>
              <BaseText>Forgot your password?</BaseText>
            </TouchableOpacity>
          </AccountContainer>
        </Full>
      </ContainerCenterSB>
    </ImageBackground>
  );
};

export default LoginPage;

const Button = styled(BaseButton)`
  margin-top: 25px;
  margin-bottom: 45px;
`;

const AccountContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const Full = styled(View)`
  width: 100%;
`;
