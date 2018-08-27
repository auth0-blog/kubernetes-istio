//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
const answers = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// get answers from an specific question
app.get('/:id', (req, res) => {
  const questionAnswers = answers.filter(q => (q.questionId === parseInt(req.params.id)));
  res.send(questionAnswers);
});

// insert a new answer
app.post('/', (req, res) => {
  const {questionId, answer} = req.body;

  answers.push({
    questionId,
    answer,
    author: req.headers.from || 'unknown',
  });
  res.status(200).send();
});

// start the server
const port = process.env.ANSWERS_API_PORT || 3002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
