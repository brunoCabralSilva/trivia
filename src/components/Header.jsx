import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, token, score } = this.props;
    return (
      <div className='flex items-center justify-between flex-row m-4 z-20 text-white font-bold'>
        <img className='rounded-full w-10 sm:w-20' src={ `https://www.gravatar.com/avatar/${token}` } alt="" data-testid="header-profile-picture" />
        <div className='flex flex-col items-end '>
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">Score:{ Number(score) }</span>
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
