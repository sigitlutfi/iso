import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

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
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import AuthContext from "../../AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Get, Post } from "../common/Req";
import { LoadMoreFlatlist } from "react-native-load-more-flatlist";
import axios from "axios";

export default function Scan({ route, navigation }) {
  return (
    <NativeBaseProvider>
      <QRCodeScanner
        onRead={(v) => console.log(v)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}></Text>Arahkan ke QR Code
          </Text>
        }
        bottomContent={
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
        }
      />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});
