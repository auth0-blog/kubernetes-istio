import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const question = (await axios.get(`${process.env.REACT_APP_QUESTIONS_API}/${params.questionId}`)).data;
    const answers = (await axios.get(`${process.env.REACT_APP_ANSWERS_API}/${params.questionId}`)).data;
    this.setState({
      question,
      answers,
    });
  }

  async submitAnswer(answer) {
    await axios.post(process.env.REACT_APP_ANSWERS_API, {
      questionId: this.state.question.id,
      answer,
    });
    await this.refreshQuestion();
  }

  render() {
    const {question, answers} = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />
            <p>Answers:</p>
            {
              answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Question;
