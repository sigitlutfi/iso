import Axios from "axios";
import {
  Box,
  HStack,
  Heading,
  Icon,
  NativeBaseProvider,
  Toast,
  Text,
} from "native-base";
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import HTML, { RenderHTML } from "react-native-render-html";
import { decode } from "html-entities";
import Header from "../common/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Bacaberita extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.route.params,
      gambar: "",
      conf: this.props.route.params.conf,
    };
  }

  // static navigationOptions = {
  //     title: 'Home',
  // };

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.state.data.kategori });
    let gambar = this.state.data.gambar.replace("http:", "https:");
    this.setState({ gambar: gambar });
    // this.getListAgenda();
  }

  //   getListAgenda() {
  //     Axios({
  //       method: 'GET',
  //       url: 'https://giapps.simda.net/koperasi/agenda?skip=0&take=10',
  //       headers: {
  //         'gin-app-id': 'dcacbc8c-781b-4967-afd3-dc36387f7137',
  //       },
  //     }).then(res => {
  //       console.log(res.data.data);
  //       if (res.data.status == 200) {
  //         this.setState({
  //           listAgenda: res.data.data,
  //         });
  //       } else {
  //         Toast.show({text: 'DOWN', type: 'danger'});
  //       }
  //     });
  //   }

  render() {
    const { width } = Dimensions.get("screen");
    return (
      <NativeBaseProvider>
        <View style={{ flex: 1 }}>
          <Box bg={this.state.conf.color ? this.state.conf.color : "red.400"}>
            <HStack
              px={4}
              alignItems={"center"}
              h={16}
              justifyContent={"space-between"}
            >
              <HStack>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon
                    size={"2xl"}
                    color="white"
                    as={MaterialCommunityIcons}
                    name={"arrow-left"}
                  />
                </TouchableOpacity>

                <Heading
                  color={"white"}
                  ml={4}
                  maxWidth={300}
                  numberOfLines={1}
                >
                  Baca Berita
                </Heading>
              </HStack>
            </HStack>
          </Box>

          <ScrollView>
            <ImageBackground
              style={{
                width: Dimensions.get("window").width,
                backgroundColor: "gray",
              }}
              resizeMode="contain"
            >
              {this.state.gambar ? (
                <Image
                  style={{
                    width: "100%",
                    minHeight: 224,
                    maxHeight: 256,
                    alignSelf: "center",
                  }}
                  // resizeMode="contain"
                  source={{ uri: this.state.gambar }}
                  //   source={{
                  //     uri: Image.resolveAssetSource(
                  //       require('../../assets/image/banner_2.jpg'),
                  //     ).uri,
                  //   }}
                />
              ) : (
                <></>
              )}
            </ImageBackground>
            <Text
              style={{
                fontSize: 22,
                textTransform: "capitalize",
                marginTop: 22,
                marginHorizontal: 25,
                color: "#030303",
              }}
              numberOfLines={4}
            >
              {this.state.data.judul}
              {/* {'Rapat Akhir Bulan'} */}
            </Text>
            <Text
              style={{
                fontFamily: "GoogleSans-Regular",
                fontSize: 12,
                letterSpacing: 1,
                marginTop: 12,
                marginHorizontal: 25,
                color: "#030303",
              }}
              numberOfLines={2}
            >
              {this.state.data.tanggal + " - " + this.state.data.kategori}
            </Text>
            <View style={{ marginHorizontal: 25 }}>
              <RenderHTML
                //   source={{html: this.state.dummy}}
                contentWidth={width}
                source={{ html: decode(this.state.data.isi) }}
                tagsStyles={{ body: { color: "black", p: { color: "black" } } }}
              />
            </View>
          </ScrollView>
        </View>
      </NativeBaseProvider>
    );
  }
}
