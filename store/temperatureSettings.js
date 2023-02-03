import csrfFetch from './csrf.js';

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

export const deleteTemperatureSetting = (temperatureSettingId) => async dispatch => {
  const res = await csrfFetch(`/api/temperature_settings/${temperatureSettingId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeTemperatureSetting(temperatureSettingId))
  };
};

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
      return action.temperatureSettings;
    case ADD_TEMPERATURE_SETTING:
      return {...state, [action.temperatureSetting.id]: action.temperatureSetting};
    case REMOVE_TEMPERATURE_SETTING:
      let newState = {...state};
      delete newState[action.temperatureSettingId]  ;
      return newState;
    default:
      return state;
  }
}


export default temperatureSettingsReducer;