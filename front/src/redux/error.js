// Action Types
const RESET_ERROR = 'RESET_ERROR';

// Reducer
export default (state = null, action) => {
  const { type, error } = action;
  if (type === RESET_ERROR) {
    return null;
  }
  if (error) {
    return error;
  }
  return state;
};

// Action Creators
export const resetError = () => ({
  type: RESET_ERROR,
});
