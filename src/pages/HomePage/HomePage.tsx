import React from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import { BaseText } from '~/components/Text/Text';
import { PageNavProps } from '~/Types/PageList';

interface HomePageProps extends PageNavProps<'HomePage'> {}

const HomePage: React.FunctionComponent<HomePageProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <CardType>
          <CustomButton onPress={() => navigation.navigate('EventsPage')}>
            <CustomImageBackground
              source={require('../../assets/images/backgrounds/cardMusician.jpg')}>
              <Text>Musician</Text>
              <Glass />
            </CustomImageBackground>
          </CustomButton>
        </CardType>

        <CardType>
          <CustomButton onPress={() => Alert.alert('hi')}>
            <CustomImageBackground
              source={require('~/assets/images/backgrounds/cardPromoter.jpg')}>
              <Text>Promoter</Text>
              <Glass />
            </CustomImageBackground>
          </CustomButton>
        </CardType>
      </Container>
    </SafeAreaView>
  );
};

export default HomePage;

const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  padding: 10px 20px 10px;
`;

const CardType = styled(View)`
  flex: 1;
  margin: 5px 0;
  border-radius: 15px;
  overflow: hidden;
  background-color: #333;
`;

const CustomImageBackground = styled(ImageBackground)`
  position: relative;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 5px;
`;

const CustomButton = styled(TouchableOpacity)`
  flex: 1;
`;

const Text = styled(BaseText)`
  font-size: ${({ theme }) => theme.fontsSize.xl};
  color: #fff;
  font-weight: 700;
  z-index: 1;
`;

const Glass = styled(View)`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 40px;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  background: rgba(0, 0, 0, 0.5);
`;
