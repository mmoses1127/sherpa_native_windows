import csrfFetch from './csrf.js';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('example.db');

export const ADD_SPEED_SETTINGS = `ADD_SPEED_SETTINGS`;
export const ADD_SPEED_SETTING = `ADD_SPEED_SETTING`;
export const REMOVE_SPEED_SETTING = `REMOVE_SPEED_SETTING`;

const addSpeedSettings = (speedSettings) => {
  return ({
    type: ADD_SPEED_SETTINGS,
    speedSettings
  });
};

const addSpeedSetting = (speedSetting) => {
  return ({
    type: ADD_SPEED_SETTING,
    speedSetting
  });
};

const removeSpeedSetting = (speedSettingId) => {
  return ({
    type: REMOVE_SPEED_SETTING,
    speedSettingId
  });
};

export const getSpeedSettings = (state) => {
  if (!state.speedSettings) return [];
  let unsortedSpeedSettings = Object.values(state.speedSettings);
  return unsortedSpeedSettings.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1
    } else {
      return 1
    }
  })
};

export const getSpeedSetting = speedSettingId => (state) => {
  if (!state.speedSettings) return null;
  return state.speedSettings[speedSettingId];
}

export const fetchSpeedSettings = () => async dispatch => {
  db.transaction(tx => {
    tx.executeSql(
      `select * from speed_settings`,
      null,
      (txtObj, resultSet) => {
        if (resultSet.rows._array.length) {
          let stateSlice = {};
          resultSet.rows._array.forEach(speedSetting => {
            stateSlice[speedSetting.id] = speedSetting;
          });
          dispatch(addSpeedSettings(stateSlice));
        } else {
          console.log('no speed settings found')
        }
      },
      (txtObj, error) => {
        console.log('error', error);
      }
    );
  });
};

export const fetchSpeedSetting = (speedSettingId) => async dispatch => {
  db.transaction(tx => {
    tx.executeSql(
      `select * from speed_settings where id = ?`,
      [speedSettingId],
      (txtObj, resultSet) => {
        if (resultSet.rows._array.length) {
          dispatch(addSpeedSetting(resultSet.rows._array[0]))
        } else {
          console.log('no speed setting found')
        }
      },
      (txtObj, error) => console.log('error', error)
    );
  });
};

export const deleteSpeedSetting = (speedSettingId) => async dispatch => {
  db.transaction(tx => {
    tx.executeSql(
      `delete from speed_settings where id = ?`,
      [speedSettingId],
      (txtObj, resultSet) => {
          dispatch(removeSpeedSetting(speedSettingId))
          console.log('deleted speed setting number ', speedSettingId)
      },
      (txtObj, error) => console.log('error', error)
    );
  });
};

export const createSpeedSetting = (speedSetting) => async dispatch => {
  speedSetting.start_time = speedSetting.start_time.toISOString();
  speedSetting.end_time = speedSetting.end_time.toISOString();
  db.transaction(tx => { 
    tx.executeSql('INSERT INTO speed_settings (start_time, end_time, speed) values (?, ?, ?)', 
    [speedSetting.start_time, speedSetting.end_time, speedSetting.speed],
    (txObj, resultSet) => {
      dispatch(addSpeedSetting({...speedSetting, id: resultSet.insertId}))
    },
    (txObj, error) => {
      console.log('Error', error);
    }
    );
  });
};

export const updateSpeedSetting = (speedSetting) => async dispatch => {
  db.transaction(tx => {
    console.log('updating speed setting', speedSetting)
    tx.executeSql(
      `update speed_settings set start_time = ?, end_time = ?, speed = ? where id = ?`,
      [speedSetting.start_time, speedSetting.end_time, speedSetting.speed, speedSetting.id],
      (txtObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          dispatch(addSpeedSetting(speedSetting))
        } else {
          console.log('no speed setting found')
        }
      },
      (txtObj, error) => console.log('error', error)
    );
  });
};

const speedSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SPEED_SETTINGS:
      return action.speedSettings;
    case ADD_SPEED_SETTING:
      return {...state, [action.speedSetting.id]: action.speedSetting};
    case REMOVE_SPEED_SETTING:
      let newState = {...state};
      delete newState[action.speedSettingId]  ;
      return newState;
    default:
      return state;
  }
}


export default speedSettingsReducer;