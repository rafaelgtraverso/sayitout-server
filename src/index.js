require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = "mongodb+srv://admin:adminpassword@cluster0.kx6os.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('You have connected correctly to the mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Sorry, it seems something went wrong with the connection, you are NOT conneected to Mongo');
});

app.get('/', (req, res) => {
    res.send('HI there');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);