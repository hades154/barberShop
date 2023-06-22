import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import {
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import LoginScreen from "../screen/loginScreen";
import HomeScreen from "../screen/homeScreen";
import SearchPage from "../screen/searchScreen";
import HomeAdmin from "../screen/homeAdmin";
import DetailPage from "../screen/shopDetailPage";
import PersonPage from "../screen/profileScreen";
import BookingScreen from "../screen/bookingScreen";
import HomeSalon from "../screen/homeSalon";
import AppointmentRequest from "../screen/salonRequestApp";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeSalon}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Trang chủ Salon</Text>
            </View>
          ),

          headerStyle: {
            backgroundColor: "#669966",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabSalon = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#669966",
          position: "absolute",
          bottom: 5,
          left: 20,
          right: 20,
          elevation: 5,
          borderRadius: 15,
          height: 60,
          ...styles.shadow,
        },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: "#669966",
            position: "absolute",
            bottom: 5,
            left: 20,
            right: 20,
            elevation: 5,
            borderRadius: 15,
            height: 60,
            ...styles.shadow,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="AppointmentRequest "
        component={AppointmentRequest}
        options={{
          headerTitle: "AppointmentRequest ",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#669966",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "yellow" },
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerTitle: "Search Page",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#669966",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Person"
        component={PersonPage}
        options={{
          headerTitle: "User info",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#669966",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);

  if (routeName == "Login") {
    return "none";
  }
  return "flex";
};

export default TabSalon;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
  },
  searchIconContainer: {
    marginRight: 20,
    padding: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
