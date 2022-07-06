import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { motion } from 'framer-motion';

class Feedback extends React.Component {
  state = {
    phrase: '',
  }

  componentDidMount() {
    const { assertions } = this.props;
    console.log('assertions', assertions);
    const NUMBER = 3;
    if (Number(assertions) < NUMBER) {
      this.setState({ phrase: 'Could be better...' });
    } else this.setState({ phrase: 'Well Done!' });
  }

  render() {
    const { phrase } = this.state;
    const { score, assertions } = this.props;
    console.log('assertions render', assertions);
    return (
      <div>
        <Header />
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1, transition:{delay: 0.5, duration:0.8}}}
        exit={{opacity:0, transition:{ duration:0.5 }}}
        className='min-h-80vh flex flex-col items-center justify-center font-bold text-4xl '>
        <p className='text-white' data-testid="feedback-text">
          { phrase }
        </p>
        <p className='text-white my-4' data-testid="feedback-total-score">
         Score: { score }
        </p>
        <p className='text-white' data-testid="feedback-total-question">
        Assertions: { assertions }
        </p>
        </motion.div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,

};

export default connect(mapStateToProps)(Feedback);
