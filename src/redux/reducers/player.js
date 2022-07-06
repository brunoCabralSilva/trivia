import { NEW_STATE, ATT_PLACAR, ADD_CORRECT } from '../actions';

const INITIAL_STATE = {
  payload: {
    name: '',
    email: '',
    token: '',
    apiDataJson: '',
  },
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (NEW_STATE):
    return ({
      ...state,
      payload: action.payload,
    });
  case (ATT_PLACAR):
    return ({
      ...state,
      score: state.score + action.payload,
    });
  case (ADD_CORRECT):
    return ({
      ...state,
      assertions: state.assertions + action.payload,
    });
  default: return state;
  }
};

export default player;
