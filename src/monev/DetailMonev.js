import {
  Avatar,
  Box,
  Button,
  Center,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import AuthContext from '../../AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Get, Post} from '../common/Req';
import {LoadMoreFlatlist} from 'react-native-load-more-flatlist';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import {LineChart} from 'react-native-chart-kit';
import Header from '../common/Header';

export default function DetailMonev({route, navigation}) {
  const {conf, user} = route.params;
  const {signOut} = React.useContext(AuthContext);

  const [mskpd, setMskpd] = useState(false);
  const [mkeluar, setMkeluar] = useState(false);

  const [djawaban, setDjawaban] = useState([
    {id: 1, urai: 'Sarana dan prasarana'},
    {id: 2, urai: 'Kondisi Aparatur'},
  ]);

  const w = Dimensions.get('screen').width;

  return (
    <NativeBaseProvider>
      <Header tit={'Detail Monev'} nv={navigation} conf={conf} />
      <Box bg={'gray.100'} flex={1}>
        <Box
          mx={4}
          mt={4}
          mb={4}
          px={4}
          py={1}
          borderRadius={'2xl'}
          bg={'white'}>
          <HStack justifyContent={'space-between'}>
            <Text>MESJID RAYA</Text>
            <Text bold>#131233</Text>
          </HStack>
          <Divider my={2} />
          <HStack>
            <Stack w={'50%'}>
              <Text bold>Provinsi</Text>
              <Text>ACEH</Text>
              <Text bold mt={2}>
                Nama
              </Text>
              <Text>ROY VAN LEHREUR</Text>
            </Stack>
            <Stack w={'50%'}>
              <Text bold>Kecamatan</Text>
              <Text>MASJID RAYA</Text>
              <Text bold mt={2}>
                Rata-rata
              </Text>
              <Text>33.33(CIQ)</Text>
            </Stack>
          </HStack>
        </Box>
        <Text ml={4} bold>
          Jawaban
        </Text>
        <FlatList
          data={djawaban}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => navigation.navigate('Jawaban', {data: item})}>
              <Box
                mx={4}
                mt={4}
                mb={4}
                px={4}
                py={2}
                borderRadius={'2xl'}
                bg={'white'}
                flexDir={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text>{item.urai}</Text>
                <Icon as={MaterialCommunityIcons} name="arrow-right" />
              </Box>
            </Pressable>
          )}
        />
      </Box>
    </NativeBaseProvider>
  );
}
