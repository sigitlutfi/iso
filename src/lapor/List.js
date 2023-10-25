import {
  Box,
  Button,
  CheckIcon,
  Divider,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  NativeBaseProvider,
  Radio,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../common/Header";

import moment from "moment/moment";
import { Get, Post } from "../common/Req";
import { formatRupiah } from "../common/FormatRupiah";
import { Keyboard, RefreshControl, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../../AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function List({ route, navigation }) {
  const { conf, user } = route.params;
  const { signOut } = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  const [golongan, setGolongan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sgolongan, setSgolongan] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const [status, setStatus] = useState("2");

  const [total, setTotal] = useState(null);

  const [page, setPage] = useState(1);
  const [pagelas, setPagelas] = useState(null);
  const [query, setQuery] = useState("");
  const [mkeluar, setMkeluar] = useState(false);
  useEffect(() => {
    getGolongan();
  }, []);

  useEffect(() => {
    if (sgolongan !== null) {
      getData();
    }
  }, [sgolongan, status, page]);

  useEffect(() => {
    if (sgolongan !== null) {
      if (data.length === 0) {
        getData();
      }
    }
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      if (sgolongan !== null) {
        setData([]);
        setTotal(0);
        getData();
      }
    }, [sgolongan])
  );

  const onRefresh = React.useCallback(() => {
    //setRefreshing(true);
    //getData();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getData();
  //   }, []),
  // );

  function getGolongan() {
    axios({
      method: "GET",
      url: conf.url + "data_golongan",
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.log.Status == 200) {
          setGolongan(res.data.log.Pages);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function getData() {
    setLoading(true);
    const fd = new FormData();
    if (sgolongan !== null) {
      fd.append("kode_golongan", sgolongan);
    }

    fd.append(
      "kode_skpd",

      user.kodeurusan +
        "." +
        user.kodesuburusan +
        "." +
        user.kodeorganisasi +
        "." +
        user.kodeunit +
        "." +
        user.kodesubunit
    );
    fd.append("is", status);
    fd.append("query", query);

    axios({
      method: "POST",
      url: conf.url + "kib/kib_golongan?page=" + page,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.Status == 200) {
          setTotal(res.data.data.total);
          const b = [...data, ...res.data.data.data];
          setData(b);
          setPagelas(res.data.data.last_page + 1);

          setLoading(false);
          setRefreshing(false);
        } else {
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        setRefreshing(false);
        console.log(e);
      });
  }

  async function getQuery() {
    setLoading(true);
    const fd = new FormData();
    if (sgolongan !== null) {
      fd.append("kode_golongan", sgolongan);
    }

    fd.append(
      "kode_skpd",

      user.kodeurusan +
        "." +
        user.kodesuburusan +
        "." +
        user.kodeorganisasi +
        "." +
        user.kodeunit +
        "." +
        user.kodesubunit
    );
    fd.append("is", status);
    fd.append("query", query);

    axios({
      method: "POST",
      url: conf.url + "kib/kib_golongan",
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.Status == 200) {
          setTotal(res.data.data.total);

          setData(res.data.data.data);
          //setPagelas(res.data.data.last_page + 1);

          setLoading(false);
          setRefreshing(false);
        } else {
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        setRefreshing(false);
        console.log(e);
      });
  }

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  console.log(page + "/" + pagelas);
  console.log(data);
  return (
    <NativeBaseProvider>
      <Header tit="Daftar Aset" nv={navigation} conf={conf} />
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
                }}
              >
                Batal
              </Button>
              <Button
                colorScheme="indigo"
                onPress={() => {
                  setMkeluar(false);
                  // signOut();
                  fetch(conf.url + "auth/logout", {
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + user.access_token,
                    },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      if (json.status) {
                        signOut();
                      }
                    })
                    .catch((error) => {
                      if (typeof error.json === "function") {
                        error
                          .json()
                          .then((jsonError) => {
                            console.log("Json error from API");
                            console.log(jsonError);
                          })
                          .catch((genericError) => {
                            console.log("Generic error from API");
                            console.log(error.statusText);
                          });
                      } else {
                        console.log("Fetch error");
                        console.log(error);
                      }
                    });
                }}
              >
                Ya
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Box h={"80%"} my={6} overflow={"visible"}>
        <Select
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Pilih jenis"
          mx={4}
          mb={4}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => {
            setData([]);
            setSgolongan(itemValue);
          }}
        >
          {golongan.map((v, i) => (
            <Select.Item key={i} label={v.urai} value={v.kodegolongan} />
          ))}
        </Select>
        {sgolongan !== null && (
          <Input
            mx={4}
            mb={4}
            value={query}
            onChangeText={(v) => setQuery(v)}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="magnify" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              query !== "" ? (
                <Button
                  backgroundColor={conf.color}
                  size="xs"
                  rounded="none"
                  w="1/6"
                  h="full"
                  onPress={() => {
                    setData([]);
                    setPage(1);
                    setTotal(0);
                    Keyboard.dismiss();
                  }}
                >
                  Cari
                </Button>
              ) : null
            }
            placeholder="Cari"
          />
        )}
        <Radio.Group
          name="exampleGroup"
          defaultValue="2"
          accessibilityLabel="pick a size"
          onChange={(v) => {
            setData([]);
            setPage(1);
            setStatus(v);
          }}
        >
          <Stack
            mx={4}
            mb={4}
            direction={{
              base: "row",
              md: "row",
            }}
            alignItems={{
              base: "center",
              md: "center",
            }}
            space={4}
          >
            <Radio value="2" size="sm" my={1}>
              Belum terisi
            </Radio>
            <Radio value="1" size="sm" my={1}>
              Sudah terisi
            </Radio>
          </Stack>
        </Radio.Group>
        {data.length !== 0 && (
          <Text mx={4} mb={4}>
            Data ditampilkan {data.length}/{total}
          </Text>
        )}
        <Divider mb={6} />
        {loading === false && data.length === 0 && (
          <Text alignSelf={"center"}>Data Kosong</Text>
        )}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          onEndReached={page == pagelas ? null : handleLoadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              onPress={() => {
                const x = golongan.filter((obj) => {
                  return obj.kodegolongan === sgolongan;
                });
                console.log(x);
                navigation.navigate("Tambah", {
                  kib: item.kodekib,
                  golongan: x[0].identifier,
                  tit: item.uraibarang,
                });
              }}
            >
              <Box mx={4}>
                <HStack justifyContent={"space-between"}>
                  <Text bold>{index + 1 + "."}</Text>
                  <Text bold>KIB {item.kodekib}</Text>
                </HStack>
                <Divider my={2} />
                <Text italic>
                  {item.kodeurusan +
                    "." +
                    item.kodesuburusan +
                    "." +
                    item.kodeorganisasi +
                    "." +
                    item.kodeunit +
                    "." +
                    item.kodesubunit}
                </Text>
                <Text>{item.uraibarang}</Text>
                <Text>
                  {item.nilaibarang !== null
                    ? formatRupiah(item.nilaibarang)
                    : null}
                </Text>
                <Divider my={2} />
                <HStack>
                  <Icon
                    as={<MaterialCommunityIcons name="map-marker" />}
                    size={5}
                    color={item.lokasi === null ? "gray.500" : "red.500"}
                  />
                  <Icon
                    as={<MaterialCommunityIcons name="image" />}
                    size={5}
                    color={item.file === null ? "gray.500" : "blue.500"}
                  />
                  {status === "1" ? (
                    <Icon
                      as={<MaterialCommunityIcons name="check-bold" />}
                      size={5}
                      color="green.500"
                    />
                  ) : (
                    <Icon
                      as={<MaterialCommunityIcons name="close-box-outline" />}
                      size={5}
                      color="gray.500"
                    />
                  )}
                </HStack>
              </Box>
              <Divider h={6} mt={4} mb={6} />
            </Pressable>
          )}
        />{" "}
        {loading && <Spinner size={"lg"} color={conf.color} />}
      </Box>
    </NativeBaseProvider>
  );
}
