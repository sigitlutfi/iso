import Axios from "axios";

import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  Platform,
} from "react-native";

import AgendaEntry from "../agenda/agendaentry";
import {
  Box,
  HStack,
  Heading,
  Icon,
  NativeBaseProvider,
  Toast,
  Text,
  Modal,
  Button,
  Stack,
} from "native-base";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

export default class ListAgenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_agenda: [
        {
          ID_agenda: "191",
          judul: "tes ",
          isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo quis imperdiet massa tincidunt nunc. ",
          url: "http://m.kalteng.go.id/agenda/read/191/vaksinasi-covid-19",
          tanggal: "17 Juni 2021 12:00 sd 17:00",
          tgl_mulai: "17",
          bln_mulai: "06",
          thn_mulai: "2021",
          tgl_selesai: "17",
          bln_selesai: "06",
          thn_selesai: "2021",
          koordinat: "-2.2179408,113.9200776",
          gambar: "http://m.kalteng.go.id/files/agenda/no.png",
        },
        {
          ID_agenda: "185",
          judul: "tes",
          isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo quis imperdiet massa tincidunt nunc. ",
          url: "http://m.kalteng.go.id/agenda/read/185/gelar-karya-kalteng",
          tanggal: "16 Maret 2019 11:00 sd 20 Maret 2019 04:00",
          tgl_mulai: "16",
          bln_mulai: "03",
          thn_mulai: "2019",
          tgl_selesai: "20",
          bln_selesai: "03",
          thn_selesai: "2019",
          koordinat: "-2.2268586,113.91201065",
          gambar: "http://m.kalteng.go.id/files/agenda/18032019093049_1_GK.jpg",
        },
      ],
      refreshing: false,
      mlogin: false,
      user: this.props.route.params.user,
      conf: this.props.route.params.conf,
    };
  }

  componentDidMount() {
    //this.getData();
  }

  onRefresh() {
    this.getData();
  }

  getData() {
    // API Berita
    this.setState({ refreshing: true });

    Axios({
      method: "GET",
      url: "https://m.kalteng.go.id/api/agenda",
    }).then((res) => {
      console.log(res.data);
      if (res.data.length) {
        this.setState({ list_agenda: res.data });
      } else {
        Toast.show({ text: "DOWN", type: "danger" });
      }

      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <NativeBaseProvider>
        <Modal
          isOpen={this.state.mlogin}
          onClose={() => this.setState({ mlogin: false })}
        >
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
                    this.setState({ mlogin: false });
                  }}
                >
                  Batal
                </Button>
                <Button
                  bg={this.state.conf.color}
                  onPress={() => {
                    this.setState({ mlogin: false });
                    this.props.navigation.replace("SignIn");
                  }}
                >
                  Login
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Box bg={this.state.conf.color ? this.state.conf.color : "red.400"}>
          <HStack
            px={4}
            alignItems={"center"}
            h={16}
            justifyContent={"space-between"}
          >
            <HStack>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  size={"2xl"}
                  color="white"
                  as={MaterialCommunityIcons}
                  name={"arrow-left"}
                />
              </TouchableOpacity>

              <Heading color={"white"} ml={4} maxWidth={300} numberOfLines={1}>
                Daftar Agenda
              </Heading>
            </HStack>
          </HStack>
        </Box>

        <View style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            <View>
              {/* Body */}
              <View
                style={{
                  backgroundColor: "white",
                  marginTop: 0,
                  borderTopStartRadius: 56,
                  borderTopEndRadius: 56,
                  // paddingTop: 64,
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    marginTop: 15,
                  }}
                >
                  {this.state.list_agenda.length ? (
                    this.state.list_agenda.map((item, i) => {
                      return (
                        <AgendaEntry
                          data={item}
                          key={i}
                          navigation={this.props.navigation}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              if (this.state.user !== null) {
                this.props.navigation.navigate("TambahAgenda");
              } else {
                this.setState({ mlogin: true });
              }
            }}
          >
            <HStack
              bg={"red.700"}
              mx={4}
              my={4}
              px={6}
              py={4}
              borderRadius={"lg"}
              alignItems={"center"}
            >
              <Image
                style={{ width: 54, height: 54 }}
                source={require("../../assets/con.png")}
              />
              <Stack ml={4} maxWidth={300}>
                <Heading color={"white"} bold size={"md"}>
                  Anda ingin berpartisipasi mengirim agenda ?
                </Heading>
                <Text color={"white"} bold>
                  Klik disini !
                </Text>
              </Stack>
            </HStack>
          </TouchableOpacity>
        </View>
      </NativeBaseProvider>
    );
  }
}

const style = StyleSheet.create({
  menuItemText: {
    fontFamily: "GoogleSans-Bold",
    fontSize: 12,
    color: "#d43939",
    marginTop: 4,
  },
});
