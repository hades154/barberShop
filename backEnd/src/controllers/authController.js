const admin = require('firebase-admin');
const { authorize } = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt');

let firebaseAppInitialized = false;

const initializeFirebaseApp = () => {
  // Khởi tạo Firebase app
  const serviceAccount = require('../../serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  firebaseAppInitialized = true;
};

const login = async (req, res, next) => {
  if (!firebaseAppInitialized) {
    initializeFirebaseApp();
  }

  const { uid, email } = req.body;

  try {
    // Xác thực người dùng bằng Firebase Authentication
    const userCredential = await admin.auth().getUserByEmail(email);
    const user = userCredential.toJSON();

    if (user && user.uid === uid) {
      const userData = await getUserData(user.uid);
      if (userData) {
        const role = await getUserRole(user.uid);
        req.user = {
          name: userData.name,
          address: userData.address,
          phoneNumber: userData.phoneNumber,
          avatar: userData.avatar,
          uid: user.uid,
          email: user.email,
          role: role,
        };

        if (role === 'admin') {
          res.status(200).json({ user: req.user, url: '/admin' });
        } else if (role === 'customer') {
          res.status(200).json({ user: req.user, url: '/customer' });
        } else if (role === 'salon') {
          res.status(200).json({ user: req.user, url: '/salon' });
        } else {
          res.status(403).json({ message: 'Không có quyền truy cập' });
        }
      } else {
        res.status(404).json({ message: 'Không tìm thấy thông tin người dùng' });
      }
    } else {
      res.status(401).json({ message: 'Đăng nhập thất bại' });
    }
  } catch (error) {
    console.error('Lỗi xác thực người dùng:', error);
    res.status(500).json({ message: 'Lỗi xác thực người dùng' });
  }
};

const getUserData = async (uid) => {
  console.log('Bắt đầu truy vấn thông tin người dùng');
  try {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      console.log('Thông tin người dùng:', userData);
      return userData;
    } else {
      console.log('Tài liệu không tồn tại');
      return null;
    }
  } catch (error) {
    console.error('Lỗi lấy thông tin người dùng:', error);
    return null;
  }
};

const getUserRole = async (uid) => {
  console.log('Bắt đầu truy vấn vai trò người dùng');
  try {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (userDoc.exists) {
      const user = userDoc.data();
      console.log('Vai trò của người dùng:', user.role);
      return user.role;
    } else {
      console.log('Tài liệu không tồn tại');
      return null;
    }
  } catch (error) {
    console.error('Lỗi lấy vai trò người dùng:', error);
    return null;
  }
};

module.exports = {
  login: login,
  getUserRole: getUserRole,
};
