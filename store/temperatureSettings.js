import csrfFetch from './csrf.js';
import * as SQLite from 'expo-sqlite';

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

// export const sqlFetchTemperatureSettings = (db) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       `select * from temperature_settings`,
//       null,
//       (txtObj, resultSet) => {
//         if (resultSet.rows._array.length) {
//           dispatch(addTemperatureSettings(resultSet.rows._array))
//         } else {
//           console.log('no temperature settings found')
//         }
//       },
//       (txtObj, error) => console.log('error', error)
//     );
//   });
// };

export const sqlFetchTemperatureSettings = () => async dispatch => {
  const db = await SQLite.openDatabase('example.db');
  db.transaction(tx => {
    tx.executeSql(
      `select * from temperature_settings`,
      null,
      (txtObj, resultSet) => {
        if (resultSet.rows._array.length) {
          dispatch(addTemperatureSettings(resultSet.rows._array))
        } else {
          console.log('no temperature settings found')
        }
      },
      (txtObj, error) => console.log('error', error)
    );
  });
  

  if (res.ok) {
    const temperatureSettings = await res.json();
    dispatch(addTemperatureSettings(temperatureSettings))
  };
};

export const fetchTemperatureSettings = () => async dispatch => {
  const res = await fetch(`/api/temperature_settings`);

  if (res.ok) {
    const temperatureSettings = await res.json();
    dispatch(addTemperatureSettings(temperatureSettings))
  };
};

export const fetchTemperatureSetting = (temperatureSettingId) => async dispatch => {
  const res = await csrfFetch(`/api/temperature_settings/${temperatureSettingId}`);

  if (res.ok) {
    const temperatureSetting = await res.json();
    dispatch(addTemperatureSetting(temperatureSetting))
  };
};

export const yoooo = () => 5;

export const sqlDeleteTemperatureSetting = (db, temperatureSettingId) => {
  db.transaction(tx => {
    tx.executeSql(
      `delete from temperature_settings where id = ?`,
      [temperatureSettingId],
      (txtObj, resultSet) => {
        if (resultSet.rows._array.length) {
          // dispatch(removeTemperatureSetting(temperatureSettingId))
          console.log('deleted temperature setting number ', temperatureSettingId)
        } else {
          console.log('no temperature setting found')
        }
      },
      (txtObj, error) => console.log('error', error)
    );
  }
  );
}

export const deleteTemperatureSetting = (temperatureSettingId) => async dispatch => {
  const res = await csrfFetch(`/api/temperature_settings/${temperatureSettingId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeTemperatureSetting(temperatureSettingId))
  };
};

export const sqlCreateTemperatureSetting = (temperatureSetting) => async dispatch => {
  const db = SQLite.openDatabase('example.db');

  db.transaction(tx => { 
    tx.executeSql('INSERT INTO temperature_settings (start_time, end_time, temperature) values (?, ?, ?)', 
    [temperatureSetting.start_time, temperatureSetting.end_time, temperatureSetting.temperature],
    (txObj, resultSet) => {
      console.log('resultobject', {...temperatureSetting, id: resultSet.insertId});
      dispatch(addTemperatureSetting({...temperatureSetting, id: resultSet.insertId}))
    },
    (txObj, error) => {
      console.log('Error', error);
    }
    );
  });

  db.transaction(tx => {
    console.log('selecting temp items...')
    tx.executeSql('SELECT * FROM temperature_settings', null,
      (txObj, resultSet) => {
        console.log(resultSet.rows._array)
      },
      (txObj, error) => console.log(error)
    );
  });

}


export const createTemperatureSetting = (temperatureSetting) => async dispatch => {
  const res = await csrfFetch(`/api/temperature_settings`, {
    method: 'POST',
    body: JSON.stringify(temperatureSetting)
  });

  if (res.ok) {
    const newTemperatureSetting = await res.json();
    dispatch(addTemperatureSetting(newTemperatureSetting));
    return newTemperatureSetting;
  } else {
    const errors = await res.json();
    alert(errors);
    return null;
  }
};

export const updateTemperatureSetting = (temperatureSetting) => async dispatch => {
  const res = await csrfFetch(`/api/temperature_settings/${temperatureSetting.id}`, {
    method: 'PATCH',
    body: JSON.stringify(temperatureSetting)
  });

  if (res.ok) {
    const updatedTemperatureSetting = await res.json();
    dispatch(addTemperatureSetting(updatedTemperatureSetting));
    return updatedTemperatureSetting;
  } else {
    const errors = await res.json();
    alert(errors)
    return null;
  }
};

const temperatureSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEMPERATURE_SETTINGS:
      console.log('ADDING TEMP')
      return action.temperatureSettings;
    case ADD_TEMPERATURE_SETTING:
      return {...state, [action.temperatureSetting.id]: action.temperatureSetting};
    case REMOVE_TEMPERATURE_SETTING:
      console.log('REMOVING TEMP')
      let newState = {...state};
      delete newState[action.temperatureSettingId]  ;
      return newState;
    default:
      return state;
  }
}


export default temperatureSettingsReducer;