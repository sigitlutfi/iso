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
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import AuthContext from "../../AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Get, Post } from "../common/Req";
import { LoadMoreFlatlist } from "react-native-load-more-flatlist";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";

export default function Lapor({ route, navigation }) {
  const { conf, user } = route.params;
  const { signOut } = React.useContext(AuthContext);

  const [mskpd, setMskpd] = useState(false);
  const [mkeluar, setMkeluar] = useState(false);

  const [data, setData] = useState([{}, {}, {}]);

  const w = Dimensions.get("screen").width;

  return (
    <NativeBaseProvider>
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Image
          height={300}
          alt=".."
          resizeMode="stretch"
          source={require("../../assets/bgx.png")}
        />
        <Stack position={"absolute"} px={4} pt={6} pb={12} top={4}>
          <Image
            w={65}
            h={65}
            borderRadius={90}
            alt="icon"
            resizeMode="contain"
            source={{ uri: conf.icon }}
          />
          <Heading color={"white"}>BNPP</Heading>
          <Heading color={"white"}>Dokumen</Heading>

          <Text color={"white"} mt={2} numberOfLines={2}>
            Unduh dan lihat dokumen
          </Text>
        </Stack>
      </HStack>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Pressable>
            <Box
              px={4}
              py={2}
              bg={"gray.200"}
              mx={4}
              borderRadius={"2xl"}
              mb={4}
              flexDir={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack>
                <Heading>File {index + 1}</Heading>
                <Text>2020 | Umum</Text>
              </Stack>
              <HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="file"
                  size={39}
                  color="indigo.500"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
                <Icon
                  as={MaterialCommunityIcons}
                  name="download"
                  color="yellow.500"
                  size={39}
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              </HStack>
            </Box>
          </Pressable>
        )}
      />
    </NativeBaseProvider>
  );
}
