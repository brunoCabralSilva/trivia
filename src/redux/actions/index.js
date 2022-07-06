export const NEW_STATE = 'NEW_STATE';
export const ATT_PLACAR = 'ATT_PLACAR';
export const ADD_CORRECT = 'ADD_CORRECT';

export const actionAddState = (state) => ({
  type: NEW_STATE,
  payload: state,
});

export const attPlacar = (placar) => ({
  type: ATT_PLACAR,
  payload: placar,
});

export const actionCorrect = (placar) => ({
  type: ADD_CORRECT,
  payload: placar,
});
