import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Button,
  Center,
  extendTheme,
  FormControl,
  Heading,
  Image,
  Input,
  KeyboardAvoidingView,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  theme,
  VStack,
} from 'native-base';

import React, {useEffect, useState} from 'react';

import {Dimensions, Keyboard, TouchableOpacity} from 'react-native';

import axios from 'axios';

export default function Login({route, navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {conf} = route.params;
  const [loading, setLoading] = React.useState(false);

  const [deb, setDeb] = React.useState(0);

  //const {signIn} = React.useContext(AuthContext);
  useEffect(() => {
    return () => {
      if (deb === 1) {
        setUsername('123456');
        setPassword('qwerty123');
      }
    };
  }, [deb]);

  async function presignin() {
    setLoading(true);
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);

    axios({method: 'post', url: conf.url + '/auth', data: data})
      .then(res => {
        setLoading(false);

        var user = res.data.user;
        user.token = res.data.data;

        AsyncStorage.setItem('userData', JSON.stringify(user));
        //signIn(user);
      })
      .catch(e => {
        console.log(e);

        setLoading(false);
      });
  }

  return (
    <NativeBaseProvider>
      <Stack bg={'white'} flex={1}>
        <ScrollView>
          <KeyboardAvoidingView keyboardVerticalOffset={500} style={{flex: 1}}>
            <Stack px={6} flex={1}>
              <Center>
                <Pressable onPress={() => setDeb(deb + 1)}>
                  <Image
                    w={180}
                    h={180}
                    mt={60}
                    borderRadius={90}
                    alt="icon"
                    resizeMode="contain"
                    source={{uri: conf.icon}}
                  />
                </Pressable>
                <Heading
                  size="lg"
                  mt={12}
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  fontWeight="semibold">
                  {conf.name_app}
                </Heading>
                <Heading
                  mt="1"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="medium"
                  size="xs">
                  Login untuk mulai menggunakan aplikasi
                </Heading>
              </Center>

              <VStack space={3} mt={6}>
                <Input
                  variant="rounded"
                  backgroundColor={'white'}
                  placeholder="username"
                  value={username}
                  onChangeText={v => setUsername(v)}
                />

                <Input
                  variant="rounded"
                  backgroundColor={'white'}
                  placeholder="password"
                  value={password}
                  onChangeText={v => setPassword(v)}
                />

                {loading && <Spinner color={'yellow.500'} />}
                <Button
                  mt="2"
                  bg={conf.color}
                  borderRadius={'full'}
                  onPress={
                    () => alert('a')
                    //signx()
                    //presignin()
                  }>
                  Masuk
                </Button>
                <TouchableOpacity
                  style={{alignSelf: 'center', width: 200, marginTop: 12}}
                  onPress={() => alert('development')}>
                  <Text style={{alignSelf: 'center'}}>Lupa kata sandi</Text>
                </TouchableOpacity>
              </VStack>
            </Stack>
          </KeyboardAvoidingView>
        </ScrollView>
      </Stack>
    </NativeBaseProvider>
  );
}
