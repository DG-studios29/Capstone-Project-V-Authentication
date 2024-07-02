const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const OU = require('./models/OU');
const Division = require('./models/Division');
const Credential = require('./models/Credential');
require('dotenv').config(); // Import dotenv to use environment variables

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  // Clear existing data
  await mongoose.connection.dropDatabase();

  // Create organizational units (OUs)
  const ou1 = new OU({ name: 'News Management' });
  const ou2 = new OU({ name: 'Software Reviews' });
  const ou3 = new OU({ name: 'Hardware Reviews' });
  const ou4 = new OU({ name: 'Opinion Publishing' });
  await ou1.save();
  await ou2.save();
  await ou3.save();
  await ou4.save();

  // Create divisions for each OU
  const division1 = new Division({ name: 'News IT', credentials: [], ou: ou1._id });
  const division2 = new Division({ name: 'News Writing', credentials: [], ou: ou1._id });
  const division3 = new Division({ name: 'Software Testing', credentials: [], ou: ou2._id });
  const division4 = new Division({ name: 'Software Development', credentials: [], ou: ou2._id });
  const division5 = new Division({ name: 'Hardware Testing', credentials: [], ou: ou3._id });
  const division6 = new Division({ name: 'Hardware Development', credentials: [], ou: ou3._id });
  const division7 = new Division({ name: 'Opinion Editorial', credentials: [], ou: ou4._id });
  const division8 = new Division({ name: 'Opinion Analysis', credentials: [], ou: ou4._id });
  await division1.save();
  await division2.save();
  await division3.save();
  await division4.save();
  await division5.save();
  await division6.save();
  await division7.save();
  await division8.save();

  // Hash passwords for users
  const hashedPassword1 = await bcrypt.hash('password1', 10);
  const hashedPassword2 = await bcrypt.hash('password2', 10);
  const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10);

  // Create users
  const user1 = new User({
    username: 'user1',
    password: hashedPassword1,
    role: 'normal',
    divisions: [division1._id]
  });
  const user2 = new User({
    username: 'user2',
    password: hashedPassword2,
    role: 'management',
    divisions: [division3._id, division4._id]
  });
  const admin = new User({
    username: 'admin',
    password: hashedPasswordAdmin,
    role: 'admin',
    divisions: [division1._id, division2._id, division3._id, division4._id, division5._id, division6._id, division7._id, division8._id]
  });
  await user1.save();
  await user2.save();
  await admin.save();

  // Create credentials for each division
  const credential1 = new Credential({ name: 'Credential1', username: 'newsITUser', password: 'password', division: division1._id });
  const credential2 = new Credential({ name: 'Credential2', username: 'newsWritingUser', password: 'password', division: division2._id });
  const credential3 = new Credential({ name: 'Credential3', username: 'softwareTestingUser', password: 'password', division: division3._id });
  const credential4 = new Credential({ name: 'Credential4', username: 'softwareDevUser', password: 'password', division: division4._id });
  const credential5 = new Credential({ name: 'Credential5', username: 'hardwareTestingUser', password: 'password', division: division5._id });
  const credential6 = new Credential({ name: 'Credential6', username: 'hardwareDevUser', password: 'password', division: division6._id });
  const credential7 = new Credential({ name: 'Credential7', username: 'opinionEditorialUser', password: 'password', division: division7._id });
  const credential8 = new Credential({ name: 'Credential8', username: 'opinionAnalysisUser', password: 'password', division: division8._id });
  await credential1.save();
  await credential2.save();
  await credential3.save();
  await credential4.save();
  await credential5.save();
  await credential6.save();
  await credential7.save();
  await credential8.save();

  // Assign credentials to their respective divisions
  division1.credentials.push(credential1);
  division2.credentials.push(credential2);
  division3.credentials.push(credential3);
  division4.credentials.push(credential4);
  division5.credentials.push(credential5);
  division6.credentials.push(credential6);
  division7.credentials.push(credential7);
  division8.credentials.push(credential8);
  await division1.save();
  await division2.save();
  await division3.save();
  await division4.save();
  await division5.save();
  await division6.save();
  await division7.save();
  await division8.save();

  console.log('Database seeded successfully');
  mongoose.connection.close();
};

seedDatabase();
