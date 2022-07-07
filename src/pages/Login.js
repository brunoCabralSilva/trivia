import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAddState } from '../redux/actions';
import { motion } from 'framer-motion';

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
    const { name, email } = this.state;
    return (
      <motion.div
        initial={{opacity: 1}}
        animate={{opacity: 1}}
        exit={{opacity:0, transition:{ duration:0.5 }}}
        className="flex flex-col bg-hero-pattern bg-cover bg-center text-white h-screen justify-center items-center">
        <motion.div
        initial={{opacity: 0, y:-20}}
        animate={{opacity: 1, y: 0, transition:{duration:0.5}}}
        exit={{opacity:0, y:-20, transition:{ duration:0.5 }}}
        className="flex flex-col bg-half-transparent2 rounded-lg gap-1 w-2/3 md:w-1/3 lg:w-1/4">
          <motion.img
            initial={{opacity: 0, x:20}}
            animate={{opacity: 1, x: 0, transition:{ delay: 0, duration:0.5}}}
          className='rounded-lg my-7' src={require('../img/logo.png')} alt="" />
          <div className='w-10/12 mx-auto'> 
        <motion.input
        initial={{opacity: 0, x:20}}
        animate={{opacity: 1, x: 0, transition:{ delay: 0.2, duration:0.3}}}
          className=' w-full text-center text-black rounded sm:p-2 p-2 sm:mb-2 mb-2 bg-purple-200'
          type="text"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
          />
        <motion.input
        initial={{opacity: 0, x:20}}
        animate={{opacity: 1, x: 0, transition:{ delay: 0.4, duration:0.3}}}
          className='w-full text-center text-black rounded sm:p-2 p-2 mb-3 sm:mb-4 bg-purple-200'
          type="email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <div className='flex flex-row w-full gap-x-2 mb-4'>
        <motion.button
        initial={{opacity: 0, x:20}}
        animate={{opacity: 1, x: 0, transition:{ delay: 0.5, duration:0.3}}}
        className="bg-lilas font-bold hover:bg-purple-900 sm:p-2 transition duration-1000 py-2 w-1/2 rounded mb-1"
        type="button"
        onClick={ this.handleClick }
        data-testid="btn-play"
        disabled={ this.enable() }
        >
          Play
        </motion.button>
        <motion.button
        initial={{opacity: 0, x:20}}
        animate={{opacity: 1, x: 0, transition:{ delay: 0.6, duration:0.5}}}
        className="bg-lilas font-bold hover:bg-purple-900 sm:p-2 transition duration-1000 py-2 w-1/2 rounded mb-1"
        type="button"
          data-testid="btn-settings"
          onClick={ this.toSettings }
          >
          Settings
        </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
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
