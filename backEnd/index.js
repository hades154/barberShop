const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const userRoutes = require('./src/routes/userRoutes');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
},'eHair');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());


// Định tuyến người dùng
app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});