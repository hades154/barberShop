import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../configFirebase";
const windowWidth = Dimensions.get("window").width;

const PendingScreen= () => {
  const [userID, setUserId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [deletedAppointments, setDeletedAppointments] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("userData").then((res) => {
      const cvUserData = JSON.parse(res);
      console.log(cvUserData);
      setUserId(cvUserData.uid)
      console.log(cvUserData.uid);
    });

    const appointmentsCollection = db
      .collection("appointments")
      .where("status", "==", "pending")
      .where("customerId", "==", userID);
      console.log(appointmentsCollection);

    const unsubscribe = appointmentsCollection.onSnapshot((snapshot) => {
      const newAppointments = [];
      snapshot.forEach((doc) => {
        const appointment = doc.data();
        const id = doc.id;;
        // Định dạng timestamp tại phía client
        const timestamp = appointment.timestamp
          ? new Date(appointment.timestamp)
          : null;
        // Gán đối tượng Date vào appointment.timestamp
        appointment.id = id;
        appointment.timestamp = timestamp;
        newAppointments.push(appointment);
      });
      newAppointments.sort((a, b) => b.timestamp - a.timestamp);
      setAppointments(newAppointments);
    });

    return () => {
      unsubscribe();
    };
    
  }, [userID]);


  const handleDecline = (id) => {
      const appointmentRef = db.collection("appointments").doc(id);
      appointmentRef
        .update({
          status: "cancelled",
        })
        .then(() => {
          const updatedAppointments = appointments.filter(
            (appointment) => appointment.id !== id
          );
          setAppointments(updatedAppointments);
          setDeletedAppointments([...deletedAppointments, id]);
        })
        .catch((error) => {
          console.log("Error updating appointment status:", error);
        });
  };

  const renderRightActions = (id, appointment) => (
    <View style={styles.rightActions}>
  
      <TouchableOpacity
        onPress={() => handleDecline(id)}
        style={[styles.actionButton, styles.declineButton]}
      >
        <Text style={styles.buttonText}>Hủy cuộc hẹn</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredAppointments = appointments.filter(
    (appointment) => !deletedAppointments.includes(appointment.id)
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredAppointments.map((appointment) => (
          <Swipeable
            key={appointment.id}
            renderRightActions={() =>
              renderRightActions(appointment.id, appointment)
            }
          >
            <View style={styles.card}>
              <Text style={styles.appointmentTitle}>{appointment.name}</Text>
              <View style={styles.appointmentInfo}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.label, styles.boldText]}>
                    Khách hàng:
                  </Text>
                  <Text style={[styles.value, styles.suBoldText]}>
                    {appointment.customerName}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={[styles.label, styles.boldText]}>Thợ cắt:</Text>
                  <Text style={[styles.value, styles.suBoldText]}>
                    {appointment.barberName}
                  </Text>
                </View>
              </View>
              <View style={styles.appointmentInfo}>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Thời gian:</Text>
                  <Text style={styles.value}>{appointment.timeSlot}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Tổng giá tiền:</Text>
                  <Text style={styles.value}>{appointment.totalPrice}</Text>
                </View>
              </View>
              <View style={styles.appointmentInfo}>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Ngày cắt:</Text>
                  <Text style={styles.value}>{appointment.date}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Trạng thái:</Text>
                  <Text style={styles.value}>{appointment.status}</Text>
                </View>
              </View>
            </View>
          </Swipeable>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 0,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  appointmentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginLeft: 15,
  },
  infoContainer: {
    width: "48%",
  },
  label: {
    marginRight: 5,
    fontWeight: "bold",
  },
  value: {},
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "blue",
  },
  suBoldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "green",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginTop: 10,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.5,
    borderRadius: 10,
    paddingVertical: 20,
    marginLeft: 10,
  },
  acceptButton: {
    backgroundColor: "green",
  },
  declineButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default PendingScreen;
