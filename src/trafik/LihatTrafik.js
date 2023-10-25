import {
  Box,
  Divider,
  FlatList,
  HStack,
  Heading,
  Image,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../common/Header";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native";

export default function Trafik({ route, navigation }) {
  const { conf, data, user } = route.params;
  console.log(data);
  return (
    <NativeBaseProvider>
      <Header tit={data.jalan} conf={conf} nv={navigation} />

      <Stack px={4} mt={4} flex={1}>
        <Image
          borderRadius={"lg"}
          h={240}
          alt="s"
          source={{
            uri: data.foto,
          }}
        />
        <Text italic mt={2} fontSize={"xs"}>
          {data.tanggal + " - " + data.time}
        </Text>
        <Text bold fontSize={"2xl"}>
          {data.tag}
        </Text>
        <Text mt={2}>{data.detail}</Text>
        <Box
          height={140}
          width={380}
          zIndex={2}
          mt={4}
          alignSelf={"center"}
          borderRadius={"2xl"}
          overflow={"hidden"}
          bgColor={"red.100"}
        >
          <MapView
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 24,
              overflow: "hidden",
            }}
            showsUserLocation={true}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView>
        </Box>
      </Stack>
    </NativeBaseProvider>
  );
}
