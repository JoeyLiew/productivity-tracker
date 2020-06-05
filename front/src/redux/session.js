import validation from '../utilities/validation';

// Action Types
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
const LOAD_SESSION_REQUEST = 'LOAD_SESSION_REQUEST';
const LOAD_SESSION_SUCCESS = 'LOAD_SESSION_SUCCESS';
const LOAD_SESSION_FAILURE = 'LOAD_SESSION_FAILURE';

const initialState = { user: null, isFetching: false, isAuth: false };
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_SESSION_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_SESSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        user: action.session,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOAD_SESSION_FAILURE:
    case LOGOUT_FAILURE:
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

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (session) => ({
  type: LOGIN_SUCCESS,
  session,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  error,
});

const loadSessionRequest = () => ({
  type: LOAD_SESSION_REQUEST,
});

const loadSessionSuccess = (session) => ({
  type: LOAD_SESSION_SUCCESS,
  session,
});

const loadSessionFailure = (error) => ({
  type: LOAD_SESSION_FAILURE,
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
  } catch (error) {
    dispatch(registerFailure(error));
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    // Set 'isFetching' to true.
    dispatch(loginRequest());
    // Validate form data.
    const validationResult = validation.login(formData);
    if (!validationResult.isValid) {
      return dispatch(loginFailure(validationResult.error));
    }
    // Send POST request with body to login endpoint.
    const res = await fetch('/api/users/login', {
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
        dispatch(loginSuccess(data.user));
        // Save access token to local storage.
        localStorage.setItem('act', data.accessToken);
        // Redirect user to tracker.
        history.push('/tracker');
      } else {
        // Otherwise, save error to redux state.
        dispatch(loginFailure(error));
      }
    } else {
      dispatch(loginFailure(error));
    }
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    // Delete refresh token.
    const res = await fetch('/api/users/logout', {
      credentials: 'include',
    });
    if (res.ok) {
      dispatch(logoutSuccess());
      // Delete access token in local storage.
      localStorage.removeItem('act');
    } else {
      dispatch(logoutFailure());
    }
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};

export const loadSession = () => async (dispatch) => {
  dispatch(loadSessionRequest());
  try {
    // Get access token from local storage.
    const accessToken = localStorage.getItem('act');
    if (!accessToken) {
      dispatch(logout());
      return dispatch(loadSessionFailure());
    }
    const res = await fetch('/api/users/load_session', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const { status, data, error } = await res.json();
    if (res.ok) {
      if (status === 'success') {
        dispatch(loadSessionSuccess(data.user));
      } else {
        dispatch(loadSessionFailure(error));
        dispatch(logout());
      }
    } else {
      dispatch(loadSessionFailure(error));
      dispatch(logout());
    }
  } catch (error) {
    dispatch(loadSessionFailure(error));
  }
};
