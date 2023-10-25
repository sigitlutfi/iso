import {
  Avatar,
  Box,
  Button,
  Center,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import AuthContext from "../../AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Get, Post } from "../common/Req";
import { LoadMoreFlatlist } from "react-native-load-more-flatlist";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ route, navigation }) {
  const { conf, user } = route.params;
  const { signOut } = React.useContext(AuthContext);
  const [img, setImg] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagelas, setPagelas] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const [dterisi, setDterisi] = useState("Loading");
  const [dbterisi, setDbterisi] = useState("...");

  const [skpd, setSkpd] = useState(null);
  const [mskpd, setMskpd] = useState(false);
  const [mkeluar, setMkeluar] = useState(false);

  const [menu, setMenu] = React.useState([
    {
      id: 1,
      label: "Presensi",
      icon: "clock-fast",
      color: "blue.600",
    },
    { id: 2, label: "TPP", icon: "dns-outline", color: "orange.600" },
    { id: 3, label: "Uang Lauk Pauk", icon: "food", color: "green.600" },
    { id: 4, label: "Lembur", icon: "clock-plus", color: "rose.600" },
    { id: 5, label: "SPPD", icon: "rhombus-split", color: "fuchsia.600" },
    { id: 6, label: "Tata Naskah Dinas", icon: "mail", color: "cyan.600" },
  ]);

  const { gantiskpd } = React.useContext(AuthContext);

  useEffect(() => {
    getData();
    getDetail();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Below alert will fire every time when this screen is focused
      axios({
        url: conf.url + "profile",
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((v) => {
          console.log(v);
          if (v.status === 200) {
            setImg(v.data.data.foto);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, [])
  );

  useEffect(() => {
    getData();
  }, [page]);
  useEffect(() => {
    getTotal();
  }, [skpd]);

  async function getData() {
    setLoading(true);
    let res = await Get(
      conf.url + "skpd?page=" + page,

      user.token
    );
    console.log(res);
    if (res.data.Status === "200") {
      const b = [...data, ...res.data.data.data];
      setData(b);
      setPagelas(res.data.data.last_page + 1);
      setLoading(false);
      setRefreshing(false);
    } else {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function getTotal() {
    console.log(skpd);
    const fd = new FormData();
    if (skpd !== null) {
      fd.append(
        "kode_skpd",

        skpd.kodeurusan +
          "." +
          skpd.kodesuburusan +
          "." +
          skpd.kodeorganisasi +
          "." +
          skpd.kodeunit +
          "." +
          skpd.kodesubunit
      );
    } else {
      fd.append(
        "kode_skpd",

        user.kodeurusan +
          "." +
          user.kodesuburusan +
          "." +
          user.kodeorganisasi +
          "." +
          user.kode_unit +
          "." +
          user.kode_subunit
      );
    }
    axios({
      method: "POST",
      url: conf.url + "kib/total",
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => {
        if (res.data.Status == 200) {
          setDterisi(res.data.total_data_terisi);
          setDbterisi(res.data.total_data_belum_terisi);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function getDetail() {
    setData([]);
    setLoading(true);

    let res = await Post(
      conf.url + "skpd/skpd_user",
      [
        {
          t: "kode urusan",
          v: user.kodeurusan,
        },
        {
          t: "kode suburusan",
          v: user.kodesuburusan,
        },
        {
          t: "kode organisasi",
          v: user.kodeorganisasi,
        },
        {
          t: "kode_unit",
          v: user.kode_unit,
        },
        {
          t: "kode_subunit",
          v: user.kode_subunit,
        },
      ],
      user.token
    );
    console.log(res);
    if (res.data.data.Status === "200") {
      setDetail(res.data.data.data);
      const anu = user;
      anu.organisasi = res.data.data.data.organisasi;
      anu.kodeorganisasi = res.data.data.data.kodeorganisasi;
      anu.kodesubunit = res.data.data.data.kodesubunit;
      anu.kodeunit = res.data.data.data.kodeunit;
      anu.kodeurusan = res.data.data.data.kodeurusan;
      anu.kodesuburusan = res.data.data.data.kodesuburusan;
      handleganti(anu);
    } else {
      signOut();
    }
  }

  function handleganti(item) {
    setSkpd(item);
    const anu = user;
    anu.kodeorganisasi = item.kodeorganisasi;
    anu.kodesubunit = item.kodesubunit;
    anu.kodeunit = item.kodeunit;
    anu.kodeurusan = item.kodeurusan;
    anu.kodesuburusan = item.kodesuburusan;
    gantiskpd(anu);
    setMskpd(false);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  console.log(user);
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
                }}
              >
                Batal
              </Button>
              <Button
                colorScheme="indigo"
                onPress={() => {
                  setMkeluar(false);
                  // signOut();
                  signOut();
                }}
              >
                Ya
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={mskpd}
        onClose={() => {
          setMskpd(false);
          setPage(1);
        }}
      >
        <Box
          w={"90%"}
          h={"90%"}
          my={8}
          borderRadius={"3xl"}
          bg={"white"}
          px={4}
        >
          <HStack mt={6} mb={6} alignItems={"center"}>
            <Pressable onPress={() => setMskpd(false)}>
              <ChevronLeftIcon />
            </Pressable>
            <Text ml={2} bold>
              SKPD
            </Text>
          </HStack>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Box key={index} py="2" bg={"gray.100"}>
                <Pressable onPress={() => handleganti(item)}>
                  <Text bold>{item.organisasi}</Text>
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
                </Pressable>
              </Box>
            )}
            onEndReached={page == pagelas ? null : handleLoadMore}
            onEndReachedThreshold={0.4}
          />
          {loading && <Spinner />}
        </Box>
      </Modal>

      <Stack>
        <Box
          bg={conf.color ? conf.color : "red.700"}
          h={72}
          alignItems="center"
        >
          <Box>
            <Pressable onPress={() => navigation.navigate("Profil")}>
              <Avatar
                mt={9}
                bg="gray.400"
                size={"xl"}
                source={{
                  uri: img,
                }}
              ></Avatar>
              <Icon
                size={"lg"}
                position="absolute"
                bottom={0}
                right={-10}
                color="white"
                as={MaterialCommunityIcons}
                name="dots-vertical"
              />
            </Pressable>
          </Box>
          <Text textAlign={"center"} color="white">
            {detail !== null && detail.organisasi}
          </Text>

          <Text color="white">{detail !== null && user.username}</Text>
        </Box>
        <Box bg={"white"} mx={4} mt={-10} borderRadius="md">
          <VStack px={4} pb={6}>
            <Heading
              letterSpacing={"2xl"}
              color={"gray.500"}
              alignSelf={"center"}
              bold
            >
              {conf.name_app}
            </Heading>
            <Text
              letterSpacing={"2xl"}
              color={"gray.500"}
              alignSelf={"center"}
              bold
            >
              {conf.subname_app}
            </Text>
          </VStack>
          <Divider />

          <Text mt={2} mx={4} bold>
            SKPD
          </Text>
          <Pressable onPress={() => setMskpd(true)}>
            <Box
              borderWidth={1}
              borderRadius={"lg"}
              flexDir={"row"}
              mx={4}
              px={4}
              py={2}
              justifyContent={"space-between"}
            >
              <Text>
                {skpd !== null
                  ? skpd.organisasi +
                    " " +
                    skpd.kodeurusan +
                    "." +
                    skpd.kodesuburusan +
                    "." +
                    skpd.kodeorganisasi +
                    "." +
                    skpd.kodeunit +
                    "." +
                    skpd.kodesubunit
                  : "Pilih SKPD"}
              </Text>
              <ChevronDownIcon size="5" />
            </Box>
          </Pressable>

          <TouchableOpacity
            onPress={() => navigation.navigate("List")}
            disabled={dterisi === "Loading"}
          >
            <Center
              bg={dterisi === "Loading" ? "gray.500" : conf.color}
              h={24}
              mx={4}
              my={6}
              borderRadius="lg"
            >
              <Heading color={"white"} textAlign="center">
                Pengisian Kelengkapan Data {dterisi + "/" + dbterisi}
              </Heading>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
            <Center bg={"green.500"} h={24} mx={4} mb={6} borderRadius="lg">
              <Heading color={"white"}>Scan Aset</Heading>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMkeluar(true)}>
            <Center bg={"red.500"} h={24} mx={4} mb={6} borderRadius="lg">
              <Heading color={"white"}>Keluar</Heading>
            </Center>
          </TouchableOpacity>
        </Box>
      </Stack>
    </NativeBaseProvider>
  );
}
