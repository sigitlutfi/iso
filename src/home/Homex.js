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
  Modal,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  Toast,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import AuthContext from '../../AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageSlider} from 'react-native-image-slider-banner';

import {Get, Post} from '../common/Req';
import {LoadMoreFlatlist} from 'react-native-load-more-flatlist';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export default function Homex({route, navigation}) {
  const {conf, user} = route.params;
  const {signOut} = React.useContext(AuthContext);
  const [img, setImg] = useState([
    {
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 1',
    },
    {
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: 'Slide 2',
    },
    {
      url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 3',
    },
  ]);
  const [utc, setUtc] = useState(null);
  const [dt, setDt] = useState(new Date().toLocaleString());

  // useEffect(() => {
  //   let secTimer = setInterval(() => {
  //     setDt(new Date().toLocaleString());
  //   }, 1000);

  //   return () => clearInterval(secTimer);
  // }, []);

  useEffect(() => {
    var localTimezoneOffset = new Date().getTimezoneOffset();

    // Hitung perbedaan waktu dengan UTC
    var utcOffset = -localTimezoneOffset / 60;
    if (utcOffset == 7) {
      setUtc('WIB');
    } else if (utcOffset == 8) {
      setUtc('WITA');
    } else if (utcOffset == 9) {
      setUtc('WITA');
    }
  }, []);
  const [mkeluar, setMkeluar] = useState(false);

  const {gantiskpd} = React.useContext(AuthContext);
  const w = Dimensions.get('screen').width;

  return (
    <NativeBaseProvider>
      <Modal isOpen={mkeluar} onClose={() => setMkeluar(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />

          <Modal.Body>Anda yakin ingin keluar ?</Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setMkeluar(false);
                }}>
                Batal
              </Button>
              <Button
                bg={conf.color}
                w={24}
                onPress={() => {
                  setMkeluar(false);
                  // signOut();
                  signOut();
                  navigation.replace('MyTabs');
                  Toast.show({title: 'Anda sudah keluar !'});
                }}>
                Ya
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Box bg={'gray.200'} flex={1} p={4}>
        <ScrollView>
          <Box bg={'white'} borderRadius={'2xl'} p={4}>
            <HStack>
              <Image
                source={
                  user.foto == null
                    ? require('../../assets/user.png')
                    : {uri: user.foto}
                }
                alt="UF"
                h={81}
                w={81}
                borderRadius={'full'}
                bg={'gray.400'}
              />
              <Stack ml={4}>
                <Text>Selamat Datang</Text>
                <Heading color={conf.color} mb={2}>
                  {user.name}
                </Heading>
                <Text bold>Di {conf.name_app}</Text>
                <Text bold>{conf.daerah}</Text>
              </Stack>
            </HStack>
            <Divider my={2} />
            <Stack alignItems={'center'}>
              <Text>
                Hari ini {moment(new Date()).format('dddd,DD MMMM YYYY')}
              </Text>
              <Text bold fontSize={22}>
                {user.info}
              </Text>
            </Stack>
          </Box>

          <Pressable
            onPress={() => navigation.navigate('Presensimasuk')}
            bg={'green.500'}
            borderRadius={'2xl'}
            mt={4}
            p={4}
            alignItems={'center'}>
            <Icon
              as={MaterialCommunityIcons}
              name="clock-check"
              color="white"
              size={24}
            />
            <Text color="white" mt={3} bold fontSize={10}>
              WAKTU MASUK KERJA{' '}
              {moment(user.waktu_masuk, 'HH:mm:ss').format('HH:mm')} ={' '}
              {moment(user.waktu_keluar, 'HH:mm:ss').format('HH:mm')} {utc}
            </Text>
            <Text bold color="white" fontSize={20}>
              PRESENSI MASUK
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Presensikeluar')}
            bg={'orange.500'}
            borderRadius={'2xl'}
            mt={4}
            p={4}
            alignItems={'center'}>
            <Icon
              as={MaterialCommunityIcons}
              name="clock-remove"
              color="white"
              size={24}
            />
            <Text color="white" mt={3} bold fontSize={10}>
              WAKTU SELESAI KERJA 17:00 WIB
            </Text>
            <Text bold color="white" fontSize={20}>
              PRESENSI KELUAR
            </Text>
          </Pressable>

          <HStack
            bg={'indigo.500'}
            borderRadius={'2xl'}
            mt={4}
            px={4}
            py={2}
            alignItems={'center'}>
            <Image
              source={require('../../assets/nfc.png')}
              size={'lg'}
              alt=""
              resizeMode="contain"
            />
            <Text color="white" width={200} fontSize={16}>
              Atau tempelkan perangkat anda pada{' '}
              <Text color="white" bold fontSize={16}>
                NFC Scanner.
              </Text>
            </Text>
          </HStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}
