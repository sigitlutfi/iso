import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from './AuthContext';

import Login from './src/auth/Login';

import Profil from './src/Profil/Profil';
import {Icon, NativeBaseProvider, Spinner} from 'native-base';

import Header from './src/common/Header';

import {Post} from './src/common/Req';
import Register from './src/auth/Register';

import axios from 'axios';

import Homex from './src/home/Homex';
import ListBerita from './src/berita/Listberita';
import Bacaberita from './src/berita/Bacaberita';

import Lapor from './src/lapor/Lapor';

import Otp from './src/auth/Otp';
import Chart from './src/chart/chart';
import Listkecamatan from './src/kecamatan/Listkecamatan';
import Listdesa from './src/desa/Listdesa';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Monev from './src/monev/Monev';
import DetailMonev from './src/monev/DetailMonev';
import Jawaban from './src/monev/Jawaban';
import Maps from './src/monev/Maps';
import TambahMonev from './src/monev/TambahMonev';
import Detailkecamatan from './src/kecamatan/Detailkecamatan';
import Asetkecamatan from './src/kecamatan/Asetkecamatan';
import Tambahasetkecamatan from './src/kecamatan/Tambahasetkecamatan';
import Detaildesa from './src/desa/Detaildesa';
import Tambahasetdesa from './src/desa/Tambahasetdesa';
import Asetdesa from './src/desa/Asetdesa';
import Dokumen from './src/dokumen/Dokumen';
import Presensimasuk from './src/presensi/Presensimasuk';
import Riwayat from './src/presensi/Riwayat';
import Presensikeluar from './src/presensi/Presensikeluar';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Splash from './src/splash/Splash';
import {checkMultiple, PERMISSIONS, check} from 'react-native-permissions';
import Onboarding from './src/splash/Onboarding';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userData: action.user,
            isLoading: false,
            conf: action.conf,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userData: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userData: null,
            isLoading: false,
            conf: action.conf,
          };
        case 'SIGN_OUTs':
          return {
            ...prevState,
            isSignout: true,
            userData: null,
            isLoading: false,
          };

        case 'grant_permission':
          return {
            ...prevState,

            permission: action.permission,
          };

        case 'GANTI_SKPD':
          return {
            ...prevState,

            userData: action.user,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userData: null,
      permission: false,
      conf: false,
      perm: [
        {
          p: PERMISSIONS.ANDROID.CAMERA,
          title: 'Izinkan penggunaan kamera',
          desc: 'Kami memerlukan izin kamera untuk pengenalan wajah',
          icon: 'camera',
          grante: false,
        },
        {
          p: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          title: 'Izinkan penggunaan lokasi',
          desc: 'Kami memerlukan izin lokasi untuk pengukuran jarak presensi',
          icon: 'map-marker',
          grante: false,
        },
        {
          p: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          title: 'Izinkan penggunaan media',
          desc: 'Kami memerlukan izin media untuk pengenalan wajah',
          icon: 'view-gallery',
          grante: false,
        },
      ],
    },
  );
  const [loadconf, setLoadconf] = React.useState(true);
  React.useEffect(() => {
    axios({method: 'GET', url: 'http://103.100.27.59/api/umum'})
      .then(r => {
        console.log(r);
        const cr = r.data;

        cr.url = 'http://103.100.27.59/api/';
        cr.color = '#4f46e5';
        cr.name_app = r.data.nama_aplikasi;
        cr.subname_app = r.data.nama_singkat_aplikasi;
        cr.icon = r.data.logo;

        bootstrapAsync1(cr);
        setLoadconf(false);
      })
      .catch(e => {
        console.log(e);

        setLoadconf(false);
        bootstrapAsync1({
          url: 'http://103.100.27.59/api/',
          name_app: 'Aplikasi Presensi (BETA)',
          subname_app: 'Presensi',
          color: '#4f46e5',
          icon: 'http://103.100.27.59/storage/gambar/logo/e7de10be-f01a-4b96-9921-59376b3b9f63.png',
          daerah: 'Global Intermedia',
          deskripsi: 'Aplikasi untuk presensi',
          koordinat: '-7.813111492789422, 110.37669583357997',
          today: 'Selasa, 17 Oktober 2023',
          icon: 'https://bnpp.go.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_bnpp.aa2af950.png&w=1920&q=75',
        });
      });

    // Fetch the user from storage then navigate to our appropriate place
  }, []);
  const bootstrapAsync1 = async c => {
    await AsyncStorage.setItem('conf', JSON.stringify(c));
  };

  React.useEffect(() => {
    var permf = [];
    state.perm.map((v, i) => {
      check(v.p)
        .then(result => {
          //const newArray = update(granted, {$push: [result]});
          // console.log('permit' + result);

          let newState = [...state.perm];
          newState[i].grante = result;
          //console.log(newState);
          //setPermf(newState);
          var x = newState.filter(function (g) {
            return g.grante !== 'unavailable';
          });

          permf = x;
        })
        .catch(error => {
          // …
          console.log(error);
        });
    });

    const aperm = [];
    permf.map((v, i) => {
      aperm[i] = v.p;
    });

    checkMultiple(aperm).then(statuses => {
      console.log(statuses);

      var isValid = false;
      const cekvalid = obj => obj.grante === 'granted';

      isValid = state.perm.every(cekvalid);
      console.log('isvalid' + isValid);
      if (isValid === true) {
        dispatch({type: 'grant_permission', permission: true});
      }
    });
    const bootstrapAsync = async () => {
      let userData;
      let conf;

      try {
        conf = await AsyncStorage.getItem('conf');
        userData = await AsyncStorage.getItem('userData');
      } catch (e) {
        // Restoring user failed
      }

      // After restoring user, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //console.log(conf);
      conf = JSON.parse(conf);
      console.log(userData);
      userData = JSON.parse(userData);
      if (userData !== null && loadconf === false) {
        axios({
          url: conf.url + 'user',
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
          .then(v => {
            console.log(v);
            if (v.data.id !== undefined) {
              dispatch({type: 'RESTORE_TOKEN', user: userData, conf: conf});
            } else {
              dispatch({type: 'SIGN_OUT', conf: conf});
            }
          })
          .catch(e => {
            console.log(e);
            dispatch({type: 'SIGN_OUT', conf: conf});
          });
      } else if (loadconf === false) {
        dispatch({type: 'SIGN_OUT', conf: conf});
      }
    };

    bootstrapAsync();
  }, [loadconf]);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a user
        // We will also need to handle errors if sign in failed
        // After getting user, we need to persist the user using `SecureStore`
        // In the example, we'll use a dummy user
        console.log(data);
        dispatch({type: 'SIGN_IN', user: data});
      },
      signOut: () => {
        const hapusUser = async () => {
          try {
            await AsyncStorage.removeItem('userData');
          } catch (e) {
            console.log(e);
          }
        };

        hapusUser();

        dispatch({type: 'SIGN_OUTs'});
      },
      grante: async data => {
        dispatch({type: 'grant_permission', permission: true});
      },

      ganti: async data => {
        console.log(data);
        try {
          //await AsyncStorage.setItem('userData', JSON.stringify(data));
        } catch (e) {
          // Restoring user failed
        }
        dispatch({type: 'SIGN_IN', user: data});
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a user
        // We will also need to handle errors if sign up failed
        // After getting user, we need to persist the user using `SecureStore`
        // In the example, we'll use a dummy user

        dispatch({type: 'SIGN_IN', user: 'dummy-auth-user'});
      },
    }),
    [],
  );

  function MyTabs() {
    return (
      <NativeBaseProvider>
        <Tab.Navigator
          activeColor="#000000"
          inactiveColor="#d4d4d4"
          shifting={true}
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarStyle: {backgroundColor: '#4f46e5'},
          }}
          barStyle={{backgroundColor: '#4f46e5'}}>
          <Tab.Screen
            name="Home"
            component={Homex}
            initialParams={{conf: state.conf, user: state.userData}}
            options={{
              title: 'Presensi',

              tabBarColor: '#ff00ff',

              tabBarItemStyle: ({focused}) =>
                focused ? {backgroundColor: 'red'} : {backgroundColor: 'green'},
              tabBarIcon: ({color}) => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="account-clock"
                  size={25}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Riwayat"
            component={Riwayat}
            initialParams={{conf: state.conf, user: state.userData}}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="clipboard-list"
                  size={25}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Pengguna"
            component={Profil}
            initialParams={{conf: state.conf, user: state.userData}}
            options={{
              tabBarActiveTintColor: 'white',
              tabBarIcon: ({color}) => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="account"
                  size={25}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NativeBaseProvider>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            <Stack.Screen
              name="Splash"
              component={Splash}
              initialParams={{conf: state.conf}}
            />
          ) : state.permission == false ? (
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              initialParams={{conf: state.conf, perm: state.perm}}
            />
          ) : state.userData == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={Login}
                initialParams={{conf: state.conf}}
              />
              <Stack.Screen
                name="Otp"
                component={Otp}
                initialParams={{conf: state.conf}}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                initialParams={{conf: state.conf}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="MyTabs"
                component={MyTabs}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="Presensimasuk"
                component={Presensimasuk}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Presensikeluar"
                component={Presensikeluar}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Riwayat"
                component={Riwayat}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="Chart"
                component={Chart}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Monev"
                component={Monev}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="DetailMonev"
                component={DetailMonev}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Jawaban"
                component={Jawaban}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="TambahMonev"
                component={TambahMonev}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="Listkecamatan"
                component={Listkecamatan}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Detailkecamatan"
                component={Detailkecamatan}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Asetkecamatan"
                component={Asetkecamatan}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Tambahasetkecamatan"
                component={Tambahasetkecamatan}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="Listdesa"
                component={Listdesa}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Detaildesa"
                component={Detaildesa}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Asetdesa"
                component={Asetdesa}
                initialParams={{conf: state.conf, user: state.userData}}
              />
              <Stack.Screen
                name="Tambahasetdesa"
                component={Tambahasetdesa}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="Listberita"
                component={ListBerita}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="Bacaberita"
                component={Bacaberita}
                initialParams={{conf: state.conf, user: state.userData}}
              />

              <Stack.Screen
                name="Header"
                component={Header}
                initialParams={{conf: state.conf}}
              />
              <Stack.Screen
                name="Req"
                component={Post}
                initialParams={{user: state.userData}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
