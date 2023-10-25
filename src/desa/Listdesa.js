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

export default function Listdesa({route, navigation}) {
  const {conf, user} = route.params;
  const {signOut} = React.useContext(AuthContext);

  const [mkec, setMkec] = useState(false);
  const [mkot, setMkot] = useState(false);
  const [mt, setMt] = useState(false);

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
      desa: 'Tumpah Selatan',
      act: true,
    },
    {
      t: '#12313',
      provinsi: 'ACEH',
      kab: 'ACEH BESAR',
      kec: 'MESJID RAYA',
      nama: 'Roy Van Lehreur',
      desa: 'Tumpah Selatan',
      act: true,
    },
    {
      t: '#12313',
      provinsi: 'ACEH',
      kab: 'ACEH BESAR',
      kec: 'MESJID RAYA',
      nama: 'Roy Van Lehreur',
      desa: 'Tumpah Selatan',
      act: false,
    },
  ]);

  const w = Dimensions.get('screen').width;
  console.log(dkec.filter(res => res.urai).map(ele => ele.kec));
  return (
    <NativeBaseProvider>
      <Modal isOpen={mkec} onClose={() => setMkec(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Pilih Kecamatan</Modal.Header>
          <Modal.Body>
            <Select
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Kecamatan"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setMkec(false);
                //setKec(itemValue);
                const data = dkec
                  .filter(function (item) {
                    return item.id == itemValue;
                  })
                  .map(function ({id, urai}) {
                    return {id, urai};
                  });
                setKec(data[0]);
              }}>
              {dkec.map((v, i) => (
                <Select.Item label={v.urai} value={v.id} key={i} />
              ))}
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setMkec(false);
                }}>
                Batal
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  setKec({id: 0, urai: 'Kecamatan'});
                  setMkec(false);
                }}>
                Hapus
              </Button>
              <Button
                onPress={() => {
                  setMkec(false);
                }}>
                Simpan
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={mkot} onClose={() => setMkot(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Pilih Kabupaten/Kota</Modal.Header>
          <Modal.Body>
            <Select
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Kabupaten/Kota"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              selectedValue={kot.id}
              mt={1}
              onValueChange={itemValue => {
                setMkot(false);
                //setKec(itemValue);
                const data = dkot
                  .filter(function (item) {
                    return item.id == itemValue;
                  })
                  .map(function ({id, urai}) {
                    return {id, urai};
                  });
                setKot(data[0]);
              }}>
              {dkot.map((v, i) => (
                <Select.Item label={v.urai} value={v.id} key={i} />
              ))}
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setMkot(false);
                }}>
                Batal
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  setKot({id: 0, urai: 'Kab./Kota'});
                  setMkot(false);
                }}>
                Hapus
              </Button>
              <Button
                onPress={() => {
                  setMkot(false);
                }}>
                Simpan
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={mt} onClose={() => setMt(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Pilih Tahun</Modal.Header>
          <Modal.Body>
            <Select
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Tahun"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              selectedValue={new Date().getFullYear()}
              onValueChange={itemValue => {
                setMt(false);
                //setKec(itemValue);

                setT(itemValue);
              }}>
              <Select.Item label="2021" value={2021} />
              <Select.Item label="2022" value={2022} />
              <Select.Item label="2023" value={2023} />
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setMt(false);
                }}>
                Batal
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  setT(new Date().getFullYear());
                  setMt(false);
                }}>
                Hapus
              </Button>
              <Button
                onPress={() => {
                  setMt(false);
                }}>
                Simpan
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Header tit={'Infrastruktur Desa'} nv={navigation} conf={conf} />

      <Box bg={'gray.100'} flex={1}>
        <Box mx={4} my={4} px={4} py={1} bg={'white'} borderRadius={'2xl'}>
          <HStack w="100%" alignItems={'flex-end'}>
            <Input
              flex={1}
              size="xs"
              placeholder="cari..."
              variant="underlined"
            />
            <Pressable>
              <Icon as={MaterialCommunityIcons} name="magnify" size={25} />
            </Pressable>
          </HStack>
          <HStack my={2} space={2}>
            <Button
              size={'xs'}
              flex={1}
              bg={conf.color}
              onPress={() => {
                setMkec(true);
              }}>
              {kec.urai}
            </Button>

            <Button
              size={'xs'}
              flex={1}
              bg={'orange.500'}
              onPress={() => setMt(true)}>
              {t}
            </Button>
          </HStack>
        </Box>
        <HStack justifyContent={'space-between'}>
          <Text bold fontSize={11} ml={4} mb={1}>
            Total : 120
          </Text>
          <Text bold fontSize={11} mr={4} mb={1}>
            3 / 120
          </Text>
        </HStack>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => navigation.navigate('Detaildesa')}
              disabled={!item.act}
              key={index}>
              <Box
                mx={4}
                mb={4}
                px={4}
                py={1}
                borderRadius={'2xl'}
                bg={'white'}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                  <Text bold>{item.t}</Text>
                  <Box
                    bg={item.act ? 'green.500' : 'gray.500'}
                    w={20}
                    alignItems={'center'}
                    py={1}
                    borderRadius={'xl'}>
                    <Text color="white" fontSize={11} bold>
                      {item.act ? 'Aktif' : 'Non Aktif'}
                    </Text>
                  </Box>
                </HStack>
                <Divider my={2} />
                <HStack>
                  <Stack w={'50%'}>
                    <Text bold>Provinsi</Text>
                    <Text>{item.provinsi}</Text>
                    <Text bold mt={2}>
                      Kabupaten/Kota
                    </Text>
                    <Text>{item.kab}</Text>
                  </Stack>
                  <Stack w={'50%'}>
                    <Text bold>Kecamatan</Text>
                    <Text>{item.kec}</Text>
                    <Text bold mt={2}>
                      Desa
                    </Text>
                    <Text>{item.desa}</Text>
                  </Stack>
                </HStack>
              </Box>
            </Pressable>
          )}
        />
      </Box>
    </NativeBaseProvider>
  );
}
