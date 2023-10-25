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
  View,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  processColor,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Get, Post } from "../common/Req";
import { LoadMoreFlatlist } from "react-native-load-more-flatlist";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";
import { LineChart } from "react-native-chart-kit";
import Header from "../common/Header";
import { BarChart } from "react-native-charts-wrapper";

export default function Chart({ route, navigation }) {
  const { conf, user } = route.params;
  const { signOut } = React.useContext(AuthContext);

  const [mskpd, setMskpd] = useState(false);
  const [mkeluar, setMkeluar] = useState(false);

  const [data, setData] = useState([{}, {}, {}]);

  const [dbar, setDbar] = useState({
    legend: {
      enabled: true,
      textSize: 14,
      form: "SQUARE",
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      wordWrapEnabled: true,
    },
    data: {
      dataSets: [
        {
          values: [5, 40, 77, 81, 43],
          label: "Company A",
          config: {
            drawValues: false,
            colors: [processColor("red")],
          },
        },
        {
          values: [40, 5, 50, 23, 79],
          label: "Company B",
          config: {
            drawValues: false,
            colors: [processColor("blue")],
          },
        },
        {
          values: [10, 55, 35, 90, 82],
          label: "Company C",
          config: {
            drawValues: false,
            colors: [processColor("green")],
          },
        },
        {
          values: [10, 55, 35, 90, 82],
          label: "Company C",
          config: {
            drawValues: false,
            colors: [processColor("green")],
          },
        },
        {
          values: [10, 55, 35, 90, 82],
          label: "Company C",
          config: {
            drawValues: false,
            colors: [processColor("green")],
          },
        },
      ],
      config: {
        barWidth: 0.2,
        group: {
          fromX: 0,
          groupSpace: 0.1,
          barSpace: 0.1,
        },
      },
    },
    xAxis: {
      valueFormatter: ["1990", "1991", "1992", "1993", "1994"],
      granularityEnabled: true,
      granularity: 1,
      axisMaximum: 5,
      axisMinimum: 0,
      centerAxisLabels: true,
    },

    marker: {
      enabled: true,
      markerColor: processColor("#F0C0FF8C"),
      textColor: processColor("white"),
      markerFontSize: 14,
    },
  });

  const w = Dimensions.get("screen").width;

  return (
    <NativeBaseProvider>
      <Header tit="Statistik" nv={navigation} conf={conf} />
      <View m={4} flex={1}>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 32} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Box flex={1}>
          <BarChart
            style={{ flex: 1 }}
            xAxis={dbar.xAxis}
            data={dbar.data}
            legend={dbar.legend}
            visibleRange={{ y: { min: 1, max: 5 } }}
            drawValueAboveBar={false}
            highlights={dbar.highlights}
            marker={dbar.marker}
          />
        </Box>
      </View>
    </NativeBaseProvider>
  );
}
