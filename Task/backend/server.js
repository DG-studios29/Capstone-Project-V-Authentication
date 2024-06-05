const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing CORS

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Using CORS

mongoose.connect('mongodb+srv://dhillangop329:Dggamer29@cluster0.jlmo84i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const authRoutes = require('./routes/authRoutes');
const credentialRoutes = require('./routes/credentialRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/admin', adminRoutes);
