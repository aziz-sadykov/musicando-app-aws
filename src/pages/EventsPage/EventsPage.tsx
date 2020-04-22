import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import CardEvent, { Event } from '~/components/CardEvent/CardEvent';
import Loading from '~/components/Loading/Loading';
import { isLoadingInterface } from '~/Types/Loading';
import { PageNavProps } from '~/Types/PageList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '~/../providers/Theme/styled';
import { TextInput } from 'react-native-gesture-handler';
import { debounce } from 'lodash';
import { stringify } from 'query-string';
import api from '~/utils/http';

interface EventsPageProps extends PageNavProps<'EventsPage'> {
  theme: Theme;
}

const EventsPage: React.FunctionComponent<EventsPageProps> = ({
  theme,
  navigation,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<isLoadingInterface>({
    isLoading: true,
    status: 'waiting',
  });

  useEffect(() => {
    if (hasMore === false && page !== 1) return;

    let cancelEffect = false;
    let queryS = { page };
    if (search) queryS = { ...queryS, ...{ title: search } };

    const qs = stringify(queryS);

    api
      .get(`events/search?${qs}`)
      .then((response) => {
        const events = response?.data?.data?.data || [];
        const hasMoreEvents: boolean = response?.data?.data?.hasMore || false;

        console.log(events);
        console.log(hasMoreEvents);

        if (page !== 1) {
          setEvents((prev) => [...prev, ...events]);
        } else {
          setEvents(events);
        }

        setIsLoading({ isLoading: false, status: 'received' });
        if (hasMore !== hasMoreEvents) setHasMore(hasMoreEvents);
      })
      .catch((e) => {
        console.log(e?.response);
        if (!cancelEffect) setIsLoading({ isLoading: false, status: 'failed' });
      });

    return () => {
      cancelEffect = true;
    };
  }, [page, search, hasMore]);

  if (isLoading.isLoading && isLoading.status === 'waiting')
    return <Loading message="Buscando eventos..." />;

  const RenderEvent = ({ item }: { item: Event }) => (
    <CardEvent key={item.uuid} {...item} />
  );

  const updateSearch = debounce((text: string) => {
    setPage(1);
    setSearch(text);
  }, 200);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Container>
        <FilterContainer>
          <SearchBar
            placeholder="Procurar eventos"
            onChangeText={(text) => updateSearch(text)}
          />
          <CustomButton
            onPress={() =>
              navigation.navigate('Modal', { screen: 'ModalEvent' })
            }>
            <FontAwesomeIcon
              icon={faFilter}
              size={25}
              color={theme.colors.primary}
            />
          </CustomButton>
        </FilterContainer>
        <FlatList
          data={events}
          renderItem={RenderEvent}
          keyExtractor={(event: Event) => event.uuid}
          onEndReached={() => hasMore && setPage((prev) => prev + 1)}
          contentContainerStyle={{
            padding: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default withTheme(EventsPage);

const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  position: relative;
  padding-top: 60px;
`;

const FilterContainer = styled(View)`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 10px 0;
  align-items: flex-end;
`;

const CustomButton = styled(TouchableOpacity)`
  align-self: center;
  margin-left: 10px;
`;

const SearchBar = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.support};
  border: 1px solid ${({ theme }) => theme.colors.support};
  border-radius: 5px;
  height: 40px;
  padding: 0 15px;
`;
