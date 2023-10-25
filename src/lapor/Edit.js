import {
  Box,
  Button,
  CheckIcon,
  Divider,
  Fab,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  NativeBaseProvider,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  Toast,
  WarningOutlineIcon,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../common/Header';

import moment from 'moment/moment';
import {Get, Post} from '../common/Req';
import {
  FlatList,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {launchCamera} from 'react-native-image-picker';
import DocumentPicker, {isInProgress} from 'react-native-document-picker';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import axios from 'axios';

export default function Edit({route, navigation}) {
  const {conf, user, detail} = route.params;
  const latitudeDelta = 0.005;
  const longitudeDelta = 0.005;
  const [location, setLocation] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: null,
    longitude: null,
  });
  //console.log(detail);
  const [kategori, setKategori] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kec, setKec] = useState([]);
  const [desa, setDesa] = useState([]);
  const [data, setData] = useState(null);

  const [kategoris, setKategoris] = useState(detail.category_id);
  const [provinsis, setProvinsis] = useState(detail.province_code);
  const [kotas, setKotas] = useState(detail.city_code);
  const [kecs, setKecs] = useState(detail.district_code);
  const [desas, setDesas] = useState(detail.village_code);

  const [judul, setJudul] = useState(detail.name);
  const [volume, setVolume] = useState(JSON.stringify(detail.volume));
  const [satuan, setSatuan] = useState(detail.unit);
  const [anggaran, setAnggaran] = useState(detail.budget_estimate);

  const [loading, setLoading] = useState(false);
  const [ajuan, setAjuan] = useState(0);
  const [image, setImage] = useState([]);
  const [imageu, setImageu] = useState([]);
  const [result, setResult] = useState(null);

  const [mbigimg, setMbigimg] = useState(false);
  const [bigimg, setBigimg] = useState(null);

  useEffect(() => {
    getLocation();
    getData();
    getKota();
    getKec();
    getDesa();
    return () => {};
  }, []);

  useEffect(() => {
    bigimg !== null && setMbigimg(true);
  }, [bigimg]);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        setLocation({
          latitudeDelta,
          longitudeDelta,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  async function getData() {
    setLoading(true);
    let data = await Get(
      conf.url + 'document-requests/' + detail.ticket_id,
      user.access_token,
    );

    let kategori = await Get(conf.url + 'categories', user.access_token);
    let provinsi = await Get(conf.url + 'regions/provinces', null);
    // let kota = await Get(conf.url + 'regions/cities', null, null);
    // let kec = await Get(conf.url + 'regions/districts', null, null);
    // let desa = await Get(conf.url + 'regions/villages', null, null);

    const tm = [];
    if (provinsi.stat) {
      for (const [key, value] of Object.entries(provinsi.data)) {
        tm.push({
          title: key,
          value: value,
        });
      }
    }
    console.log(data.data);
    if (data.stat) {
      setLoading(false);
      setImageu(data.data.data.images);
      setData(data.data.data);
      if (
        data.data.data.latitude !== null &&
        data.data.data.longitude !== null
      ) {
        setLocation({
          latitudeDelta,
          longitudeDelta,
          latitude: parseFloat(data.data.data.latitude),
          longitude: parseFloat(data.data.data.longitude),
        });
      }
    }

    setProvinsi(tm);

    if (kategori.data.status) {
      setKategori(kategori.data.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  async function getKec() {
    let kec = await Get(
      conf.url + 'regions/districts/cities/' + kotas,

      null,
    );
    // let kec = await Get(conf.url + 'regions/districts', null, null);
    // let desa = await Get(conf.url + 'regions/villages', null, null);

    const tm = [];
    if (kec.stat) {
      for (const [key, value] of Object.entries(kec.data)) {
        tm.push({
          title: key,
          value: value,
        });
      }
    }

    setKec(tm);
  }

  async function getDesa() {
    let desa = await Get(
      conf.url + 'regions/villages/districts/' + kecs,

      null,
    );
    // let kec = await Get(conf.url + 'regions/districts', null, null);
    // let desa = await Get(conf.url + 'regions/villages', null, null);

    const tm = [];
    if (desa.stat) {
      for (const [key, value] of Object.entries(desa.data)) {
        tm.push({
          title: key,
          value: value,
        });
      }
    }

    setDesa(tm);
  }

  async function getKota() {
    let kota = await Get(
      conf.url + 'regions/cities/provinces/' + provinsis,

      null,
    );
    // let kec = await Get(conf.url + 'regions/districts', null, null);
    // let desa = await Get(conf.url + 'regions/villages', null, null);

    const tm = [];
    if (kota.stat) {
      for (const [key, value] of Object.entries(kota.data)) {
        tm.push({
          title: key,
          value: value,
        });
      }
    }

    setKota(tm);
  }

  async function pickcam() {
    let result = await launchCamera({
      mediaType: 'photo',
      aspect: [4, 3],
      quality: 0.3,
    });

    console.log(result);

    setImage(prevValues => [...prevValues, result.assets[0].uri]);
  }

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  function renderimage() {
    return (
      <FlatList
        data={image}
        numColumns={3}
        renderItem={({item, index}) => (
          <Box mr={12} mb={4}>
            <TouchableOpacity onPress={() => setBigimg(item)}>
              <Image
                w={20}
                h={20}
                borderRadius="lg"
                source={{
                  uri: item,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{position: 'absolute', right: 3, top: 3}}
              onPress={() =>
                setImage(prevActions =>
                  // Filter out the item with the matching index
                  prevActions.filter((v, i) => i !== index),
                )
              }>
              <Box
                bg={'white'}
                w={6}
                h={6}
                alignItems={'center'}
                justifyContent="center"
                borderRadius={'lg'}
                borderWidth={1}
                borderColor="red.500">
                <Icon
                  fontSize={15}
                  color={'red.500'}
                  name="window-close"
                  as={MaterialCommunityIcons}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        )}
      />
    );
  }
  function renderimageu() {
    return (
      <Stack>
        <FlatList
          data={imageu}
          numColumns={3}
          renderItem={({item, index}) => (
            <Box mr={12} mb={4} key={index}>
              <TouchableOpacity onPress={() => setBigimg(item.largeURL)}>
                <Image
                  w={20}
                  h={20}
                  alt="img"
                  borderRadius="lg"
                  source={{
                    uri: item.thumbnailURL,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{position: 'absolute', right: 3, top: 3}}
                onPress={() =>
                  setImageu(prevActions =>
                    // Filter out the item with the matching index
                    prevActions.filter((v, i) => i !== index),
                  )
                }>
                <Box
                  bg={'white'}
                  w={6}
                  h={6}
                  alignItems={'center'}
                  justifyContent="center"
                  borderRadius={'lg'}
                  borderWidth={1}
                  borderColor="red.500">
                  <Icon
                    fontSize={15}
                    color={'red.500'}
                    name="window-close"
                    as={MaterialCommunityIcons}
                  />
                </Box>
              </TouchableOpacity>
            </Box>
          )}
        />
        <Divider />
      </Stack>
    );
  }
  //console.log(result);

  function submit() {
    const form = new FormData();
    form.append('name', judul);
    form.append('category_id', kategoris);
    form.append('volume', volume);
    form.append('unit', satuan);
    form.append('budget_estimate', anggaran);
    form.append('province_code', provinsis);
    form.append('city_code', kotas);
    form.append('district_code', kecs);
    form.append('village_code', desas);
    form.append('_method', 'PUT');

    form.append('latitude', location.latitude);
    form.append('longitude', location.longitude);
    if (image.length !== 0) {
      for (let i = 0; i < image.length; i++) {
        form.append('photo[' + i + ']', {
          uri: image[i],
          type: 'image/jpeg',
          name: 'foto.jpg',
        });
      }
    }
    if (result != null) {
      form.append('attachment', {
        uri: result[0].fileCopyUri,
        type: result[0].type,
        name: result[0].name,
      });
    } else {
      form.append('attachment', null);
    }
    console.log(form);
    axios({
      method: 'POST',
      url: conf.url + 'document-requests/' + detail.id,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + user.access_token,
      },
      data: form,
    })
      .then(json => {
        //return json.movies;
        if (json.status === 200) {
          Toast.show({
            title: 'Berhasil mengubah data',
            duration: 1200,
            onCloseComplete: () => navigation.goBack(),
          });
        }
        console.log(json);
      })
      .catch(error => {
        if (error.response !== undefined) {
          Toast.show({title: error.response.data.message});
        } else {
          Toast.show({title: 'Down'});
        }

        console.error(error);
      });
  }
  console.log(location);
  return (
    <NativeBaseProvider>
      <Header tit={'Edit Aspirasi'} nv={navigation} conf={conf} left={true} />

      <KeyboardAvoidingView keyboardVerticalOffset={500} style={{flex: 1}}>
        <Box h={'80%'} mx={4} my={6} flex={1}>
          {loading ? <Spinner color={conf.color} size="lg" /> : null}
          <Heading size={'sm'}>
            Tiket : {data !== null ? data.ticket_id : null}
          </Heading>

          <Modal
            isOpen={mbigimg}
            onClose={() => {
              setMbigimg(false);
              setBigimg(null);
            }}>
            <Modal.Content maxWidth="500px">
              <Modal.CloseButton />
              <Modal.Header>Detail gambar</Modal.Header>

              <Modal.Body>
                <Image size={'2xl'} source={{uri: bigimg}} />
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <ScrollView>
            <Stack space={2}>
              <FormControl>
                <FormControl.Label>Judul</FormControl.Label>
                <Input
                  placeholder=""
                  value={judul}
                  onChangeText={v => setJudul(v)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Kategori</FormControl.Label>
                {kategori.length !== 0 ? (
                  <Select
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder=""
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    defaultValue={detail.category_id}
                    onValueChange={itemValue => {
                      setKategoris(itemValue);
                    }}>
                    {kategori.map((v, i) => {
                      return (
                        <Select.Item key={i} label={v.name} value={v.id} />
                      );
                    })}
                  </Select>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Volume</FormControl.Label>
                <Input
                  placeholder=""
                  keyboardType="phone-pad"
                  value={volume}
                  onChangeText={v => setVolume(v)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Satuan</FormControl.Label>
                <Input
                  placeholder=""
                  value={satuan}
                  onChangeText={v => setSatuan(v)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  Estimasi anggaran (opsional)
                </FormControl.Label>
                <Input
                  placeholder=""
                  keyboardType="phone-pad"
                  value={anggaran}
                  onChangeText={v => setAnggaran(v)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Provinsi</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder=""
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  defaultValue={provinsis}
                  mt={1}
                  onValueChange={itemValue => {
                    setProvinsis(itemValue);
                  }}>
                  {provinsi.length !== 0 &&
                    provinsi.map((v, i) => (
                      <Select.Item key={i} label={v.value} value={v.title} />
                    ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>Kota / Kabupaten</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  isDisabled={kota.length === 0}
                  placeholder=""
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  defaultValue={kotas}
                  onValueChange={itemValue => {
                    setKotas(itemValue);
                  }}>
                  {kota.length !== 0 &&
                    kota.map((v, i) => (
                      <Select.Item key={i} label={v.value} value={v.title} />
                    ))}
                </Select>
              </FormControl>
              {kec.length !== 0 && (
                <FormControl>
                  <FormControl.Label>Kecamatan</FormControl.Label>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder=""
                    isDisabled={kec.length === 0}
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    defaultValue={kecs}
                    onValueChange={itemValue => {
                      setKecs(itemValue);
                    }}>
                    {kec.map((v, i) => (
                      <Select.Item key={i} label={v.value} value={v.title} />
                    ))}
                  </Select>
                </FormControl>
              )}
              {desa.length !== 0 && (
                <FormControl>
                  <FormControl.Label>Desa</FormControl.Label>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    isDisabled={desa.length === 0}
                    placeholder=""
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    defaultValue={desas}
                    onValueChange={itemValue => {
                      setDesas(itemValue);
                    }}>
                    {desa.map((v, i) => (
                      <Select.Item key={i} label={v.value} value={v.title} />
                    ))}
                  </Select>
                </FormControl>
              )}

              <FormControl>
                <FormControl.Label>Gambar</FormControl.Label>
                {imageu.length !== 0 ? renderimageu() : null}
                {image.length !== 0 ? renderimage() : null}
                <Button bg={conf.color} onPress={() => pickcam()}>
                  Pilih gambar
                </Button>
              </FormControl>
              {location.latitude !== null && location.longitude !== null ? (
                <Box borderRadius={'lg'} mt={4}>
                  <MapView
                    style={{
                      width: '100%',
                      height: 140,
                    }}
                    initialRegion={location}
                    onRegionChangeComplete={v => setLocation(v)}></MapView>

                  <View
                    style={{
                      left: '50%',
                      marginLeft: -24,
                      marginTop: -48,
                      position: 'absolute',
                      top: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <IoniconsIcon name="pin" size={48} color="red" />
                    </View>
                  </View>
                </Box>
              ) : null}
              <FormControl>
                <FormControl.Label>Dokumen</FormControl.Label>
                {result !== null ? (
                  <Text mb={2} bold color={conf.color}>
                    {result[0].name}
                  </Text>
                ) : null}
                <Button
                  bg={conf.color}
                  onPress={async () => {
                    try {
                      const pickerResult = await DocumentPicker.pickSingle({
                        presentationStyle: 'fullScreen',
                        copyTo: 'cachesDirectory',
                      });
                      setResult([pickerResult]);
                    } catch (e) {
                      handleError(e);
                    }
                  }}>
                  Pilih dokumen
                </Button>
              </FormControl>
              <Divider my={2} />
              <Button
                size={'lg'}
                bg={conf.color}
                onPress={() => {
                  submit();
                }}>
                KIRIM
              </Button>
            </Stack>
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
