import Axios from "axios";
import {
  Box,
  HStack,
  Heading,
  Icon,
  NativeBaseProvider,
  Toast,
  Text,
  Button,
  Modal,
  Stack,
} from "native-base";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BeritaEntry from "./beritaentry";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

export default class ListBerita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_berita: [
        {
          ID_berita: "878",
          judul: "Tess",
          isi: "&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;ri Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.-produk unggulannya. &lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;&amp;ldquo;Kegiatan ini berlangsung selama satu hari bertempat di badan jalan G.Obos tepatnya di depan Kantor Gubernur Kalimantan Tengah,&amp;rdquo; kata Kepala Dinas Dagperin Provinsi Kalteng Aster Bonawaty usai mengikuti acara pembukaan Festival Budaya Isen Mulang (FBIM), Selasa (17/5/2022).&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Disdagperin juga berpartisipasi dalam kegiatan karnaval budaya dengan mengusung tema &amp;ldquo;Bangga Buatan Indonesia&amp;rdquo;. Kegiatan Karnaval merupakan bagian dari rangkaian acara pembukaan FBIM 2022.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;&amp;ldquo;Tema yang kita angkat dalam karnaval budaya ini yaitu bangga buatan Indonesia, kita berharap IKM binaan dari Dekranasda ini mampu untuk turut serta dalam program nasional yakni bangga buatan Indonesia, kita juga nanti ada buka bazar industri kecil menengah, walaupun hanya satu hari acaranya tapi kita ingin memberikan kesempatan kepada pelaku IKM untuk memamerkan dan menjual hasil produk unggulannya,&amp;rdquo; tutur Aster.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Pihaknya menghimbau kepada seluruh masyarakat serta Aparatur Sipil Negara&lt;span class=&quot;Apple-converted-space&quot;&gt;&amp;nbsp; &lt;/span&gt;agar mengunjungi stand IKM dan berbelanja, karena dengan membeli produk IKM akan membantu roda perekonomian terus berjalan dan akan berdampak positif kepada para pengrajin.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Aster Bonawaty yang juga merupakan Ketua Harian Dewan Kerajinan Nasional Daerah (Dekranasda) Provinsi Kalteng mengatakan bahwa Dekranasda atas arahan langsung dari Ketua Dekranasda Provinsi Kalteng Ivo Sugianto Sabran turut serta berperan aktif dalam memeriahkan pagelaran Hari Jadi ke-65 Provinsi Kalteng dengan mendorong para IKM binaan untuk berpartisipasi memasarkan produk-produknya di stand gratis yang sudah disediakan.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;&amp;ldquo;Peran dekranasda tentu turut berpartisipasi dalam rangka mendukung budaya dan pembangunan Kalimantan Tengah, karena antara keduanya itu seiring dan sejalan dan disini peran Dekranasda ialah mendukung dan menampilkan program-program Dekranasda yang mendukung pemerintah,&amp;rdquo; pungkas Aster.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Gubernur Kalteng H. Sugianto Sabran didampingi Istri Ivo Sugianto Sabran yang juga merupakan Ketua Dekranasda Provinsi Kalteng membuka secara resmi FBIM Tahun 2022, bertempat di Bundaran Besar Palangka Raya. FBIM merupakan bagian dari rangkaian peringatan Hari Jadi ke-65 Provinsi Kalteng.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Ribuan masyarakat tumpah ruah memadati area Bundaran Besar Kota Palangka Raya untuk menghadiri acara pembukaan dan menyaksikan langsung karnaval budaya, yang vakum selama dua tahun dari kalender tahunan, dikarenakan pandemi covid 19. FBIM merupakan Festival Budaya terbesar di Kalteng yang menampilan beragam lomba dan pagelaran seni budaya. (ARP/Foto:Asef)&lt;/span&gt;&lt;/p&gt;",
          url: "http://m.kalteng.go.id/berita/read/878/meriahkan-hari-jadi-kalteng-disdagperin-fasilitasi-stand-gratis-untuk-ikm",
          tanggal: "17 Mei 2022 22:44",
          kategori: "Tess berita",
          gambar: "http://ms.kalteng.go.id/files/berita/17052022104815_0",
          thumb: "http://ms.kalteng.go.id/files/berita/thumb_17052022104815_0",
        },
        {
          ID_berita: "879",
          judul: "Tess",
          isi: "&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;ri Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.-produk unggulannya. &lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;&amp;ldquo;Kegiatan ini berlangsung selama satu hari bertempat di badan jalan G.Obos tepatnya di depan Kantor Gubernur Kalimantan Tengah,&amp;rdquo; kata Kepala Dinas Dagperin Provinsi Kalteng Aster Bonawaty usai mengikuti acara pembukaan Festival Budaya Isen Mulang (FBIM), Selasa (17/5/2022).&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Disdagperin juga berpartisipasi dalam kegiatan karnaval budaya dengan mengusung tema &amp;ldquo;Bangga Buatan Indonesia&amp;rdquo;. Kegiatan Karnaval merupakan bagian dari rangkaian acara pembukaan FBIM 2022.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;&amp;ldquo;Tema yang kita angkat dalam karnaval budaya ini yaitu bangga buatan Indonesia, kita berharap IKM binaan dari Dekranasda ini mampu untuk turut serta dalam program nasional yakni bangga buatan Indonesia, kita juga nanti ada buka bazar industri kecil menengah, walaupun hanya satu hari acaranya tapi kita ingin memberikan kesempatan kepada pelaku IKM untuk memamerkan dan menjual hasil produk unggulannya,&amp;rdquo; tutur Aster.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Pihaknya menghimbau kepada seluruh masyarakat serta Aparatur Sipil Negara&lt;span class=&quot;Apple-converted-space&quot;&gt;&amp;nbsp; &lt;/span&gt;agar mengunjungi stand IKM dan berbelanja, karena dengan membeli produk IKM akan membantu roda perekonomian terus berjalan dan akan berdampak positif kepada para pengrajin.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Aster Bonawaty yang juga merupakan Ketua Harian Dewan Kerajinan Nasional Daerah (Dekranasda) Provinsi Kalteng mengatakan bahwa Dekranasda atas arahan langsung dari Ketua Dekranasda Provinsi Kalteng Ivo Sugianto Sabran turut serta berperan aktif dalam memeriahkan pagelaran Hari Jadi ke-65 Provinsi Kalteng dengan mendorong para IKM binaan untuk berpartisipasi memasarkan produk-produknya di stand gratis yang sudah disediakan.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;&amp;ldquo;Peran dekranasda tentu turut berpartisipasi dalam rangka mendukung budaya dan pembangunan Kalimantan Tengah, karena antara keduanya itu seiring dan sejalan dan disini peran Dekranasda ialah mendukung dan menampilkan program-program Dekranasda yang mendukung pemerintah,&amp;rdquo; pungkas Aster.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Gubernur Kalteng H. Sugianto Sabran didampingi Istri Ivo Sugianto Sabran yang juga merupakan Ketua Dekranasda Provinsi Kalteng membuka secara resmi FBIM Tahun 2022, bertempat di Bundaran Besar Palangka Raya. FBIM merupakan bagian dari rangkaian peringatan Hari Jadi ke-65 Provinsi Kalteng.&lt;/span&gt;&lt;/p&gt;\r\n&lt;p class=&quot;p1&quot;&gt;&lt;span class=&quot;s1&quot;&gt;Ribuan masyarakat tumpah ruah memadati area Bundaran Besar Kota Palangka Raya untuk menghadiri acara pembukaan dan menyaksikan langsung karnaval budaya, yang vakum selama dua tahun dari kalender tahunan, dikarenakan pandemi covid 19. FBIM merupakan Festival Budaya terbesar di Kalteng yang menampilan beragam lomba dan pagelaran seni budaya. (ARP/Foto:Asef)&lt;/span&gt;&lt;/p&gt;",
          url: "http://m.kalteng.go.id/berita/read/879/gmdi-komunitas-milenial-bernafaskan-adat-dan-budaya-kalimantan-tengah",
          tanggal: "14 Agustus 2021 12:56",
          kategori: "Tess berita",
          gambar: "http://ms.kalteng.go.id/files/berita/15082021022335_0",
          thumb: "http://ms.kalteng.go.id/files/berita/thumb_15082021022335_0",
        },
      ],
      refreshing: false,
      mlogin: false,
      user: this.props.route.params.user,
      conf: this.props.route.params.conf,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: "Berita" });
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
      url: "https://m.kalteng.go.id/api/berita",
    }).then((res) => {
      // console.log(res.data);
      if (res.data.length) {
        //this.setState({ list_berita: res.data });
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
                Daftar Berita
              </Heading>
            </HStack>
          </HStack>
        </Box>

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
            <View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginTop: 15,
                }}
              >
                {this.state.list_berita.length
                  ? this.state.list_berita.map((item, i) => {
                      return (
                        <BeritaEntry
                          data={item}
                          key={i}
                          navigation={this.props.navigation}
                        />
                      );
                    })
                  : !this.state.refreshing && (
                      <Text style={{ alignSelf: "center" }}>Data kosong</Text>
                    )}
              </View>
            </View>
          </View>
        </ScrollView>
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
