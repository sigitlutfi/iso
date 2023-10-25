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
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
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
import MonthPicker from 'react-native-month-year-picker';

moment.locale('id');

export default function Riwayat({route, navigation}) {
  const {conf, user} = route.params;
  const {signOut} = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const showPicker = useCallback(value => setShow(value), []);
  const [mkeluar, setMkeluar] = useState(false);
  const [as, setAs] = useState(false);
  const [dataas, setDataas] = useState(null);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  useEffect(() => {
    getData();
  }, [date]);

  function getData() {
    setLoading(true);
    setData([]);
    axios({
      method: 'get',
      url:
        conf.url +
        'user/riwayat?startDate=' +
        moment(date).startOf('month').format('YYYY-MM-DD') +
        '&endDate=' +
        moment(date).endOf('month').format('YYYY-MM-DD'),
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    })
      .then(v => {
        console.log(v);
        setLoading(false);
        if (v.data.data !== undefined) {
          const x = [];
          const days = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0,
          ).getDate();
          console.log(days);
          for (let i = 1; i <= days; i++) {
            x.push({
              hari: moment(
                new Date(date.getFullYear(), date.getMonth(), i),
              ).format('dddd'),
              tanggal: moment(
                new Date(date.getFullYear(), date.getMonth(), i),
              ).format('DD MMMM YYYY'),
              masuk: null,
              keluar: null,
              lat_masuk: null,
              lat_keluar: null,
              lon_masuk: null,
              lon_keluar: null,
              foto_masuk: null,
              foto_keluar: null,
              terlambat_masuk: null,
              terlambat_keluar: null,
              lebih_awal_masuk: null,
              lebih_awal_keluar: null,
              ket: null,
              updated_by: null,
            });
          }

          for (let j = 0; j < v.data.data.length; j++) {
            const element = v.data.data[j];
            objIndex = x.findIndex(
              obj =>
                obj.tanggal ==
                moment(element.created_at).format('DD MMMM YYYY'),
            );

            //Log object to Console.
            console.log('Before update: ', x[objIndex]);
            x[objIndex].ket = element.keterangan;

            //Update object's name property.
            if (element.tipe == 1) {
              x[objIndex].masuk = element.created_at;
              x[objIndex].foto_masuk = element.foto;
              x[objIndex].terlambat_masuk = element.terlambat;
              x[objIndex].lebih_awal_masuk = element.lebih_awal;
            }
            if (element.tipe == 2) {
              x[objIndex].keluar = element.created_at;
              x[objIndex].foto_keluar = element.foto;
              x[objIndex].terlambat_keluar = element.terlambat;
              x[objIndex].lebih_awal_keluar = element.lebih_awal;
            }

            //Log object to console again.
            //console.log("After update: ", myArray[objIndex])
          }
          setData(x);
        }
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }
  console.log(date);

  const {gantiskpd} = React.useContext(AuthContext);
  const w = Dimensions.get('screen').width;

  function check() {
    var now = moment();
    var hourToCheck = now.day() !== 0 ? 17 : 15;
    var dateToCheck = now.hour(hourToCheck).minute(30);

    return moment().isAfter(dateToCheck);
  }

  console.log(data);
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

      <Actionsheet isOpen={as} onClose={() => setAs(false)}>
        <Actionsheet.Content>
          {dataas != null ? (
            <Box pb={12} pt={4}>
              <Heading>{dataas.hari + ',' + dataas.tanggal}</Heading>
              <Text fontSize={12}>Keterangan :</Text>
              <Text bold>{dataas.ket}</Text>
              <HStack w={'full'} space={4} mt={8}>
                <Stack flex={1} alignItems={'center'} space={2}>
                  <Text bold>Jam Masuk</Text>
                  <Heading>
                    {dataas.masuk == null
                      ? '-'
                      : moment(dataas.masuk).format('HH:mm') + ' WIB'}
                  </Heading>
                  <Box h={36}>
                    {dataas.terlambat_masuk != null && (
                      <Text>Terlambat {dataas.terlambat_masuk} menit</Text>
                    )}
                    {dataas.lebih_awal_masuk != null && (
                      <Text>Lebih awal {dataas.lebih_awal_masuk} menit</Text>
                    )}
                  </Box>
                  <Divider />

                  <Image
                    size={'xl'}
                    source={{
                      uri:
                        dataas.foto_masuk !== null
                          ? dataas.foto_masuk
                          : 'https://placehold.co/600x400.png',
                    }}
                    borderRadius={'2xl'}
                    alt=""
                  />
                </Stack>
                <Stack flex={1} alignItems={'center'} space={2}>
                  <Text bold>Jam Keluar</Text>
                  <Heading>
                    {dataas.keluar == null
                      ? '-'
                      : moment(dataas.keluar).format('HH:mm') + ' WIB'}
                  </Heading>
                  <Box h={36}>
                    {dataas.lebih_awal_keluar != null && (
                      <Text>Lebih awal {dataas.lebih_awal_keluar} menit</Text>
                    )}
                  </Box>
                  <Divider />

                  <Image
                    size={'xl'}
                    source={{
                      uri:
                        dataas.foto_keluar !== null
                          ? dataas.foto_keluar
                          : 'https://placehold.co/600x400.png',
                    }}
                    borderRadius={'2xl'}
                    alt=""
                  />
                </Stack>
              </HStack>
            </Box>
          ) : null}
        </Actionsheet.Content>
      </Actionsheet>

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          maximumDate={new Date()}
          cancelButton="Batal"
          okButton="Ok"
          locale="id"
        />
      )}
      <Box bg={'gray.200'} flex={1} p={4}>
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
            <Stack ml={4} justifyContent={'center'}>
              <Text>Riwayat Presensi</Text>
              <Heading color={conf.color} mb={2}>
                {user.name}
              </Heading>
            </Stack>
          </HStack>

          <HStack alignItems={'center'} space={4} mt={4}>
            <Pressable
              onPress={() => {
                const x = moment(date);
                x.subtract(1, 'months');

                setDate(x.toDate());
              }}>
              <Center borderRadius={'full'} bg={conf.color} h={10} w={10}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="chevron-left-circle"
                  color="white"
                />
              </Center>
            </Pressable>
            <Button
              borderRadius={'full'}
              bg={conf.color}
              flex={1}
              onPress={() => showPicker(true)}>
              {moment(date).format('MMMM YYYY')}
            </Button>
            <Pressable
              disabled={
                date.getMonth() == new Date().getMonth() &&
                date.getFullYear() == new Date().getFullYear()
              }
              onPress={() => {
                const x = moment(date);
                x.add(1, 'months');

                setDate(x.toDate());
              }}>
              <Center
                borderRadius={'full'}
                bg={
                  date.getMonth() == new Date().getMonth() &&
                  date.getFullYear() == new Date().getFullYear()
                    ? 'gray.500'
                    : conf.color
                }
                h={10}
                w={10}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="chevron-right-circle"
                  color="white"
                />
              </Center>
            </Pressable>
          </HStack>
        </Box>

        {loading ? (
          <Center h={500} bg={'white'} borderRadius={'2xl'} p={4} mt={4}>
            <Spinner size={'lg'} color={conf.color} />
          </Center>
        ) : data.length == 0 ? (
          <Center h={500} bg={'white'} borderRadius={'2xl'} p={4} mt={4}>
            <Text>Belum ada data.</Text>{' '}
          </Center>
        ) : (
          <Box flex={1} bg={'white'} borderRadius={'2xl'} p={4} mt={4}>
            <HStack justifyContent={'space-between'}>
              <Text w={16} bold>
                Hari
              </Text>
              <Text w={32} bold>
                Tanggal
              </Text>
              <Text w={16} bold>
                Jam Masuk
              </Text>
              <Text w={16} bold>
                Jam Keluar
              </Text>
            </HStack>
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() => {
                    setAs(true);
                    setDataas(item);
                    //n
                  }}>
                  <HStack
                    flexDir={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Text w={16}>{item.hari}</Text>
                    <Text w={32}>{item.tanggal}</Text>
                    <Text
                      w={16}
                      color={
                        item.masuk == null
                          ? 'gray.500'
                          : moment(
                              moment(item.masuk).format('HH:mm'),
                              'HH:mm',
                            ).isAfter(moment('09:30', 'HH:mm'))
                          ? 'red.500'
                          : 'green.500'
                      }
                      fontSize={16}
                      bold>
                      {item.masuk == null
                        ? '-'
                        : moment(item.masuk).format('HH:mm')}
                    </Text>
                    <Text
                      w={16}
                      color={
                        item.keluar == null
                          ? 'gray.500'
                          : moment(
                              moment(item.keluar).format('HH:mm'),
                              'HH:mm',
                            ).isBefore(moment('17:00', 'HH:mm'))
                          ? 'red.500'
                          : 'green.500'
                      }
                      fontSize={16}
                      bold>
                      {item.keluar == null
                        ? '-'
                        : moment(item.keluar).format('HH:mm')}
                    </Text>
                  </HStack>
                  <Divider my={2} />
                </Pressable>
              )}
            />
          </Box>
        )}
      </Box>
    </NativeBaseProvider>
  );
}
