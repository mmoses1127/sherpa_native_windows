import csrfFetch from './csrf.js';

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
  const res = await fetch(`/api/speed_settings`);

  if (res.ok) {
    const speedSettings = await res.json();
    dispatch(addSpeedSettings(speedSettings))
  };
};

export const fetchSpeedSetting = (speedSettingId) => async dispatch => {
  const res = await csrfFetch(`/api/speed_settings/${speedSettingId}`);

  if (res.ok) {
    const speedSetting = await res.json();
    dispatch(addSpeedSetting(speedSetting))
  };
};

export const deleteSpeedSetting = (speedSettingId) => async dispatch => {
  const res = await csrfFetch(`/api/speed_settings/${speedSettingId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeSpeedSetting(speedSettingId))
  };
};

export const createSpeedSetting = (speedSetting) => async dispatch => {
  const res = await csrfFetch(`/api/speed_settings`, {
    method: 'POST',
    body: JSON.stringify(speedSetting)
  });

  if (res.ok) {
    const newSpeedSetting = await res.json();
    dispatch(addSpeedSetting(newSpeedSetting));
    return newSpeedSetting;
  } else {
    const errors = await res.json();
    alert(errors);
    return null;
  }
};

export const updateSpeedSetting = (speedSetting) => async dispatch => {
  const res = await csrfFetch(`/api/speed_settings/${speedSetting.id}`, {
    method: 'PATCH',
    body: JSON.stringify(speedSetting)
  });

  if (res.ok) {
    const updatedSpeedSetting = await res.json();
    dispatch(addSpeedSetting(updatedSpeedSetting));
    return updatedSpeedSetting;
  } else {
    const errors = await res.json();
    alert(errors)
    return null;
  }
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