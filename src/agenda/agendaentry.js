import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import PropTypes from "prop-types";
import styles from "../styles/agenda.style";

export default class AgendaEntry extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  get image() {
    const { data } = this.props;

    let gambar = data.gambar.replace("http:", "https:");

    // console.log('gambar', gambar);
    // gambar = 'https://m.kalteng.go.id/files/banner/02012019070656_1_jembatan-susur-sungai-kahayan-kalimantan-tengah.jpg';

    return (
      <ImageBackground style={styles.image} resizeMode="contain">
        <Image source={{ uri: gambar }} style={styles.image} />
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
          this.props.navigation.navigate("BacaAgenda", data);
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
            {data.isi}
          </Text>
          <Text style={[styles.subtitle]} numberOfLines={2}>
            {data.tanggal}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
