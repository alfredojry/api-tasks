const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRouter = require('./routes/tasksRoutes');

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 120000
})
.then(() => {console.log('Mongoose está conectado!!!')})
.catch((error) => {console.log(error)});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.use(taskRouter);

const os = require('os');
const hostname = os.hostname();
console.log(hostname)
app.listen(port, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}`);
});