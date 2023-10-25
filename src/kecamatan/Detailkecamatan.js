import {
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

export default function Detailkecamatan({route, navigation}) {
  const {conf, user} = route.params;
  const {signOut} = React.useContext(AuthContext);

  const [mkec, setMkec] = useState(false);
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
      t: '#12313',
      provinsi: 'ACEH',
      kab: 'ACEH BESAR',
      kec: 'MESJID RAYA',
      nama: 'Roy Van Lehreur',
      tipe: 'LOKPRI',
      act: true,
    },
    {
      t: '#12313',
      provinsi: 'ACEH',
      kab: 'ACEH BESAR',
      kec: 'MESJID RAYA',
      nama: 'Roy Van Lehreur',
      tipe: 'LOKPRI',
      act: true,
    },
    {
      t: '#12313',
      provinsi: 'ACEH',
      kab: 'ACEH BESAR',
      kec: 'MESJID RAYA',
      nama: 'Roy Van Lehreur',
      tipe: 'LOKPRI',
      act: false,
    },
  ]);

  const w = Dimensions.get('screen').width;
  console.log(dkec.filter(res => res.urai).map(ele => ele.kec));
  return (
    <NativeBaseProvider>
      <Header tit={'Detail Kecamatan'} nv={navigation} conf={conf} />

      <Box bg={'gray.100'} flex={1}>
        <ScrollView>
          <Box
            mx={4}
            my={4}
            bg={'white'}
            p={4}
            borderRadius={'2xl'}
            h={160}
            justifyContent={'space-between'}
            overflow={'hidden'}>
            <Image
              position={'absolute'}
              source={require('../../assets/cty.jpg')}
              alt=""
              flex={1}
              h={160}
              resizeMode="cover"
            />
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text color="white" bold>
                ACEH/KABUPATEN ACEH BESAR
              </Text>
              <Box
                bg={act ? 'green.500' : 'gray.500'}
                w={16}
                alignItems={'center'}
                py={1}
                borderRadius={'xl'}>
                <Text color="white" fontSize={10} bold>
                  {act ? 'Aktif' : 'Non Aktif'}
                </Text>
              </Box>
            </HStack>
            <Stack>
              <Text color="white">Kecamatan</Text>
              <Heading color="white">MESJID RAYA</Heading>
              <Heading color="white" size="xs">
                LOKPRI
              </Heading>
            </Stack>
          </Box>

          <HStack
            bg={'blue.500'}
            px={4}
            py={2}
            mx={4}
            mb={4}
            space={2}
            alignItems={'center'}
            borderRadius={'2xl'}>
            <Icon
              as={MaterialCommunityIcons}
              name="account-group"
              color="white"
              size={12}
            />
            <Stack>
              <Text color={'white'}>Total Penduduk</Text>
              <Heading color={'white'}>21.307</Heading>
            </Stack>
          </HStack>

          <HStack
            bg={'green.500'}
            px={4}
            py={2}
            mx={4}
            mb={4}
            space={2}
            alignItems={'center'}
            borderRadius={'2xl'}>
            <Icon
              as={MaterialCommunityIcons}
              name="card-account-details"
              color="white"
              size={12}
            />
            <Stack>
              <Text color={'white'}>Total KK</Text>
              <Heading color={'white'}>6.038</Heading>
            </Stack>
          </HStack>

          <HStack
            bg={'yellow.500'}
            px={4}
            py={2}
            mx={4}
            mb={4}
            space={2}
            alignItems={'center'}
            borderRadius={'2xl'}>
            <Icon
              as={MaterialCommunityIcons}
              name="human-male"
              color="white"
              size={12}
            />
            <Stack>
              <Text color={'white'}>Total Penduduk Laki-laki</Text>
              <Heading color={'white'}>10.750</Heading>
            </Stack>
          </HStack>

          <HStack
            bg={'red.500'}
            px={4}
            py={2}
            mx={4}
            mb={4}
            space={2}
            alignItems={'center'}
            borderRadius={'2xl'}>
            <Icon
              as={MaterialCommunityIcons}
              name="human-female"
              color="white"
              size={12}
            />
            <Stack>
              <Text color={'white'}>Total Penduduk Perempuan</Text>
              <Heading color={'white'}>10.397</Heading>
            </Stack>
          </HStack>

          <HStack mx={4} borderRadius={'2xl'} justifyContent={'space-between'}>
            <Pressable
              alignItems={'center'}
              onPress={() =>
                navigation.navigate('Asetkecamatan', {tit: 'Aset'})
              }>
              <Center bg={conf.color} px={3} py={3} borderRadius={'2xl'}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="clipboard-list"
                  color="white"
                  size={10}
                />
              </Center>
              <Text bold mt={1} fontSize={12}>
                Aset
              </Text>
            </Pressable>

            <Pressable
              alignItems={'center'}
              onPress={() =>
                navigation.navigate('Asetkecamatan', {tit: 'Mobilitas'})
              }>
              <Center bg={conf.color} px={3} py={3} borderRadius={'2xl'}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="car-hatchback"
                  color="white"
                  size={10}
                />
              </Center>
              <Text bold mt={1} fontSize={12}>
                Mobilitas
              </Text>
            </Pressable>

            <Pressable
              alignItems={'center'}
              onPress={() =>
                navigation.navigate('Asetkecamatan', {tit: 'Pegawai'})
              }>
              <Center bg={conf.color} px={3} py={3} borderRadius={'2xl'}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="shield-account"
                  color="white"
                  size={10}
                />
              </Center>
              <Text bold mt={1} fontSize={12}>
                Pegawai
              </Text>
            </Pressable>

            <Pressable
              alignItems={'center'}
              onPress={() =>
                navigation.navigate('Asetkecamatan', {tit: 'Penduduk'})
              }>
              <Center bg={conf.color} px={3} py={3} borderRadius={'2xl'}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="account"
                  color="white"
                  size={10}
                />
              </Center>
              <Text bold mt={1} fontSize={12}>
                Penduduk
              </Text>
            </Pressable>

            <Pressable
              alignItems={'center'}
              onPress={() =>
                navigation.navigate('Asetkecamatan', {tit: 'Wilayah'})
              }>
              <Center bg={conf.color} px={3} py={3} borderRadius={'2xl'}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="map-legend"
                  color="white"
                  size={10}
                />
              </Center>
              <Text bold mt={1} fontSize={12}>
                Wilayah
              </Text>
            </Pressable>
          </HStack>
          <Heading mx={4} mt={4} mb={2}>
            Camat
          </Heading>
          <HStack
            bg={'white'}
            borderRadius={'2xl'}
            mx={4}
            mb={4}
            p={4}
            alignItems={'center'}>
            <Image
              source={{uri: 'https://placehold.co/400x400/png'}}
              h={100}
              w={100}
              borderRadius={100}
              alt=""
            />
            <Stack space={2} ml={4}>
              <Stack>
                <Text bold>Nama Camat :</Text>
                <Text>Al Mubarak Akbar</Text>
              </Stack>
              <Stack>
                <Text bold>Jenis Kelamin :</Text>
                <Text>Laki-laki</Text>
              </Stack>
              <Stack>
                <Text bold>Pendidikan :</Text>
                <Text>Sarjana (S1)</Text>
              </Stack>
            </Stack>
          </HStack>

          <Heading mx={4} mt={4} mb={2}>
            Kantor
          </Heading>
          <Stack
            bg={'white'}
            borderRadius={'2xl'}
            mx={4}
            mb={4}
            p={4}
            space={2}>
            <Stack>
              <Text bold>Status :</Text>
              <Text>Tidak ada</Text>
            </Stack>
            <Stack>
              <Text bold>Kondisi :</Text>
              <Text>Rusak</Text>
            </Stack>
            <Stack>
              <Text bold>Alamat :</Text>
              <Text>Perum RSCM , KB , LORMEDIANO</Text>
            </Stack>
            <Stack>
              <Text bold>Kode Pos :</Text>
              <Text>10213</Text>
            </Stack>
          </Stack>

          <Heading mx={4} mt={4} mb={2}>
            Balai
          </Heading>
          <Stack
            bg={'white'}
            borderRadius={'2xl'}
            mx={4}
            mb={4}
            p={4}
            space={2}>
            <Stack>
              <Text bold>Status :</Text>
              <Text>Tidak ada</Text>
            </Stack>
            <Stack>
              <Text bold>Kondisi :</Text>
              <Text>Rusak</Text>
            </Stack>
            <Stack>
              <Text bold>Alamat :</Text>
              <Text>Perum RSCM , KB , LORMEDIANO</Text>
            </Stack>
            <Stack>
              <Text bold>Kode Pos :</Text>
              <Text>10213</Text>
            </Stack>
          </Stack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}
