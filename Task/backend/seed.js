const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const OU = require('./models/OU');
const Division = require('./models/Division');
const Credential = require('./models/Credential');

mongoose.connect('mongodb+srv://dhillangop329:Dggamer29@cluster0.jlmo84i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  await mongoose.connection.dropDatabase();

  const ou1 = new OU({ name: 'News Management' });
  const ou2 = new OU({ name: 'Software Reviews' });
  const ou3 = new OU({ name: 'Hardware Reviews' });
  const ou4 = new OU({ name: 'Opinion Publishing' });
  await ou1.save();
  await ou2.save();
  await ou3.save();
  await ou4.save();

  const division1 = new Division({ name: 'IT', credentials: [] });
  const division2 = new Division({ name: 'Writing', credentials: [] });
  await division1.save();
  await division2.save();

  ou1.divisions.push(division1);
  ou2.divisions.push(division2);
  await ou1.save();
  await ou2.save();

  const hashedPassword1 = await bcrypt.hash('password1', 10);
  const hashedPassword2 = await bcrypt.hash('password2', 10);
  const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10);

  const user1 = new User({ username: 'user1', password: hashedPassword1, role: 'normal', ous: [ou1._id], divisions: [division1._id] });
  const user2 = new User({ username: 'user2', password: hashedPassword2, role: 'management', ous: [ou2._id], divisions: [division2._id] });
  const admin = new User({ username: 'admin', password: hashedPasswordAdmin, role: 'admin', ous: [ou1._id, ou2._id], divisions: [division1._id, division2._id] });
  await user1.save();
  await user2.save();
  await admin.save();

  const credential1 = new Credential({ name: 'Credential1', username: 'user1', password: 'password' });
  const credential2 = new Credential({ name: 'Credential2', username: 'user2', password: 'password' });
  await credential1.save();
  await credential2.save();

  division1.credentials.push(credential1);
  division2.credentials.push(credential2);
  await division1.save();
  await division2.save();

  console.log('Database seeded successfully');
  mongoose.connection.close();
};

seedDatabase();
