import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions
          history={ history }
        />
      </div>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
