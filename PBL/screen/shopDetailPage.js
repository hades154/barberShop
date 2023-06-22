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
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../components/colors";
import { getBarbershopById } from "../api";
import ServiceCard from "../components/serviceCard";

const DetailPage = ({ navigation, route }) => {
  const shopID = route.params.id;
  const [shop, setShop] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopData = await getBarbershopById(shopID);
        setShop(shopData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopData();
  }, []);

  const handleServiceSelection = (service) => {
    const isSelected = selectedServices.some(
      (selected) => selected.serviceName === service.serviceName
    );
    if (isSelected) {
      const updatedServices = selectedServices.filter(
        (selected) => selected.serviceName !== service.serviceName
      );
      setSelectedServices(updatedServices);
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <View>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
              console.log(item.serviceName);
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
        <Text>
          Các dịch vụ bạn đã chọn:{" "}
          {selectedServices.map((service) => service.serviceName).join(", ")}
        </Text>
        <Text></Text>
        <Text>
          Tổng tiền dịch vụ:{" "}
          {selectedServices.reduce(
            (sum, service) => sum + service.servicePrice,
            0
          )}{" "}
          VND
        </Text>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Booking", {
              shopID: shopID,
              shopName: shop?.barberShop?.name,
              selectedServices: selectedServices,
              totalPrice: selectedServices.reduce(
                (sum, service) => sum + service.servicePrice,
                0
              ),
            })
          }
        >
          <Text style={styles.buttonText}>Book Now</Text>
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
    paddingTop: 35,
    paddingBottom:5,
    backgroundColor:'#669966',
  },
  backButton: {
    marginRight: 30,
  },
  backButtonIcon: {
    fontSize: 24,
    color: "#669966",
  },
});

export default DetailPage;
