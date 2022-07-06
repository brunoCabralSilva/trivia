import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

class Header extends React.Component {
  render() {
    const { name, token, score } = this.props;
    return (
      <div className='flex items-center justify-between flex-row m-4 z-20 text-white font-bold'>
        <motion.img
        initial={{opacity: 0, x:20}}
        animate={{opacity: 1, x: 0, transition: {delay: 0.5, duration: 0.3}}}
        exit={{opacity:0, x:20, transition:{delay: 0, duration:0.3 }}}
        className='rounded-full w-10 sm:w-20' src={ `https://www.gravatar.com/avatar/${token}` } alt="" data-testid="header-profile-picture" />
        <div className='flex flex-col items-end '>
        <motion.p 
        initial={{opacity: 0, x:20}}
        animate={{opacity: 1, x: 0, transition: {delay: 0.7, duration: 0.4}}}
        exit={{opacity:0, x:20, transition:{ delay: 0.2, duration:0.3 }}}
        data-testid="header-player-name">{ name }</motion.p>
        <motion.span
        initial={{opacity: 0, x:20}}
        animate={{opacity: 1, x: 0, transition: {delay: 0.9, duration: 0.4}}}
        exit={{opacity:0, x:20, transition:{ delay: 0.4, duration:0.3 }}}
          data-testid="header-score">Score:{ Number(score) }</motion.span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.payload.name,
  token: state.player.payload.token,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
