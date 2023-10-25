import Axios from "axios";

import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  ImageBackground,
} from "react-native";
import HTML, { RenderHTML } from "react-native-render-html";
import { decode } from "html-entities";
import { Box, HStack, Heading, Icon, NativeBaseProvider } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class BacaAgenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.route.params,
      gambar: "",
      conf: this.props.route.params.conf,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Agenda - " + this.state.data.judul,
    });
    let gambar = this.state.data.gambar.replace("http:", "https:");
    this.setState({ gambar: gambar });
    // this.getListAgenda();
  }

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
                  Agenda
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
              {this.state.data.tanggal}
            </Text>
            <View style={{ marginHorizontal: 25 }}>
              <RenderHTML
                //   source={{html: this.state.dummy}}
                contentWidth={width}
                source={{ html: decode(this.state.data.isi) }}
              />
            </View>
          </ScrollView>
        </View>
      </NativeBaseProvider>
    );
  }
}
