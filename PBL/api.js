import axios from "axios";
import { auth } from "./configFirebase";
const API_BASE_URL = "http://172.20.10.5:3000"; // Thay đổi nếu backend chạy trên cổng khác

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/signup", userData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    // Gửi request đến backend để phân quyền và xác thực
    const response = await api.post("/users/login", {
      uid: user.uid,
      email: user.email,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllBarbershop = async () => {
  try {
    const response = await api.get("/users/barbershops");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getBarbershopById = async (shopId) => {
  try {
    console.log(shopId);
    const response = await api.get(`/users/barbershops/${shopId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getBookingData = async (uid) => {
  try {
    const response = await api.get(`/users/bookingData/${uid}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createAppointment = async (userData) => {
  try {
    const response = await api.post("/users/createAppointment", userData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getNotificationAppointments = async (barberShopId) => {
  try {
    const response = await api.get(`/users/notiAppointments/${barberShopId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchBarberShop = async (textSearch) => {
  try {
    const response = await api.post("/users/search", textSearch);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};