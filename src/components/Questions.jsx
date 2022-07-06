import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attPlacar, actionCorrect } from '../redux/actions';

class Questions extends React.Component {
  state = {
    apiQuestions: {},
    questions: '',
    category: '',
    correct: '',
    incorrect: [],
    type: '',
    difficulty: '',
    posicao: 0,
    click: false,
    timer: 30,
    disable: false,
    count: 0,
  };

  componentDidMount = () => {
    this.requestAPI();
    const segundo = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        this.setState({
          timer: 30,
          disable: true,
        });
      } else {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }
    }, segundo);
  };

  requestAPI = async () => {
    const { token, history } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const urlAPI = await (await fetch(url)).json();
    const NUM = 0;
    if (Number(urlAPI.response_code) !== NUM) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        apiQuestions: urlAPI,
        questions: urlAPI.results[0].question,
        category: urlAPI.results[0].category,
        correct: urlAPI.results[0].correct_answer,
        incorrect: urlAPI.results[0].incorrect_answers,
        type: urlAPI.results[0].type,
        difficulty: urlAPI.results[0].difficulty,
      });
    }
  };

  check = (alternative) => {
    const { attPoints, addCorrect } = this.props;
    const { difficulty, timer } = this.state;
    this.setState({
      click: true,
    });
    const timerExact = timer;
    const dez = 10;
    if (alternative === 'correct') {
      const tres = 3;
      addCorrect(1);
      switch (difficulty) {
      case 'easy':
        attPoints(dez + timerExact * 1);
        break;
      case 'medium':
        attPoints(dez + timerExact * 2);
        break;
      case 'hard':
        attPoints(dez + timerExact * tres);
        break;
      default:
        return null;
      }
    }
  };

  returnButtons = (incorrect, correct) => {
    const { correct: correto, click, disable } = this.state;
    const buttonIncorrect = incorrect.map((alternative, index) => (
      <button
        type="button"
        key={ index }
        name={ alternative }
        data-testid={ `wrong-answer-${index}` }
        className={ click ? 'incorrect' : '' }
        onClick={ () => this.check('incorrect') }
        disabled={ disable }
      >
        {alternative}
      </button>
    ));
    const buttonCorrect = (
      <button
        type="button"
        name={ correto }
        data-testid="correct-answer"
        className={ click ? 'correct' : '' }
        onClick={ () => this.check('correct') }
        disabled={ disable }
      >
        {correct}
      </button>
    );
    const alternatives = [...buttonIncorrect, buttonCorrect];
    return alternatives;
  };

  random = (incorrect, correct) => {
    const alternatives = this.returnButtons(incorrect, correct);
    const { type } = this.state;
    let someArray = [];
    let max = 0;
    const cinco = 0.4;
    const dois = 0.2;
    if (type === 'multiple') {
      const num3 = 3;
      max = cinco;
      someArray = [0, 1, 2, num3];
    } else {
      someArray = [0, 1];
      max = dois;
    }
    someArray.sort(() => Math.random() - max);
    const randomic = [];
    someArray.forEach((array) => {
      randomic.push(alternatives[array]);
    });
    return randomic;
  };

  handleClick = () => {
    const { apiQuestions, posicao, count } = this.state;
    const { history } = this.props;
    const NUMBER = 4;
    if (count === NUMBER) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        timer: 30,
        click: false,
        disable: false,
        questions: apiQuestions.results[posicao + 1].question,
        category: apiQuestions.results[posicao + 1].category,
        correct: apiQuestions.results[posicao + 1].correct_answer,
        incorrect: apiQuestions.results[posicao + 1].incorrect_answers,
        type: apiQuestions.results[posicao + 1].type,
        difficulty: apiQuestions.results[posicao + 1].difficulty,
        posicao: prevState.posicao + 1,
        count: prevState.count + 1,
      }));
    }
  };

  render() {
    const { category, questions, correct, incorrect, timer, click } = this.state;
    return (
      <section>
        <h1>Questions</h1>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{questions}</p>
        <div data-testid="answer-options">
          {this.random(incorrect, correct)}
        </div>
        <p>{timer}</p>
        {click ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClick }
            className="help"
          >
            Next
          </button>
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.payload.apiDataJson.token,
});

const mapDispatchToProps = (dispatch) => ({
  attPoints: (placar) => dispatch(attPlacar(placar)),
  addCorrect: (countCorrect) => dispatch(actionCorrect(countCorrect)),
});

Questions.propTypes = {
  token: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  attPoints: PropTypes.func.isRequired,
  addCorrect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
