import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
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
import {ver} from '../..';

export default function Profil({route, navigation}) {
  const {conf, user} = route.params;
  const {signOut} = React.useContext(AuthContext);
  const [mkeluar, setMkeluar] = useState(false);
  const [minfo, setMinfo] = useState(false);
  const [mganti, setMganti] = useState(false);
  const [password, setPassword] = useState('');
  const [lpassword, setLpassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [show, setShow] = useState(false);
  const [rshow, setRshow] = useState(false);
  const [lshow, setLshow] = useState(false);

  const [image, setImage] = useState(null);

  const {ganti} = React.useContext(AuthContext);

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
                  signOut();
                  navigation.replace('MyTabs');
                }}>
                Ya
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={minfo} onClose={() => setMinfo(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />

          <Modal.Body>Informasi Aplikasi</Modal.Body>
          <Image
            w={90}
            h={90}
            borderRadius={90}
            alignSelf={'center'}
            alt="icon"
            resizeMode="contain"
            source={{uri: conf.icon}}
          />
          <Text alignSelf={'center'}>{conf.name_app}</Text>
          <Text alignSelf={'center'}>{conf.daerah}</Text>
          <Text alignSelf={'center'} mb={2}>
            {ver}
          </Text>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                bg={conf.color}
                onPress={() => {
                  setMinfo(false);
                }}>
                Ok
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Stack bg={'gray.100'} flex={1}>
        <Heading ml={8} mt={5}>
          Profile
        </Heading>
        <Box bg={'white'} m={4} borderRadius={'2xl'} p={4}>
          <Image
            alt="..."
            resizeMode="stretch"
            source={
              user.foto == null
                ? require('../../assets/user.png')
                : {uri: user.foto}
            }
            h={91}
            w={91}
            mt={8}
            alignSelf={'center'}
            borderRadius={'full'}
            bg={'gray.400'}
          />
          <Heading color={conf.color} alignSelf={'center'} mt={4}>
            {user.name}
          </Heading>
          <Text alignSelf={'center'}>{user.email}</Text>
          <Divider my={4} />
          <HStack>
            <Stack w={32} space={2}>
              <Text bold>Username</Text>
              <Text bold>Daerah</Text>
              <Text bold>Verifikasi email</Text>
            </Stack>
            <Stack space={2}>
              <Text>: {user.username}</Text>
              <Text>: {conf.daerah}</Text>
              <Text>
                :{' '}
                {user.email_verified_at
                  ? 'Terverifikasi'
                  : 'Belum Terverifikasi'}
              </Text>
            </Stack>
          </HStack>
        </Box>

        {user !== null ? (
          <Box borderRadius={'2xl'} px={4}>
            <Pressable
              bg={'white'}
              borderRadius={'2xl'}
              p={4}
              onPress={() => setMinfo(true)}>
              <HStack justifyContent={'space-between'}>
                <HStack>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="information-outline"
                    color="black"
                    size={8}
                  />
                  <Text color="black" bold fontSize={14} mt={1} ml={3}>
                    Informasi
                  </Text>
                </HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="chevron-right"
                  color="black"
                  size={8}
                />
              </HStack>
            </Pressable>

            <Pressable
              bg={'white'}
              borderRadius={'2xl'}
              p={4}
              onPress={() => setMkeluar(true)}
              mt={4}>
              <HStack justifyContent={'space-between'}>
                <HStack>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="logout"
                    color="black"
                    size={7}
                  />
                  <Text color="black" bold fontSize={14} mt={1} ml={5} mr={2}>
                    Logout
                  </Text>
                </HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="chevron-right"
                  color="black"
                  size={8}
                />
              </HStack>
            </Pressable>
          </Box>
        ) : null}
      </Stack>
    </NativeBaseProvider>
  );
}
