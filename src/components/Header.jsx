import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, token, score } = this.props;
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${token}` } alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">{ Number(score) }</span>
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
