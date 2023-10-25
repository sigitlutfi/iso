import {
  Avatar,
  Box,
  Button,
  Center,
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
  Popover,
  Pressable,
  Stack,
  Text,
  Toast,
  View,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import React, {useEffect, useState} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../common/Header';
import AuthContext from '../../AuthContext';

import {Get, Post} from '../common/Req';
import axios from 'axios';
import {Alert, BackHandler, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';

export default function Dokumen({route, navigation}) {
  const {conf, user} = route.params;
  const {signOut} = React.useContext(AuthContext);
  const [mkeluar, setMkeluar] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      nama: 'Tes 1',
      tahun: 2020,
      tipe: 'publik',
    },
    {
      id: 2,
      nama: 'Tes 3',
      tahun: 2022,
      tipe: 'publik',
    },
    {
      id: 3,
      nama: 'Tes 3',
      tahun: 2020,
      tipe: 'privat',
    },
  ]);
  const [image, setImage] = useState(null);

  const {ganti} = React.useContext(AuthContext);

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.replace("Home");
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    if (user !== null) {
      setImage(user.foto);
    }
  }, []);

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
                onPress={() => {
                  setMkeluar(false);
                  // signOut();
                  signOut();
                  navigation.replace('MyTabs');
                }}>
                Ya
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Stack flex={1} bg={'gray.100'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Image
            height={300}
            alt=".."
            resizeMode="stretch"
            source={require('../../assets/bgx.png')}
          />
          <Stack position={'absolute'} px={4} pt={6} pb={12} top={4}>
            <Image
              w={65}
              h={65}
              borderRadius={90}
              alt="icon"
              resizeMode="contain"
              source={{uri: conf.icon}}
            />
            <Heading color={'white'}>BNPP</Heading>
            <Heading color={'white'}>Dokumen</Heading>
            {user !== null ? null : (
              <Text color={'white'} mt={2} numberOfLines={2}>
                Anda belum login !
              </Text>
            )}
          </Stack>
        </HStack>
        <Text bold ml={4} mt={-4}>
          Total : 3
        </Text>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <Box
              bg={'white'}
              px={4}
              py={2}
              mx={4}
              my={2}
              borderRadius={'2xl'}
              flexDir={'row'}
              justifyContent="space-between"
              alignItems={'center'}>
              <Stack>
                <Text bold fontSize={'lg'}>
                  {item.nama}
                </Text>
                <Text>
                  {item.tahun} | {item.tipe}
                </Text>
              </Stack>
              <HStack space="2">
                <Pressable>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="file"
                    size={'lg'}
                    color="orange.500"
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="download"
                    size={'lg'}
                    color="indigo.500"
                  />
                </Pressable>
              </HStack>
            </Box>
          )}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
