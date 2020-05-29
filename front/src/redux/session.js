import validation from '../utilities/validation';

// Action Types
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Reducer
export default (
  state = { user: null, isFetching: false, isAuth: false },
  action
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        user: action.session,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

// Action Creators
const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (session) => ({
  type: REGISTER_SUCCESS,
  session,
});

const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  error,
});

export const register = (formData, history) => async (dispatch) => {
  try {
    // Start register request by turning isFetching to 'true'.
    dispatch(registerRequest());
    // Validate form data.
    const validationResult = validation.register(formData);
    if (!validationResult.isValid) {
      return dispatch(registerFailure(validationResult.error));
    }
    // Send POST request with body to register endpoint.
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    // Convert JSON to object.
    const { status, data, error } = await res.json();
    if (res.ok) {
      // If the request is successful, save the session to redux state.
      if (status === 'success') {
        dispatch(registerSuccess(data.user));
        // Save access token to local storage.
        localStorage.setItem('act', data.accessToken);
        // Redirect user to tracker.
        history.push('/tracker');
      } else {
        // Otherwise, save error to redux state.
        dispatch(registerFailure(error));
      }
    } else {
      dispatch(registerFailure(error));
    }
  } catch (err) {
    dispatch(registerFailure(err));
  }
};
