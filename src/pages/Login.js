import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAddState } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    token: '',
    apiDataJson: '',
  }

  handleClick = async () => {
    const { history, addInitialData } = this.props;
    const { email } = this.state;
    const token = md5(email).toString();
    const apiData = await fetch('https://opentdb.com/api_token.php?command=request');
    const apiDataJson = await apiData.json();
    this.setState({
      token,
      apiDataJson,
    });
    localStorage.setItem('token', apiDataJson.token);
    addInitialData(this.state);
    const NUM = 0;
    if (Number(apiDataJson.response_code) !== NUM) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      history.push('/trivia');
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  toSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  enable = () => {
    const { name, email } = this.state;
    if (name === '' || email === '') {
      return true;
    } return false;
  }

  render() {
    const { name, email, apiDataJson } = this.state;
    console.log(apiDataJson);
    return (
      <div>
        <input
          type="text"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play"
          disabled={ this.enable() }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.toSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.player.payload.apiDataJson.response_code,
});

const mapDispatchToProps = (dispatch) => (
  {
    addInitialData: (state) => dispatch(actionAddState(state)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  addInitialData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
