import React from 'react';
import { View, SafeAreaView, ImageBackground } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { Divider } from '~/components/Common/Common';
import { BaseText } from '~/components/Text/Text';
import Tag from '~/components/Tag/Tag';
import { month, addLeftZero, color } from '~/utils/helpers';
import { lighten } from 'polished';
import { Theme } from '~/../providers/Theme/styled';

type EventLevel = 'low' | 'medium';

export interface Event {
  uuid: string;
  title: string;
  valueRef: number;
  date: string;
  tags: string[];
}

interface CardEventProps extends Event {
  eventLevel?: EventLevel;
  isNew?: boolean;
  theme: Theme;
}

const CardEvent: React.FunctionComponent<CardEventProps> = ({
  title,
  date,
  valueRef,
  tags,
  isNew,
  eventLevel,
  theme,
}) => {
  const dateEvent: Date = new Date(date);
  const formatDate = `${addLeftZero(dateEvent.getDate())} ${month(
    dateEvent.getMonth(),
  )} ${dateEvent.getFullYear()}`;
  const formatHours = `${addLeftZero(dateEvent.getHours())}:${addLeftZero(
    dateEvent.getMinutes(),
  )}`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {isNew && (
          <NewEventContainer>
            <NewEventText>New</NewEventText>
          </NewEventContainer>
        )}
        <OverFlow eventLevel={eventLevel}>
          <CustomImageBackground
            source={require('../../assets/images/backgrounds/cardMusician.jpg')}>
            <View>
              <Text>{title}</Text>
              <Divider marginBottom={'5px'} />
              <Infos>
                <P>{`${formatDate} | ${formatHours}`}</P>
                <ValueRef>{`R$ ${valueRef}`}</ValueRef>
              </Infos>
            </View>
          </CustomImageBackground>
        </OverFlow>
        <TagsContainer>
          {tags.map((tag: string, k: number) => (
            <Tag key={k}>{tag}</Tag>
          ))}
        </TagsContainer>
        <Divider
          marginTop="15px"
          marginBottom="20px"
          color={theme.colors.support}
        />
      </Container>
    </SafeAreaView>
  );
};

export default withTheme(CardEvent);

const Container = styled(View)`
  position: relative;
  flex: 1;
  height: 300px;
  margin-bottom: 15px;
`;

const OverFlow = styled(View)<{ eventLevel?: EventLevel }>`
  flex: 1;
  overflow: hidden;
  border-radius: 5px;
  border-right-width: 6px;
  border-right-color: ${({ eventLevel }) =>
    eventLevel === 'medium'
      ? lighten(0.2, '#CC2936')
      : lighten(0.2, '#32936F')};
`;

const CustomImageBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
`;

const Text = styled(BaseText)`
  font-size: ${({ theme }) => theme.fontsSize.xl};
  color: ${({ theme }) => theme.colors.light};
`;

const P = styled(Text)`
  font-size: ${({ theme }) => theme.fontsSize.md};
`;

const Infos = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TagsContainer = styled(View)`
  max-width: 85%;
  margin: auto;
  margin-top: 10px;
  align-self: flex-end;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ValueRef = styled(BaseText)`
  font-size: ${({ theme }) => theme.fontsSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 2px 15px;
  border-radius: 3px;
`;

const NewEventContainer = styled(View)`
  position: absolute;
  top: -7px;
  left: 10px;
  background-color: #32936f;
  padding: 2px 10px;
  border-radius: 3px;
  z-index: 2;
`;
const NewEventText = styled(BaseText)`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontsSize.sm};
`;
