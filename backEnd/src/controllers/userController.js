const admin = require('firebase-admin');

let firebaseAppInitialized = false;

const initializeFirebaseApp = () => {
  // Khởi tạo Firebase app
  const serviceAccount = require('../../serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    
  }),'eHair';
  firebaseAppInitialized = true;
};

const createUser = (req, res) => {
  // Kiểm tra xem Firebase app đã được khởi tạo hay chưa
  if (!firebaseAppInitialized) {
    initializeFirebaseApp();
  }

  const { email, password, name } = req.body;

  // Thực hiện kiểm tra dữ liệu đầu vào
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
  }

  // Tạo người dùng mới trong Firebase Authentication
  admin
    .auth()
    .createUser({
      email,
      password,
      displayName: name,
    })
    .then((userRecord) => {
      // Thêm thông tin người dùng vào cơ sở dữ liệu Firebase Firestore
      const userId = userRecord.uid;
      const userData = { name, email,password, role: 'customer',avatar:'',address:'' }; // Thêm các thông tin người dùng khác vào đây nếu cần thiết

      return admin.firestore().collection('users').doc(userId).set(userData);
      
    })

    .then(() => {
      res.status(200).json({ message: 'Đăng ký thành công.' });
    })
    .catch((error) => {
      console.error('Lỗi khi đăng ký:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
    });
};

module.exports = {
  createUser,
};