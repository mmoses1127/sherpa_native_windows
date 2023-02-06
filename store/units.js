import AsyncStorage from "@react-native-async-storage/async-storage";

export const ADD_UNITS = 'ADD_UNITS';
export const CHANGE_SPEED_UNIT = 'CHANGE_SPEED_UNIT';
export const CHANGE_TEMP_UNIT = 'CHANGE_TEMP_UNIT';


const changeSpeedUnit = (speedUnit) => {
  return {
    type: CHANGE_SPEED_UNIT,
    speedUnit
  }
};

const changeTempUnit = (tempUnit) => {
  return {
    type: CHANGE_TEMP_UNIT,
    tempUnit
  }
};

const addUnits = (units) => {
  return {
    type: ADD_UNITS,
    units
  }
};

export const getSpeedUnit = (state) => {
  if (!state.units) return 'Fahrenheit';
  return state.units.speedUnit;
};

export const getTempUnit = (state) => {
  if (!state.units) return 'Labels';
  return state.units.tempUnit;
};

export const fetchUnits = () => async dispatch => {
  const tempUnit = await AsyncStorage.getItem('tempUnit') || 'Fahrenheit';
  const speedUnit = await AsyncStorage.getItem('speedUnit') || 'Labels';
  dispatch(addUnits({tempUnit, speedUnit}));
};

export const updateSpeedUnit = (speedUnit) => async dispatch => {
  await AsyncStorage.setItem('speedUnit', speedUnit);
  dispatch(changeSpeedUnit(speedUnit));
};

export const updateTempUnit = (tempUnit) => async dispatch => {
  await AsyncStorage.setItem('tempUnit', tempUnit);
  dispatch(changeTempUnit(tempUnit));
};


const unitsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_UNITS:
      return action.units;
    case CHANGE_SPEED_UNIT:
      return {...state, speedUnit: action.speedUnit};
    case CHANGE_TEMP_UNIT:
      return {...state, tempUnit: action.tempUnit};
    default:
      return state;
  }
};


export default unitsReducer;