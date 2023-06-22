import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { getBookingData } from "../api";
import { createAppointment } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const BookingScreen = ({ navigation }) => {
  const route = useRoute();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [barberName, setSelectedBarberName] = useState("");
  const [customerName, setCurrentUserName] = useState("");
  const [customerId, setCurrentUserId] = useState("");
  
  const [errorApp, setError] = useState(null);
  const [barberData, setBarberData] = useState([]);
  const [showcaseColor, setShowcaseColor] = useState({});
  const [showtimes, setShowtimes] = useState([
    "8:00AM-9:00AM",
    "9:00AM-10:00AM",
    "10:00AM-11:00AM",
    "11:00AM-12:00PM",
    "12:00PM-13:00PM",
    "13:00PM-14:00PM",
    "14:00PM-15:00PM",
    "15:00PM-16:00PM",
    "16:00PM-17:00PM",
    "18:00PM-19:00PM",
    "19:00PM-20:00PM",
    "20:00PM-21:00PM",
  ]);
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 10);
  const { shopID, selectedServices, totalPrice, shopName } = route.params;
  const timeSlot = selectedTime;
  const date = selectedDate.toString();
  const barberId = selectedBarber;
  const barberShopId = shopID;
  const services = selectedServices;
  const timeSlotData = [
    {
      title: "Chọn giờ cắt tóc bạn mong muốn",
      showtimes: [
        "8:00AM-9:00AM",
        "9:00AM-10:00AM",
        "10:00AM-11:00AM",
        "11:00AM-12:00PM",
        "12:00PM-13:00PM",
        "13:00PM-14:00PM",
        "14:00PM-15:00PM",
        "15:00PM-16:00PM",
        "16:00PM-17:00PM",
        "18:00PM-19:00PM",
        "19:00PM-20:00PM",
        "20:00PM-21:00PM",
      ],
    },
  ];

  useEffect(() => {
    setSelectedTime("");
    setError(null);

    const fetchBookingData = async () => {
      try {
        
        const bookingData = await getBookingData(shopID);
        setBarberData(bookingData.barbers);
        console.log(bookingData.appointments);
        const updatedShowcaseColor = {};

        // Tạo một mảng chứa tất cả các timeSlot đã đặt trong các appointment
        const bookedTimeSlots = bookingData.appointments.map(
          (appointment) => appointment.timeSlot
        );

        // Duyệt qua tất cả các timeSlot có trong showtimes
        showtimes.forEach((timeSlot) => {
          // Kiểm tra xem timeSlot đã được đặt hay chưa
          if (bookedTimeSlots.includes(timeSlot)) {
            // Kiểm tra từng appointment xem có trùng khớp với timeSlot đang xét không
            const matchedAppointments = bookingData.appointments.filter(
              (appointment) =>
                appointment.timeSlot === timeSlot &&
                appointment.barberId === selectedBarber &&
                appointment.date === selectedDate.toString()
            );

            // Kiểm tra xem có appointment nào thỏa mãn điều kiện không
            if (
              matchedAppointments.some(
                (appointment) => appointment.status === "inProgress"
              ) ||
              matchedAppointments.some(
                (appointment) => appointment.status === "pending"
              )
            ) {
              // timeSlot không phù hợp điều kiện
              updatedShowcaseColor[timeSlot] = "brown";
            } else {
              // timeSlot phù hợp điều kiện
              updatedShowcaseColor[timeSlot] = null;
            }
          } else {
            // timeSlot chưa được đặt
            updatedShowcaseColor[timeSlot] = null;
          }
        });

        setShowcaseColor(updatedShowcaseColor);
      } catch (error) {
        console.error(error);
        // Xử lý lỗi ở đây
      }
    };
    AsyncStorage.getItem("userData").then((res) => {
      const cvUserData = JSON.parse(res);
      setCurrentUserId(cvUserData.uid);
      setCurrentUserName(cvUserData.name);
    });

    fetchBookingData();
  }, [shopID, selectedDate, selectedBarber, errorApp]);

  const handleBookingConfirmation = async () => {
    if (!selectedBarber || !selectedDate || !selectedTime) {
      alert("Vui lòng chọn barber, ngày và giờ cắt tóc trước khi đặt lịch.");
      return;
    }
    try {
      const userData = {
        barberId,
        barberName,
        barberShopId,
        date,
        services,
        shopName,
        timeSlot,
        totalPrice,
        customerId,
        customerName,
      };
      
      setSelectedTime("");
      const response = await createAppointment(userData);
          if (response.error) {
             
             alert(response.error); 
            return;
          }
      const updatedShowcaseColor = { ...showcaseColor };
      updatedShowcaseColor[selectedTime] = null;
      setShowcaseColor(updatedShowcaseColor);
      console.log(response);
      alert("Đặt chỗ thành công, chờ salon xác nhận");
      navigation.navigate("Home2");
    } catch (error) {
      alert(error);
      if (error = "Appointment already exists."){
        setError(error);
      };
      console.error(error); // Xử lý lỗi, hiển thị thông báo lỗi
    }
  };

  const handleCardPress = (item) => {
    // Xử lý sự kiện khi nhấp vào card
    console.log("Selected Barber:", item.uid);
    setSelectedBarber(item.uid);
    setSelectedBarberName(item.name);
  };

  const handlePressTimeslot = async (item) => {

    if (showcaseColor[item] !== "brown") {
      setSelectedTime(item);
    }
  };

  return (
    
    <SafeAreaView >
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        
        <FlatList
          data={barberData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                selectedBarber === item.uid && styles.selectedCard,
              ]}
              onPress={() => handleCardPress(item)}
            >
              <Image source={{ uri: item?.avatar }} style={styles.avatar} />
              <Text style={styles.cardTitle}>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          marginTop: 10,
          marginLeft: 5,
        }}
      >
        <AntDesign name="clockcircleo" size={24} color="orange" />
        <Text style={{ paddingTop: 4, paddingLeft: 4 }}>
          Chọn ngày bạn muốn đặt lịch cắt tóc
        </Text>
      </View>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={currentDate}
        endDate={endDate}
        initialSelectedDate={currentDate}
        onSelectedDateChange={(date) => {
          setSelectedDate(date);
          console.log("Selected Date:", date.toString());
        }}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />

      <Text style={{ paddingTop: 4, paddingLeft: 4 }}>
        Ngày đã chọn: {selectedDate.toString()}
      </Text>
      {timeSlotData.map((item, index) => (
        <View style={{ margin: 10 }} key={index}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.title}</Text>
          <FlatList
            numColumns={3}
            data={item.showtimes}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handlePressTimeslot(item)}
                style={[
                  selectedTime === item
                    ? styles.selectedShowtime
                    : showcaseColor[item] === "brown"
                    ? styles.brownShowtime
                    : styles.showtime,
                ]}
              >
                <Text
                  style={[
                    selectedTime === item
                      ? styles.selectedShowtimeText
                      : showcaseColor[item] === "brown"
                      ? styles.brownShowtimeText
                      : styles.showtimeText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      ))}
      {selectedTime && (
        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 10 }}>
          TimeSlot đã chọn: {selectedTime}
        </Text>
      )}

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => handleBookingConfirmation()}
        // disabled={!selectedTime}
      >
        <Text style={styles.confirmButtonText}>Xác nhận đặt lịch</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0, // Set marginTop to 0 to remove the empty space
  },
  showtime: {
    borderColor: "green",
    borderWidth: 0.5,
    width: 100,
    borderRadius: 3,
    margin: 10,
    padding: 5,
  },
  selectedShowtime: {
    borderColor: "blue",
    borderWidth: 0.5,
    width: 100,
    borderRadius: 3,
    margin: 10,
    padding: 5,
  },
  showtimeText: {
    fontSize: 15,
    color: "green",
    fontWeight: "500",
    textAlign: "center",
  },
  selectedShowtimeText: {
    fontSize: 15,
    color: "blue",
    fontWeight: "500",
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

  brownShowtime: {
    borderColor: "brown",
    borderWidth: 0.5,
    width: 100,
    borderRadius: 3,
    margin: 10,
    padding: 5,
  },
  brownShowtimeText: {
    fontSize: 15,
    color: "brown",
    fontWeight: "500",
    textAlign: "center",
  },
  showtimeButton: {
    borderColor: "green",
    borderWidth: 0.5,
    width: 100,
    borderRadius: 3,
    margin: 10,
    padding: 5,
  },
  selectedShowtimeButton: {
    backgroundColor: "green",
  },
  showtimeButtonText: {
    fontSize: 15,
    color: "green",
    fontWeight: "500",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 8,
    elevation: 3,
    paddingHorizontal: 25,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: "center",
    marginVertical: 5,
  },
  selectedCard: {
    borderColor: "blue",
    borderWidth: 2,
  },
});
