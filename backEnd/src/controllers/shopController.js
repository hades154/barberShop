const admin = require("firebase-admin");

let firebaseAppInitialized = false;

const initializeFirebaseApp = () => {
  // Khởi tạo Firebase app
  const serviceAccount = require("../../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  firebaseAppInitialized = true;
};

// Controller để lấy thông tin tất cả các barbershop
exports.getAllBarbershops = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("barberShops").get();
    const barbershops = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const barbershop = {
        uid: doc.id, // Include the uid in the response
        ...data,
      };
      barbershops.push(barbershop);
    });
    res.json(barbershops);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy thông tin barbershop" });
  }
};

// Controller để lấy thông tin của một barbershop cụ thể
exports.getBarbershopById = async (req, res) => {
  try {
    const barberShopId = req.params.id;

    const barberShopDoc = await admin
      .firestore()
      .collection("barberShops")
      .doc(barberShopId)
      .get();
    if (!barberShopDoc.exists) {
      return res.status(404).json({ error: "Không tìm thấy barbershop" });
    }
    const barberShopData = barberShopDoc.data();

    const servicesSnapshot = await admin
      .firestore()
      .collection("barberShops")
      .doc(barberShopId)
      .collection("shopServices")
      .get();
    const servicesData = servicesSnapshot.docs.map((doc) => doc.data());

    const responseData = {
      barberShop: barberShopData,
      services: servicesData,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy thông tin barbershop" });
  }
};

exports.searchBarbershops = async (req, res) => {
  try {
    // if (!firebaseAppInitialized) {
    //   initializeFirebaseApp();
    // }

    const { query } = req.query;

    const shopsRef = admin.firestore().collection("barberShops");

    let shopsSnapshot = null;

    if (query) {
      shopsSnapshot = await shopsRef.where("name", "==", query)
        .orWhere("city", "==", query)
        .get();
    } else {
      return res.status(400).json({ error: "Invalid query" });
    }

    const shops = [];
    shopsSnapshot.forEach((doc) => {
      shops.push(doc.data());
    });

    res.json(shops);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.getBookingData = async (req, res) => {
  try {
    const uid = req.params.uid;

    // Truy vấn vào collection "barberShops" với UID tương ứng
    const barberShopRef = admin.firestore().collection("barberShops").doc(uid);
    const barberShopSnapshot = await barberShopRef.get();

    if (barberShopSnapshot.exists) {
      // Lấy thông tin của tất cả các barber trong subcollection "barber"
      const barberSnapshot = await barberShopRef.collection("barber").get();
      const barbers = barberSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      // Truy vấn các appointment có "barberShopId" tương ứng
      const appointmentSnapshot = await admin
        .firestore()
        .collection("appointments")
        .where("barberShopId", "==", uid)
        .get();
      const appointments = appointmentSnapshot.docs.map((doc) => doc.data());

      // Kết hợp thông tin barber và appointment
      const data = {
        barberShop: barberShopSnapshot.data(),
        barbers: barbers,
        appointments: appointments,
      };
      res.json(data);
    } else {
      res.status(404).json({ error: "Barber shop not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { barberId, date, timeSlot } = req.body;

    // Kiểm tra sự tồn tại của các appointments có barberId, date và timeSlot tương tự
    const existingAppointments = await admin
      .firestore()
      .collection("appointments")
      .where("barberId", "==", barberId)
      .where("date", "==", date)
      .where("timeSlot", "==", timeSlot)
      .where("status", "in", ["pending", "inProgress"])
      .get();

    if (!existingAppointments.empty) {
      // Nếu có appointments trùng, gửi thông báo lỗi về cho client
      return res.status(400).json({ error: "Appointment already exists." });
    }

    // Nếu không có appointments trùng, tiếp tục tạo appointment mới
    const {
      barberName,
      barberShopId,
      services,
      shopName,
      totalPrice,
      customerId,
      customerName,
    } = req.body;

    // Tạo một document mới trong collection "appointments"
    const appointmentRef = await admin
      .firestore()
      .collection("appointments")
      .add({
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
        status: "pending",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

    const appointmentData = {
      id: appointmentRef.id,
      ...req.body,
      status: "pending",
      timestamp: appointmentRef.timestamp,
    };

    return res.status(200).json(appointmentData);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ error: "Failed to create appointment." });
  }
};



exports.getNewAppointments = (req, res) => {

  // if (!firebaseAppInitialized) {
  //   initializeFirebaseApp();
  // }
  const barberShopId = req.params.barberShopId;
  const appointmentsCollection = admin.firestore().collection("appointments");

  appointmentsCollection
    .where("status", "==", "pending")
    .where("barberShopId", "==", barberShopId)
    .onSnapshot((snapshot) => {
      const newAppointments = [];
      snapshot.forEach((doc) => {
        newAppointments.push(doc.data());
      });
      res.json(newAppointments);
    });
};
