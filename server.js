const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // 引入 dotenv
const gameRoutes = require('./routes/gameRoutes');

dotenv.config(); // 載入環境變數

const app = express();

app.use(cors({
  origin: 'https://golfweb-frontend.onrender.com' // 替換為你前端的實際域名
  //credentials: true, // 如果需要處理身份驗證或cookie
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(express.json());
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
