import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/berita.style";
import HTML from "react-native-render-html";
import { decode } from "html-entities";

export default class BeritaEntry extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  get image() {
    const { data } = this.props;

    let thumb = data.thumb.replace("http:", "https:");

    // console.log('thumb', thumb);
    // thumb = 'https://m.kalteng.go.id/files/banner/02012019070656_1_jembatan-susur-sungai-kahayan-kalimantan-tengah.jpg';

    return (
      <ImageBackground style={styles.image} resizeMode="contain">
        <Image source={{ uri: thumb }} style={styles.image} />
      </ImageBackground>
    );
  }

  render() {
    const { data } = this.props;

    const title = (
      <Text style={[styles.title]} numberOfLines={2}>
        {data.judul}
      </Text>
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.props.navigation.navigate("Bacaberita", data);
        }}
      >
        {/* <View style={styles.shadow} /> */}
        <View style={[styles.imageContainer]}>
          {this.image}
          {/* <View style={[styles.radiusMask, styles.radiusMaskEven]} /> */}
        </View>
        <View style={[styles.textContainer]}>
          {title}
          <Text style={[styles.subtitle]} numberOfLines={2}>
            {data.tanggal}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
