import csrfFetch from './csrf.js';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('example.db');

export const ADD_TEMPERATURE_SETTINGS = `ADD_TEMPERATURE_SETTINGS`;
export const ADD_TEMPERATURE_SETTING = `ADD_TEMPERATURE_SETTING`;
export const REMOVE_TEMPERATURE_SETTING = `REMOVE_TEMPERATURE_SETTING`;

const addTemperatureSettings = (temperatureSettings) => {
  return ({
    type: ADD_TEMPERATURE_SETTINGS,
    temperatureSettings
  });
};

const addTemperatureSetting = (temperatureSetting) => {
  return ({
    type: ADD_TEMPERATURE_SETTING,
    temperatureSetting
  });
};

const removeTemperatureSetting = (temperatureSettingId) => {
  return ({
    type: REMOVE_TEMPERATURE_SETTING,
    temperatureSettingId
  });
};

export const getTemperatureSettings = (state) => {
  if (!state.temperatureSettings) return [];
  let unsortedTemperatureSettings = Object.values(state.temperatureSettings);
  return unsortedTemperatureSettings.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1
    } else {
      return 1
    }
  })
};

export const getTemperatureSetting = temperatureSettingId => (state) => {
  if (!state.temperatureSettings) return null;
  return state.temperatureSettings[temperatureSettingId];
}

export const fetchTemperatureSettings = () => async dispatch => {
  db.transaction(tx => {
    tx.executeSql(
      `select * from temperature_settings`,
      null,
      (txtObj, resultSet) => {
        if (resultSet.rows._array.length) {
          let stateSlice = {};
          resultSet.rows._array.forEach(temperatureSetting => {
            stateSlice[temperatureSetting.id] = temperatureSetting;
          });
          dispatch(addTemperatureSettings(stateSlice));
        } else {
          console.log('no temperature settings found')
        }
      },
      (txtObj, error) => {
        console.log('error', error);
      }
    );
  });
};

export const fetchTemperatureSetting = (temperatureSettingId) => async dispatch => {
  db.transaction(tx => {
    tx.executeSql(
      `select * from temperature_settings where id = ?`,
      [temperatureSettingId],
      (txtObj, resultSet) => {
        if (resultSet.rows._array.length) {
          dispatch(addTemperatureSetting(resultSet.rows._array[0]))
        } else {
          console.log('no temperature setting found')
        }
      },
      (txtObj, error) => console.log('error', error)
    );
  });
};

export const deleteTemperatureSetting = (temperatureSettingId) => async dispatch => {
  db.transaction(tx => {
    tx.executeSql(
      `delete from temperature_settings where id = ?`,
      [temperatureSettingId],
      (txtObj, resultSet) => {
          dispatch(removeTemperatureSetting(temperatureSettingId))
          console.log('deleted temperature setting number ', temperatureSettingId)
      },
      (txtObj, error) => console.log('error', error)
    );
  });
};

export const createTemperatureSetting = (temperatureSetting) => async dispatch => {
  db.transaction(tx => { 
    tx.executeSql('INSERT INTO temperature_settings (start_time, end_time, temperature) values (?, ?, ?)', 
    [temperatureSetting.start_time, temperatureSetting.end_time, temperatureSetting.temperature],
    (txObj, resultSet) => {
      dispatch(addTemperatureSetting({...temperatureSetting, id: resultSet.insertId}))
    },
    (txObj, error) => {
      console.log('Error', error);
    }
    );
  });
};

export const updateTemperatureSetting = (temperatureSetting) => async dispatch => {

  db.transaction(tx => {
    console.log('updating temperature setting', temperatureSetting)
    tx.executeSql(
      `update temperature_settings set start_time = ?, end_time = ?, temperature = ? where id = ?`,
      [temperatureSetting.start_time, temperatureSetting.end_time, temperatureSetting.temperature, temperatureSetting.id],
      (txtObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          dispatch(addTemperatureSetting(temperatureSetting))
        } else {
          console.log('no temperature setting found')
        }
      },
      (txtObj, error) => console.log('error', error)
    );
  });
};

const temperatureSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEMPERATURE_SETTINGS:
      return action.temperatureSettings;
    case ADD_TEMPERATURE_SETTING:
      return {...state, [action.temperatureSetting.id]: action.temperatureSetting};
    case REMOVE_TEMPERATURE_SETTING:
      let newState = {...state};
      delete newState[action.temperatureSettingId];
      return newState;
    default:
      return state;
  }
}



export default temperatureSettingsReducer;