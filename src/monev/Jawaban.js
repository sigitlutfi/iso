import {
  Box,
  Button,
  Center,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Divider,
  Heading,
  HStack,
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
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import AuthContext from '../../AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Get, Post} from '../common/Req';
import {LoadMoreFlatlist} from 'react-native-load-more-flatlist';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import {LineChart} from 'react-native-chart-kit';
import Header from '../common/Header';
import {ListItem, Avatar, createTheme, ThemeProvider} from '@rneui/themed';
import {Icon} from '@rneui/base';
const theme = createTheme({
  components: {
    ['ListItemContent']: {
      flex: 1,
    },
    ['ListItemAccordion']: {
      backgroundColor: 'red',
    },
  },
});

export default function Jawaban({route, navigation}) {
  const {conf, user, data} = route.params;
  const {signOut} = React.useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);

  const [mskpd, setMskpd] = useState(false);
  const [mkeluar, setMkeluar] = useState(false);

  const [djawaban, setDjawaban] = useState([
    {id: 1, urai: 'Sarana dan prasarana'},
    {id: 2, urai: 'Kondisi Aparatur'},
  ]);
  const [list, setList] = useState([
    {
      id: 1,
      urai: 'Indikator 1: Bangunan',

      detail: [
        {
          nama: 'Balai',
          list: [
            {
              title: 'Ketersediaan',
              value: 'Y',
            },
            {
              title: 'Kelayakan',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'N',
            },
            {
              title: 'Kelayakan',
              value: '100',
            },
          ],
        },
        {
          nama: 'Gedung Sample',
          list: [
            {
              title: 'Ketersediaan',
              value: 'Y',
            },
            {
              title: 'Kelayakan',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'N',
            },
            {
              title: 'Kelayakan',
              value: '80',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      urai: 'Indikator 2: Meubelair',

      detail: [
        {
          nama: 'Kabinet',
          list: [
            {
              title: 'Ketersediaan',
              value: 'Y',
            },
            {
              title: 'Kelayakan',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'N',
            },
            {
              title: 'Kelayakan',
              value: '100',
            },
          ],
        },
        {
          nama: 'Lemari',
          list: [
            {
              title: 'Ketersediaan',
              value: 'Y',
            },
            {
              title: 'Kelayakan',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'Y',
            },
            {
              title: 'Sample',
              value: 'N',
            },
            {
              title: 'Kelayakan',
              value: '80',
            },
          ],
        },
      ],
    },
  ]);

  const w = Dimensions.get('screen').width;

  return (
    <NativeBaseProvider>
      <Header tit={data.urai} nv={navigation} conf={conf} />
      <Box bg={'gray.100'} flex={1}>
        {list.map((v, i) => (
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>{v.urai}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded == i}
            onPress={() => {
              setExpanded(i);
            }}>
            <ThemeProvider theme={theme}>
              {v.detail.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <ListItem.Content>
                    <Text bold mb={1}>
                      {l.nama}
                    </Text>
                    <HStack w="full" space={1} justifyContent={'space-evenly'}>
                      {l.list.map((l, i) => (
                        <Stack key={i} alignItems={'center'}>
                          <Text bold fontSize={11}>
                            {l.title}
                          </Text>
                          <Text>{l.value}</Text>
                        </Stack>
                      ))}
                    </HStack>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))}
            </ThemeProvider>
          </ListItem.Accordion>
        ))}
      </Box>
    </NativeBaseProvider>
  );
}
