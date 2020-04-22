import React from 'react';
import styled from 'styled-components';
import { ContainerModal } from './BaseModal';
import { Text } from 'react-native';

interface EventModalInterface {}

const EventModal: React.FunctionComponent<EventModalInterface> = () => {
  return (
    <ContainerModal>
      <Text>Filtros do evento aqui</Text>
    </ContainerModal>
  );
};

export default EventModal;
