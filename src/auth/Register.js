import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Button,
  Center,
  Checkbox,
  CheckIcon,
  extendTheme,
  FormControl,
  Heading,
  Image,
  Input,
  KeyboardAvoidingView,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  theme,
  Toast,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../../AuthContext";
import { Get, Post } from "../common/Req";

export default function Register({ route, navigation }) {
  const { conf } = route.params;
  const [loading, setLoading] = useState(false);

  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kec, setKec] = useState([]);
  const [desa, setDesa] = useState([]);

  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [notelp, setNotelp] = useState("");
  const [nik, setNik] = useState("");
  const [jk, setJk] = useState(null);
  const [alamat, setAlamat] = useState("");
  const [provinsis, setProvinsis] = useState(conf.default_province_code);
  const [kotas, setKotas] = useState(null);
  const [kecs, setKecs] = useState(null);
  const [desas, setDesas] = useState(null);

  // const [password, setPassword] = useState('password');
  // const [repassword, setRepassword] = useState('password');
  // const [name, setName] = useState('tes1');
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('3@gmail.com');
  // const [notelp, setNotelp] = useState('123412340003');
  // const [nik, setNik] = useState('1234123412340003');
  // const [jk, setJk] = useState('L');
  // const [alamat, setAlamat] = useState('tes');
  // const [provinsis, setProvinsis] = useState(conf.default_province_code);
  // const [kotas, setKotas] = useState('8204');
  // const [kecs, setKecs] = useState('820405');
  // const [desas, setDesas] = useState('8204052004');

  const [show, setShow] = useState(false);
  const [rshow, setRshow] = useState(false);
  const [deb, setDeb] = React.useState(0);
  const [cek, setCek] = useState(false);

  const { signIn } = React.useContext(AuthContext);
  useEffect(() => {
    return () => {
      if (deb === 1) {
        setNip("197803282005011014");
        setPassword("a");
      }
    };
  }, [deb]);

  async function presignin() {
    setLoading(true);
    let res = await Post(conf.url + "login", [
      { t: "nip", v: nip },
      { t: "password", v: password },
    ]);

    if (res.data.status === true) {
      //console.log(res);
      setLoading(false);
      const simpanUser = async () => {
        try {
          await AsyncStorage.setItem("userData", JSON.stringify(res.data.data));
          signIn(res.data.data);
        } catch (e) {
          // saving error
        }
      };
      await simpanUser();
    } else {
      setLoading(false);
    }
  }

  function submit() {
    setLoading(true);
    const form = new FormData();
    form.append("password_confirmation", repassword);
    form.append("name", name);
    form.append("password", password);
    form.append("nik", nik);
    form.append("gender", jk);
    form.append("email", email);
    form.append("phone", notelp);
    form.append("province_code", provinsis);
    form.append("regency_code", kotas);
    form.append("district_code", kecs);
    form.append("village_code", desas);
    form.append("address", alamat);
    //console.log(form);
    axios({
      method: "POST",
      url: conf.url + "auth/register",
      data: form,

      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((json) => {
        //return json.movies;
        setLoading(false);
        if (json.status === 200) {
          Toast.show({ title: "Berhasil" });
          Get(conf.url + "auth/profile", json.data.data.access_token).then(
            (v) =>
              navigation.replace("Otp", {
                id: v.data.data.id,
                notelp: notelp,
                token: json.data.data.access_token,
              })
          );
        } else {
          Toast.show({ title: "Gagal" });
        }
        //console.log(json);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response !== undefined) {
          Toast.show({ title: error.response.data.message });
        } else {
          Toast.show({ title: "Down" });
        }
      });
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={500} style={{ flex: 1 }}>
          <Image
            position={"absolute"}
            height={150}
            width={"full"}
            resizeMode="stretch"
            source={require("../../assets/bg.png")}
          />
          <Stack px={6} flex={1}>
            <VStack space={3} mt="5">
              <Heading mt={4} color={"white"} mb={24}>
                Registrasi
              </Heading>

              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input value={email} onChangeText={(v) => setEmail(v)} />
              </FormControl>

              {loading && <Spinner color={conf ? conf.color : "red.700"} />}
              <Button
                mt="2"
                mb={4}
                bg={conf ? conf.color : "red.700"}
                onPress={() => navigation.navigate("Otp")}
              >
                Daftar
              </Button>
            </VStack>
          </Stack>
        </KeyboardAvoidingView>
      </ScrollView>
    </NativeBaseProvider>
  );
}
