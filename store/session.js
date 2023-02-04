import AsyncStorage from '@react-native-async-storage/async-storage';
import csrfFetch from './csrf.js';
import * as SQLite from 'expo-sqlite';

const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

const db = SQLite.openDatabase('example.db');

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

export const sqlLog = (user) => async (dispatch) => {
  const { email, password } = user;

  db.transaction(tx => {
      console.log('attempting login as', email, password)
      tx.executeSql('SELECT * FROM users WHERE email = ? AND password = ?', [email, password],
        (txObj, resultSet) => {
          let data = resultSet.rows._array;
          console.log(data)
          if (data.length) {
            const targetUser = data[0]
            storeCurrentUser(targetUser);
            dispatch(addCurrentUser(targetUser));
          } else {
            console.log('incorrect email or password')
            // dispatch(sqlLogout(dispatch));
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

export const sqlLogout = () => async dispatch => {
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
};

export const logout = () => async dispatch => {
  storeCurrentUser(null);
  dispatch(removeCurrentUser());;
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

// export const restoreSession = () => async dispatch => {
//   let res = await csrfFetch('/api/session');
//   storeCSRFToken(res);
//   let data = await res.json();
//   storeCurrentUser(data.user);
//   dispatch(addCurrentUser(data.user));
//   return res;
// }

export const storeCurrentUser = async (user) => {
  if (user) {
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem("currentUser");
  }
};

// export const storeCSRFToken = async (res) => {
//   const token = res.headers.get('X-CSRF-Token');
//   if (token) await AsyncStorage.setItem('X-CSRF-Token', token);
// };

// export const login = (user) => async (dispatch) => {
//   const { email, password } = user;
//   let res = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       email,
//       password
//     })
//   });
//   if (res.ok) {
//     let data = await res.json();
//     storeCurrentUser(data)
//     dispatch(addCurrentUser(data));
//     return res;
//   } else {
//     return ({error: 'We are unable to log you in. Please try again. If the problem persists, contact an administrator.'})
//   }
// }



let initialState = {};

const fixUser = async () => {
  let user = await AsyncStorage.getItem("currentUser");
  initialState = { 'user': user};
  console.log(initialState)
}

fixUser();

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_USER:
      console.log({...state, user: action.user})
      return { ...state, user: action.user }
    case REMOVE_CURRENT_USER:
      console.log({...state, user: null})
      return { ...state, user: null}
    default:
      return state;
  }
}


export default sessionReducer;