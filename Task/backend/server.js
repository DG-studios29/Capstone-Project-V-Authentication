const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://dhillangop329:Dggamer29@cluster0.jlmo84i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const authRoutes = require('./routes/auth');
const credentialRoutes = require('./routes/credentials');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/admin', adminRoutes);
