import * as React from 'react';
import {
  Box,
  Center,
  Heading,
  Image,
  NativeBaseProvider,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ver} from '../..';

export default function Splash({route, navigation}) {
  const {user} = route.params;
  const [conf, setConf] = React.useState(null);
  const [load, setLoad] = React.useState(true);
  React.useEffect(() => {
    req();
  }, []);

  async function req() {
    let conf;
    let userData;

    try {
      conf = await AsyncStorage.getItem('conf');
      userData = await AsyncStorage.getItem('userData');
    } catch (e) {
      // Restoring user failed
    }
    const cr = JSON.parse(conf);
    if (cr != null) {
      setConf(cr);
      setLoad(false);
    } else {
      axios({method: 'GET', url: 'http://103.100.27.59/api/umum'}).then(r => {
        cr.url = 'http://103.100.27.59/api/';
        cr.color = '#4f46e5';
        cr.name_app = r.data.nama_aplikasi;
        cr.subname_app = r.data.nama_singkat_aplikasi;
        cr.icon = r.data.logo;
        setLoad(false);
        setConf(cr);
      });
    }
  }
  console.log(conf);
  return (
    <NativeBaseProvider>
      {conf ? (
        <Center
          flex={1}
          bg={conf ? conf.color : 'indigo.500'}
          justifyContent={'space-between'}>
          <>
            <Stack flex={1}></Stack>
            <Stack alignItems={'center'} flex={1}>
              <Image source={{uri: conf.icon}} size={'xl'} alt="" />
              <Heading mt={4} color="white">
                {conf.name_app}
              </Heading>
              <Text color="white">{conf.daerah}</Text>
            </Stack>
            <Stack flex={1} justifyContent={'space-evenly'}>
              <Spinner mt={16} color="white" size={'lg'} />
              <Text color="white">Version {ver}</Text>
            </Stack>
          </>
        </Center>
      ) : (
        load == false && (
          <Center flex={1} bg={conf ? conf.color : 'indigo.500'}>
            <Box bg={'white'} borderRadius={'2xl'} py={12} px={12}>
              <Text>Silakan update aplikasi</Text>
            </Box>
          </Center>
        )
      )}
    </NativeBaseProvider>
  );
}
