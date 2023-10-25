import * as React from 'react';
import {useEffect, useRef} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  NativeBaseProvider,
  Spinner,
  Stack,
  Text,
  View,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PagerView from 'react-native-pager-view';
import {StyleSheet} from 'react-native';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import update from 'immutability-helper';
import AuthContext from '../../AuthContext';
import {configureFonts} from 'react-native-paper';
const useOnUpdate = (callback, deps) => {
  const isFirst = useRef(true);
  useEffect(() => {
    if (!isFirst.current) {
      callback();
    }
  }, deps);

  useEffect(() => {
    isFirst.current = false;
  }, []);
};
export default function Onboarding({route, navigation}) {
  const {conf, user, perm} = route.params;
  const {grante} = React.useContext(AuthContext);
  const [load, setLoad] = React.useState(true);

  const [granted, setGranted] = React.useState(['', '']);
  const [pager, setPager] = React.useState(0);
  const [permf, setPermf] = React.useState([]);

  React.useEffect(() => {
    cekperm();
  }, []);
  React.useEffect(() => {
    perm.map((v, i) => {
      check(v.p)
        .then(result => {
          //const newArray = update(granted, {$push: [result]});
          console.log('permit' + result);

          let newState = [...perm];
          newState[i].grante = result;
          console.log(newState);
          //setPermf(newState);
          var x = newState.filter(function (g) {
            return g.grante !== 'unavailable';
          });
          setPermf(x);
        })
        .catch(error => {
          // …
          console.log(error);
        });
    });
  }, []);

  useOnUpdate(() => {
    if (pager < permf.length) {
      if (permf[pager].grante == 'granted') {
        console.log('kene');
        setPager(pager + 1);
        ref.current.setPage(pager + 1);
      }
    }
  }, [permf]);

  function cekperm() {
    permf.map((v, i) => {
      check(v.p)
        .then(result => {
          //const newArray = update(granted, {$push: [result]});
          console.log('permit' + result);

          let newState = [...permf];
          newState[i].grante = result;
          setPermf(newState);
        })
        .catch(error => {
          // …
        });
    });
  }

  React.useEffect(() => {
    if (permf.length !== 0) {
      var isValid = false;
      const cekvalid = obj => obj.grante === 'granted';

      isValid = permf.every(cekvalid);
      console.log('isvalid' + isValid);
      if (isValid === true) {
        grante();
      }
    }
  }, [permf]);
  async function req() {
    request(perm[pager].p).then(statuses => {
      console.log(statuses);
      cekperm();
    });
  }
  const ref = React.useRef(PagerView);
  console.log(permf);
  return (
    <NativeBaseProvider>
      <Box flex={1} bg={conf.color}>
        <Box flex={1}></Box>
        <Box flex={1}>
          {permf.length !== 0 && (
            <PagerView
              style={{flex: 1}}
              initialPage={pager}
              ref={ref}
              onPageSelected={e => {
                setPager(e.nativeEvent.position);
                console.log(e.nativeEvent.position);
              }}>
              {permf.map((v, i) => (
                <Center key={i} justifyContent={'space-between'} flex={1}>
                  <>
                    <Stack flex={1} w={'100%'} px={4}>
                      <Box
                        bg={'white'}
                        borderRadius={'2xl'}
                        flex={1}
                        pt={8}
                        pb={4}
                        px={4}
                        justifyContent={'space-between'}>
                        <Icon
                          alignSelf={'center'}
                          as={MaterialCommunityIcons}
                          name={v.icon}
                          size={24}
                          color={conf.color}
                        />
                        <Stack>
                          <Heading mt={4} size={'md'}>
                            {v.title}
                          </Heading>
                          <Text>{v.desc}</Text>
                        </Stack>
                      </Box>
                    </Stack>
                  </>
                </Center>
              ))}
            </PagerView>
          )}
        </Box>
        <Box flex={1} pt={4} px={4}>
          <HStack alignSelf={'center'} space={4} mb={4}>
            {permf.map((w, j) => (
              <Box
                key={j}
                w={4}
                h={4}
                bg={j == pager ? 'white' : null}
                borderRadius={'full'}
                borderColor={'white'}
                borderWidth={3}
              />
            ))}
          </HStack>
          <Button
            borderRadius={'xl'}
            onPress={() => req()}
            bg={'white'}
            _text={{color: conf.color}}>
            Izinkan
          </Button>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
