const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('express-async-errors');
const questionnairesRoute = require('./src/routes/questionnairesRoute');
const questionsRoute = require('./src/routes/questionsRoute');
const notFound = require('./src/middleware/not-found');
const errorHandlerMiddleware = require('./src/middleware/error-handler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Change the server for a local or a cluster of your own
const server ='mongodb+srv://kero:1234@cluster0.2eous.mongodb.net/quizApp?retryWrites=true&w=majority';


app.use("/api/questionnaires", questionnairesRoute);
app.use("/api/questions", questionsRoute);

app.use(notFound)
app.use(errorHandlerMiddleware);

mongoose
  .connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

