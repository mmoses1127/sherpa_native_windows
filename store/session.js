import AsyncStorage from '@react-native-async-storage/async-storage';
import csrfFetch from './csrf.js';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('example.db');

const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';


export const getCurrentUser = (state = {}) => {
  if (state.session && state.session.user) {
    return state.session.user;
  } else {
    return null;
  }
}

export const getUserType = (state = {}) => {
  if (state.session && state.session.user) {
    return state.session.user.user_type;
  } else {
    return null;
  }
};

export const sqlLogin = (user) => async (dispatch) => {
  const { email, password } = user;

  db.transaction(tx => {
      console.log('attempting login as', email, password)
      tx.executeSql('SELECT * FROM users WHERE email = ? AND password = ?', [email, password],
        (txObj, resultSet) => {
          let data = resultSet.rows._array;
          console.log(data)
          if (data.length) {
            const targetUser = data[0]
            const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            storeCurrentUser(targetUser, sessionToken);
            dispatch(addCurrentUser(targetUser));
          } else {
            alert('incorrect email or password')
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

export const logout = () => async dispatch => {
  storeCurrentUser(null, null);
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

export const findUserByToken = (token) => async dispatch => {
  const user = await db.transaction(tx => {
    db.executeSql('SELECT * FROM users WHERE session_token = ? AND session_token IS NOT NULL', [token],
      (txObj, resultSet) => {
        let data = resultSet.rows._array;
        if (data.length) {
          targetUser = data[0];
          return user;
        } else {
          return null;
        }
      },
      (txObj, error) => console.log(error)
    );
  });
}


export const restoreSession = () => async dispatch => {
  // Search for the token in storage
    const token = await AsyncStorage.getItem("sessionToken");
  // search for a user with given token
    const user = await findUserByToken(token);

  // if token is found, log the user in
    if (user) {
      storeCurrentUser(user, token);
      dispatch(addCurrentUser(user)); 
    }
}

export const storeCurrentUser = async (user, sessionToken) => {
  if (user) {
    await AsyncStorage.setItem('sessionToken', sessionToken);
    db.transaction(tx => {
      tx.executeSql('UPDATE users SET session_token = ? WHERE id = ?', [sessionToken, user.id], 
        (txObj, resultSet) => {
          console.log('updated user with session token')
          },
        (txObj, error) => console.log(error)
      );
    });

  } else {
    await AsyncStorage.removeItem("sessionToken");
  }
};

let user;
let initialState = {};

const fixUser = async () => {
  let token = await AsyncStorage.getItem("sessionToken");
  user = await findUserByToken(token);
  initialState = { user: user};
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