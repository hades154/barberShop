import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../components/colors";
import { getBarbershopById } from "../api";
import ServiceCard from "../components/serviceCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeSalon = ({ navigation, route }) => {
  const [shopID, setShopID] = useState("");
  const [shop, setShop] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  
  useEffect(() => {
    AsyncStorage.getItem("userData").then((res) => {
      const cvUserData = JSON.parse(res);
      setShopID(cvUserData.name);
      console.log(cvUserData.name);
    });
    const fetchShopData = async () => {
      try {
        const shopData = await getBarbershopById(shopID);
        setShop(shopData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopData();
  }, [shopID]);

  const handleServiceSelection = (service) => {

     if (selectedServices.length === 0) {
       // Chưa có dịch vụ nào được chọn, thêm dịch vụ mới vào danh sách
       setSelectedServices([service]);
     } else {
       const isSelected = selectedServices.some(
         (selected) => selected.serviceName === service.serviceName
       );
       if (isSelected) {
         // Đã chọn dịch vụ này, bỏ chọn nó
         setSelectedServices([]);
       } else {
         // Chọn dịch vụ mới, thay thế dịch vụ trước đó
         setSelectedServices([service]);
       }
     }
  };

  return (
    <View>
      <ImageBackground
        style={{ aspectRatio: 5 / 2, height: 170 }}
        source={{
          uri: shop?.barberShop?.avatar,
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            height: 130,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 6,
            top: 140,
            left: 20,
            width: "82%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Tên shop: {shop?.barberShop?.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 16 }}>
                SĐT: {shop?.barberShop?.contact}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "black",
                  marginTop: 4,
                }}
              >
                Thành phố: {shop?.barberShop?.city}
              </Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "#ffc40c",
                padding: 10,
                borderRadius: 6,
                marginRight: 10,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "500", textAlign: "center" }}
              >
                CONTACT
              </Text>
            </Pressable>
          </View>
          <Text style={{ marginTop: 8, fontSize: 16, fontWeight: "500" }}>
            Địa chỉ: {shop?.barberShop?.address}
          </Text>
        </Pressable>
      </ImageBackground>

      <View style={{ marginTop: 110 }}>
        {shop && (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={shop?.services}
            renderItem={({ item }) => {
              return (
                <ServiceCard
                  key={item.serviceName}
                  service={item}
                  onPress={() => handleServiceSelection(item)}
                  isSelected={selectedServices.some(
                    (selected) => selected.serviceName === item.serviceName
                  )}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      {/* Print selected service names */}
      <View style={styles.bottomBar}>
        <Text></Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (selectedServices.length > 0) {
              navigation.navigate("EditScreen", {
                shopID: shopID,
                shopName: shop?.barberShop?.name,
                selectedServices: selectedServices,
              });
            } else {
              navigation.navigate("AddServiceScreen", {
                shopID: shopID,
                shopName: shop?.barberShop?.name,
              });
            }
          }}
        >
          <Text style={styles.buttonText}>
            {selectedServices.length > 0 ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 0,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.35,
    marginTop: 0,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 0,
    paddingTop: 10,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 40,
  },
  borderBtnText: {
    fontWeight: "bold",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  priceTag: {
    marginVertical: 10,
    backgroundColor: COLORS.green,
    width: 130,
    paddingVertical: 5,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    padding: 16,
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.green,
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonIcon: {
    fontSize: 24,
    color: "white",
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: COLORS.green,
  },
  editButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "orange",
  },
});

export default HomeSalon;
