import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  NativeBaseProvider,
  ScrollView,
  Spinner,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../common/Header';

export default function Detail({navigation}) {
  const [conf, setConf] = React.useState(false);
  const [data, setData] = React.useState([
    {key: 'Key', value: 'Tesss'},
    {key: 'Key', value: 'Tesss'},
    {key: 'Key', value: 'Tesss'},
    {key: 'Key', value: 'Tesss'},
    {key: 'Key', value: 'Tesss'},
  ]);

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
  const i = 'cellphone-off';
  return (
    <NativeBaseProvider>
      <Header tit={'Detail'} nv={navigation} />
      <Box h={'80%'} mx={4} my={6}>
        {data.map((v, i) => (
          <HStack>
            <Text width={20}>{v.key}</Text>
            <Text> : </Text>
            <Text bold>{v.value}</Text>
          </HStack>
        ))}
      </Box>
    </NativeBaseProvider>
  );
}
