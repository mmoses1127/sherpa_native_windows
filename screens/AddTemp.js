import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTemperatureSetting } from "../store/temperatureSettings";
import { convertFtoC, findUnitCookie } from "./Settings";
import { Button } from 'react-native';


const AddTemp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [temperature, setTemperature] = useState('');
  const unit = findUnitCookie('temp').slice(0,1);

  useEffect(() => {
    if (unit === 'F') {
      if (temperature > 212) setTemperature(212);
    } else {
      if (temperature < 0) setTemperature(0);
      if (temperature > 100) setTemperature(100);
    }
  }, [temperature, unit]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !temperature) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    if (unit === 'F' && (temperature < 32 || temperature > 212)) {
      alert('Temperature must be between 32 and 212')
      return;
    }

    if (unit === 'C' && (temperature < 0 || temperature > 100)) {
      alert('Temperature must be between 0 and 100')
      return;
    }

    const newTemperatureSetting = {
      start_time: startTime,
      end_time: endTime,
      temperature: unit === 'F' ? convertFtoC(temperature) : temperature
    }
    const newItem = dispatch(createTemperatureSetting(newTemperatureSetting));
    if (newItem) {
      navigate('/');
    } else {
      alert('Item could not be created')
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between bg-lightBlue mb-5 min-w-[630px]">
        <form className="settings-form flex flex-col items-center justify-evenly p-5">
          <div className="w-full flex flex-row justify-between items-center">
            <label htmlFor="start-time" className="start-time-setting m-3 w-full text-slate-50">Start</label>
              <input onChange={e => setStartTime(e.target.value)} className="text-white bg-blue p-3 m-3 w-1/2 min-w-[130px]" type="time" name="start-time" id="start-time" value={startTime} />
          </div>
          <div className="w-full flex flex-row justify-between items-center">
          <label htmlFor="end-time" className="end-time-setting m-3 w-full">End</label>
            <input onChange={e => setEndTime(e.target.value)} className="bg-blue p-3 m-3 w-1/2 min-w-[130px]" type="time" name="end-time" id="end-time" value={endTime} />
          </div>
          <div className="w-full flex flex-row justify-between items-center">
          <label htmlFor="temp" className="temp-setting m-3 w-full">Temperature ({unit})</label>
            <input onChange={e => setTemperature(e.target.value)}className="bg-blue p-3 m-3 w-1/2 min-w-[130px]" min={unit === 'F' ? '32' : '0'} max={unit === 'F' ? '212' : '100'} type="number" step="0.1" name="temp" id="temp" value={temperature} />

          </div>
        </form>
        <div className="clock-zone"></div>
      </div>
      {/* <button onClick={handleSave}>Save</button> */}
      <Button title="Save" onPress={handleSave} />
    </>
  );

}

export default AddTemp;