// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import csrfFetch from './csrf.js';

const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export const getCurrentUser = (state = {}) => {
  if (state.session && state.session.user) {
    return state.session.user;
  } else {
    return null;
  }
}

// Sign up function in case it is needed later:

// export const signup = inputs => async dispatch => {
//   let {email, name, password} = inputs;
//   let res = await csrfFetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify({
//       email,
//       name,
//       password
//     })
//   })
//   let data = await res.json();
//   storeCurrentUser(data);
//   dispatch(addCurrentUser(data));
// };

export const logout = () => async dispatch => {
  const res = await csrfFetch(`/api/session`, {
    method: 'DELETE'
  });

  if (res.ok) {
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res;
  }
}

export const addCurrentUser = (user) => {
  return ({
    type: ADD_CURRENT_USER,
    user
  });
};

export const removeCurrentUser = () => {
  return ({
    type: REMOVE_CURRENT_USER,
  });
};

export const restoreSession = () => async dispatch => {
  let res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  let data = await res.json();
  storeCurrentUser(data.user);
  dispatch(addCurrentUser(data.user));
  return res;
}

export const storeCurrentUser = (user) => {
  if (user) {
    AsyncStorage.setItem('currentUser',JSON.stringify(user));
  } else {
    AsyncStorage.removeItem("currentUser");
  }
};

export const storeCSRFToken = (res) => {
  const token = res.headers.get('X-CSRF-Token');
  if (token) AsyncStorage.setItem('X-CSRF-Token', token);
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  let res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  });
  if (res.ok) {
    let data = await res.json();
    storeCurrentUser(data)
    dispatch(addCurrentUser(data));
    return res;
  } else {
    return ({error: 'We are unable to log you in. Please try again. If the problem persists, contact an administrator.'})
  }
}
let user = AsyncStorage.getItem("currentUser");
const initialState = { user: user}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_USER:
      return { ...state, user: action.user }
    case REMOVE_CURRENT_USER:
      return { ...state, user: null}
    default:
      return state;
  }
}


export default sessionReducer;