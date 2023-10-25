import React from "react";
import { Box, Heading, HStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Header({ nv, conf = false, tit, left = true }) {
  return (
    <Box bg={conf.color ? conf.color : "red.400"}>
      <HStack px={4} alignItems={"center"} h={16}>
        {left ? (
          <TouchableOpacity onPress={() => nv.goBack()}>
            <Icon
              size={"2xl"}
              color="white"
              as={MaterialCommunityIcons}
              name={"arrow-left"}
            />
          </TouchableOpacity>
        ) : null}
        <Heading color={"white"} ml={4} maxWidth={300} numberOfLines={1}>
          {tit}
        </Heading>
      </HStack>
    </Box>
  );
}
