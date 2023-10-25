import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  NativeBaseProvider,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import {} from 'react-native';
import AuthContext from '../../AuthContext';

export default function List({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conf, setConf] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([{}, {}, {}, {}, {}, {}, {}]);

  const {signIn} = React.useContext(AuthContext);

  useEffect(() => {
    // Update the document title using the browser API
    //AsyncStorage.getItem('conf');
    const bootstrapAsync = async () => {
      // await AsyncStorage.setItem(
      //   'conf',
      //   JSON.stringify({
      //     url: 'http://tes.id',
      //     name_app: 'GI Base App',
      //     subname_app: 'GI Base App',
      //     color: '#4338ca',
      //     icon: 'https://dummyimage.com/400x600/000/fff&text=dummy',
      //   }),
      // );

      let conf;
      try {
        conf = await AsyncStorage.getItem('conf');
      } catch (error) {}

      conf = JSON.parse(conf);
      setConf(conf);
    };

    bootstrapAsync();
  });

  return (
    <NativeBaseProvider>
      <Stack px={6} pt={12}>
        <Heading
          size="lg"
          color="coolGray.800"
          mt={4}
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold">
          Halo, Alan Suryanjana
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          mb={12}
          size="xs">
          September 2022
        </Heading>
        <Box h={'75%'}>
          <ScrollView>
            {data.map((v, i) => (
              <Stack key={i}>
                <Text bold>{i + 1}. Jenis pengadaan</Text>
                <Text numberOfLines={2} fontSize="xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.{' '}
                </Text>
                <Text>Rp. 120.000</Text>
                <HStack justifyContent={'flex-end'}>
                  <Button
                    w={16}
                    mr={2}
                    size={'xs'}
                    bg={'orange.600'}
                    onPress={() => navigation.navigate('Detail')}>
                    EDIT
                  </Button>
                  <Button w={16} size={'xs'} bg={'cyan.700'}>
                    DETAIL
                  </Button>
                </HStack>
                <Divider mt={2} mb={4} thickness={2} />
              </Stack>
            ))}
          </ScrollView>
        </Box>
      </Stack>
    </NativeBaseProvider>
  );
}
