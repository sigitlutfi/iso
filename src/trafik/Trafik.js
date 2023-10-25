import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Heading,
  Image,
  Modal,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../common/Header";
import { TouchableOpacity } from "react-native";

export default function Trafik({ route, navigation }) {
  const { conf, user } = route.params;
  const [mlogin, setMlogin] = useState(false);

  const [trafik, setTrafik] = useState([
    {
      tag: "Kecelakaan",
      jalan: "Jalan Patuk",
      detail: "Kecelakaan di simpang tiga bunder",
      tanggal: "12 Juli 2024",
      time: "Baru saja",
      status: 1,
      foto: "https://img.okezone.com/content/2022/04/22/338/2583701/sejumlah-ruas-jalan-di-jakarta-macet-parah-begini-penampakannya-m1zln3mC5H.jpg",
    },
    {
      tag: "Kemacetan",
      jalan: "Jalan Tamansiswa",
      detail: "Kemacetan panjang di simpang empat tungkak",
      tanggal: "12 Juli 2024",
      time: "12 Menit yang lalu",
      foto: "https://img.okezone.com/content/2022/04/22/338/2583701/sejumlah-ruas-jalan-di-jakarta-macet-parah-begini-penampakannya-m1zln3mC5H.jpg",
    },
    {
      tag: "Kemacetan",
      jalan: "Jalan Mamiaw",
      detail: "Kemacetan panjang di simpang empat mamiaw",
      tanggal: "12 Juli 2024",
      time: "13:00 WIB",
      foto: "https://img.okezone.com/content/2022/04/22/338/2583701/sejumlah-ruas-jalan-di-jakarta-macet-parah-begini-penampakannya-m1zln3mC5H.jpg",
    },
    {
      tag: "Kemacetan",
      jalan: "Jalan Mamiaw",
      detail: "Kemacetan panjang di simpang empat mamiaw",
      tanggal: "12 Juli 2024",
      time: "13:00 WIB",
      foto: "https://img.okezone.com/content/2022/04/22/338/2583701/sejumlah-ruas-jalan-di-jakarta-macet-parah-begini-penampakannya-m1zln3mC5H.jpg",
    },
    {
      tag: "Kemacetan",
      jalan: "Jalan Mamiaw",
      detail: "Kemacetan panjang di simpang empat mamiaw",
      tanggal: "12 Juli 2024",
      time: "13:00 WIB",
      foto: "https://img.okezone.com/content/2022/04/22/338/2583701/sejumlah-ruas-jalan-di-jakarta-macet-parah-begini-penampakannya-m1zln3mC5H.jpg",
    },
  ]);

  return (
    <NativeBaseProvider>
      <Header tit="Trafik" conf={conf} nv={navigation} />
      <Modal isOpen={mlogin} onClose={() => setMlogin(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Peringatan !</Modal.Header>
          <Modal.Body>
            <Text>Anda belum login !</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setMlogin(false);
                }}
              >
                Batal
              </Button>
              <Button
                bg={conf.color}
                onPress={() => {
                  setMlogin(false);
                  navigation.replace("SignIn");
                }}
              >
                Login
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Stack px={4} mt={4} flex={1}>
        <FlatList
          data={trafik}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("LihatTrafik", { data: item })}
            >
              <Box
                bg={item.status === 1 ? "red.600" : "green.600"}
                px={4}
                py={2}
                borderRadius={"lg"}
                mb={4}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDir={"row"}
              >
                <Stack>
                  <Text italic color={"white"} fontSize={"2xs"}>
                    {item.tanggal}
                  </Text>
                  <Heading color={"white"} size={"md"}>
                    {item.tag}
                  </Heading>
                  <Text color={"white"} bold>
                    {item.jalan}
                  </Text>
                  <Divider my={1} />
                  <Text color={"white"} maxWidth={200}>
                    {item.detail}
                  </Text>
                </Stack>
                <Image
                  borderRadius={"lg"}
                  size={"md"}
                  alt="s"
                  alignSelf={"flex-end"}
                  source={{
                    uri: item.foto,
                  }}
                />
                <Text
                  position={"absolute"}
                  right={4}
                  top={2}
                  bold
                  color={"white"}
                  fontSize={"xs"}
                >
                  {item.time}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={{ alignSelf: "flex-end", width: "100%" }}
          onPress={() => {
            if (user !== null) {
              navigation.navigate("TambahTrafik");
            } else {
              setMlogin(true);
            }
          }}
        >
          <HStack
            bg={"blue.700"}
            width={"100%"}
            my={4}
            px={6}
            py={4}
            borderRadius={"lg"}
            alignItems={"center"}
          >
            <Image
              alt="a"
              style={{ width: 54, height: 54 }}
              source={require("../../assets/con.png")}
            />
            <Stack ml={4}>
              <Heading color={"white"} bold size={"md"}>
                Anda ingin berpartisipasi mengirim keadaan trafik ?
              </Heading>
              <Text color={"white"} bold>
                Klik disini !
              </Text>
            </Stack>
          </HStack>
        </TouchableOpacity>
      </Stack>
    </NativeBaseProvider>
  );
}
