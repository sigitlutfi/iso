import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  Center,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Divider,
  FlatList,
  FormControl,
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
import {Dimensions, TouchableOpacity} from 'react-native';
import AuthContext from '../../AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Get, Post} from '../common/Req';
import {LoadMoreFlatlist} from 'react-native-load-more-flatlist';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import {LineChart} from 'react-native-chart-kit';
import Header from '../common/Header';
import DatePicker from 'react-native-date-picker';

export default function Asetkecamatan({route, navigation}) {
  const {conf, user, tit} = route.params;
  const {signOut} = React.useContext(AuthContext);

  const [a, setA] = useState(false);
  const [s, setS] = useState(null);
  const [mkot, setMkot] = useState(false);
  const [act, setAct] = useState(true);

  const [dkec, setDkec] = useState([
    {id: 1, urai: 'Lhoksumawe'},
    {id: 2, urai: 'Denil'},
    {id: 3, urai: 'Huripang'},
  ]);

  const [dkot, setDkot] = useState([
    {id: 1, urai: 'Kot1'},
    {id: 2, urai: 'KOt2'},
    {id: 3, urai: 'Kot3'},
  ]);

  const [kec, setKec] = useState({id: 0, urai: 'Kecamatan'});
  const [kecs, setKecs] = useState(null);
  const [kot, setKot] = useState({id: 0, urai: 'Kab./Kota'});
  const [t, setT] = useState(new Date().getFullYear());

  const [data, setData] = useState([
    {
      id: '#12313',
      list: [
        {
          key: 'Nama',
          value: 'asfafs',
        },
        {
          key: 'Jumlah',
          value: '123',
        },
      ],
      foto: [{}, {}, {}],
    },
    {
      id: '#12314',
      list: [
        {
          key: 'Nama',
          value: 'asfafs',
        },
        {
          key: 'Jumlah',
          value: '123',
        },
      ],
      foto: [],
    },
    {
      id: '#12315',
      list: [
        {
          key: 'Nama',
          value: 'asfafs',
        },
        {
          key: 'Jumlah',
          value: '123',
        },
      ],
      foto: [{}, {}],
    },
  ]);

  const w = Dimensions.get('screen').width;
  console.log(s);
  return (
    <NativeBaseProvider>
      <Actionsheet isOpen={a} onClose={() => setA(false)}>
        <Actionsheet.Content alignItems={'flex-start'}>
          {s !== null ? (
            <Box>
              <Heading>{s.id}</Heading>
              <Divider my={2} />
              <Stack space={2}>
                {s.list.map((v, i) => (
                  <Stack key={i}>
                    <Text bold>{v.key} :</Text>
                    <Text>{v.value}</Text>
                  </Stack>
                ))}
                {s.foto.length !== 0 ? (
                  <Stack>
                    <Text bold mb={2}>
                      Foto :
                    </Text>
                    <Box>
                      <ScrollView horizontal>
                        {s.foto.map((v, i) => (
                          <Image
                            key={i}
                            source={{uri: 'https://placehold.co/400x400/png'}}
                            h={180}
                            mr={4}
                            w={180}
                            borderRadius={'2xl'}
                            alt=""
                          />
                        ))}
                      </ScrollView>
                    </Box>
                  </Stack>
                ) : null}
              </Stack>
            </Box>
          ) : null}
        </Actionsheet.Content>
      </Actionsheet>
      <Header tit={tit} nv={navigation} conf={conf} />
      <Text
        position={'absolute'}
        right={4}
        top={5}
        color={'white'}
        onPress={() => navigation.navigate('Tambahasetkecamatan')}>
        Tambah Data
      </Text>
      <Box bg={'gray.100'} flex={1}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <Pressable
              key={index}
              onPress={() => {
                setA(true);
                setS(item);
              }}
              bg={'white'}
              mx={4}
              my={2}
              p={4}
              borderRadius={'2xl'}>
              <Heading>{item.id}</Heading>
              <Divider my={2} />
              <Stack space={2}>
                {item.list.slice(0, 2).map((v, i) => (
                  <Stack key={i}>
                    <Text bold>{v.key} :</Text>
                    <Text>{v.value}</Text>
                  </Stack>
                ))}
                {item.foto.length !== 0 ? (
                  <Stack>
                    <Text bold mb={2}>
                      Foto :
                    </Text>
                    <ScrollView horizontal>
                      {item.foto.map((v, i) => (
                        <Image
                          key={i}
                          source={{uri: 'https://placehold.co/400x400/png'}}
                          h={16}
                          mr={4}
                          w={16}
                          borderRadius={100}
                          alt=""
                        />
                      ))}
                    </ScrollView>
                  </Stack>
                ) : null}
              </Stack>
            </Pressable>
          )}
        />
      </Box>
    </NativeBaseProvider>
  );
}
