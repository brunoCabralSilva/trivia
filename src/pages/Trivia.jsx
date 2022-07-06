import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Trivia extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        {/* <img src={require('../img/purple.jpg')} alt="" className="" /> */}
        <Header />
        Trivia
        <Questions
          history={ history }
        />
      </div>
    );
  }
}

export default Trivia;

Trivia.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
