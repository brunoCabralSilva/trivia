import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { motion } from 'framer-motion' ;

class Trivia extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <motion.div
      initial={{opacity: 1}}
        animate={{opacity: 1}}
        exit={{opacity:0, transition:{delay: 1, duration:0.6 }}}
      >
        <Header />
        Trivia
        <Questions
          history={ history }
        />
      </motion.div>
    );
  }
}

export default Trivia;

Trivia.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
