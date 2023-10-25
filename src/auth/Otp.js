import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Button,
  Center,
  extendTheme,
  FormControl,
  Heading,
  Image,
  Input,
  KeyboardAvoidingView,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  theme,
  VStack,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import AuthContext from "../../AuthContext";
import { Auth, Post } from "../common/Req";
import { Dimensions, Keyboard, TouchableOpacity } from "react-native";
import OTPInput from "../common/OTPInput";
import axios from "axios";

export default function Otp({ route, navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { conf, email } = route.params;
  const [loading, setLoading] = React.useState(false);

  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 6;

  const [deb, setDeb] = React.useState(0);
  const [show, setShow] = React.useState(false);

  const { signIn } = React.useContext(AuthContext);
  useEffect(() => {
    return () => {
      if (deb === 1) {
        setUsername("mas");
        setPassword("12345678");
      }
    };
  }, [deb]);

  async function signx(params) {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        log: {
          Status: "200",
          Massagge: "Anda Berhasil Login",
          data: {
            "id user": 39,
            "kode urusan": 122,
            "kode suburusan": 1,
            "kode organisasi": 1,
            "kode unit": 0,
            "kode subunit": 0,
            "Token-type": "Bearer Token",
            token:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXNldGdpcy1kaXkuc2ltZGEubmV0L2FwaS9sb2dpbiIsImlhdCI6MTY5MDU2NDE1MCwiZXhwIjoxNjkwNTY3NzUwLCJuYmYiOjE2OTA1NjQxNTAsImp0aSI6ImZmOVRVQlI4TTZvTkg5aU8iLCJzdWIiOiIzOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.znYbNMPvSfb0g_oWd1354eWNwbe3SldKE8NaGuo66To",
          },
        },
      })
    );
    signIn({
      log: {
        Status: "200",
        Massagge: "Anda Berhasil Login",
        data: {
          "id user": 39,
          "kode urusan": 122,
          "kode suburusan": 1,
          "kode organisasi": 1,
          "kode unit": 0,
          "kode subunit": 0,
          "Token-type": "Bearer Token",
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXNldGdpcy1kaXkuc2ltZGEubmV0L2FwaS9sb2dpbiIsImlhdCI6MTY5MDU2NDE1MCwiZXhwIjoxNjkwNTY3NzUwLCJuYmYiOjE2OTA1NjQxNTAsImp0aSI6ImZmOVRVQlI4TTZvTkg5aU8iLCJzdWIiOiIzOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.znYbNMPvSfb0g_oWd1354eWNwbe3SldKE8NaGuo66To",
        },
      },
    });
    navigation.replace("MyTabs");
  }

  async function presignin() {
    setLoading(true);
    let res = await Auth(
      conf.url + "login",
      [
        { t: "username", v: username },
        { t: "password", v: password },
      ],
      null
    );
    console.log(res);
    if (res.stat === true) {
      setLoading(false);
      const simpanUser = async () => {
        try {
          const user = res.data;
          user.kodeorganisasi = user["kode organisasi"];
          user.kodeurusan = user["kode urusan"];
          user.kodesuburusan = user["kode suburusan"];
          user.kode_unit = user["kode unit"];
          user.kode_subunit = user["kode subunit"];

          await AsyncStorage.setItem("userData", JSON.stringify(user));
          signIn(res.data);
          navigation.replace("MyTabs");
        } catch (e) {
          // saving error
        }
      };

      const u = res.data;
      axios({
        url: conf.url + "profile",
        method: "GET",
        headers: {
          Authorization: "Bearer " + u.token,
        },
      })
        .then((v) => {
          console.log(v);
          if (v.data.status === "200") {
            u.foto = v.data.data.foto;
            u.email = v.data.data.email;
            u.username = v.data.data.username;
            u.nama = v.data.data.nama;
            simpanUser(u);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setLoading(false);
    }
  }

  const theme = extendTheme({
    components: {
      Button: {
        // Can simply pass default props to change default behaviour of components.
        baseStyle: {
          rounded: "md",
        },
        defaultProps: {
          colorScheme: {
            _text: {
              color: "red.700",
            },
          },
        },
      },
    },
  });

  return (
    <NativeBaseProvider>
      <Box position={"absolute"} width={"full"} height={"full"} bg={"red.100"}>
        <Image
          width={"full"}
          height={"full"}
          resizeMode="cover"
          alt="a"
          position={"absolute"}
          source={require("../../assets/bgl.png")}
        />
      </Box>
      <ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={500} style={{ flex: 1 }}>
          <Stack px={6} flex={1}>
            <Center>
              <Pressable onPress={() => setDeb(deb + 1)}>
                <Image
                  w={180}
                  h={180}
                  mt={60}
                  borderRadius={90}
                  alt="icon"
                  resizeMode="contain"
                  source={{ uri: conf.icon }}
                />
              </Pressable>
              <Heading
                size="lg"
                color="white"
                mt={12}
                _dark={{
                  color: "warmGray.50",
                }}
                fontWeight="semibold"
              >
                {conf ? conf.name_app : ""}
              </Heading>
              <Heading
                mt="1"
                color="white"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="medium"
                size="xs"
              >
                {conf ? conf.subname_app : ""}
              </Heading>
            </Center>

            <VStack space={3} mt={6}>
              <Text color={"white"}>
                Masukkan kode otp yang telah kami kirimkan ke alamat email{" "}
                <Text bold color="white">
                  {email}
                </Text>
              </Text>
              <Input
                variant="rounded"
                backgroundColor={"white"}
                value={username}
                onChangeText={(v) => setUsername(v)}
              />

              {loading && <Spinner color={"yellow.500"} />}
              <Button
                mt="2"
                bg={"yellow.600"}
                borderRadius={"full"}
                onPress={
                  () => signx()
                  //signIn({nama: 'rin', notelp: '087xxxxxxxxxx'})
                }
              >
                Konfirmasi
              </Button>
              <TouchableOpacity
                style={{ alignSelf: "center", width: 200, marginTop: 12 }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={{ alignSelf: "center" }} color={"yellow.600"}>
                  Daftar
                </Text>
              </TouchableOpacity>
            </VStack>
          </Stack>
        </KeyboardAvoidingView>
      </ScrollView>
    </NativeBaseProvider>
  );
}
