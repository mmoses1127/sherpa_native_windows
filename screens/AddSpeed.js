import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpeedSetting } from "../store/speedSettings";
import { findSpeedLabel, findUnitCookie } from "./Settings";
import { Button } from 'react-native';


const AddSpeed = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [speed, setSpeed] = useState(1);
  const unit = findUnitCookie('speed');

  const handleSave = (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !speed) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    const newSpeedSetting = {
      
      start_time: startTime,
      end_time: endTime,
      speed
    }
    const newItem = dispatch(createSpeedSetting(newSpeedSetting));
    if (newItem) {
      navigate('/');
    } else {
      alert('Item could not be created')
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between bg-lightBlue mb-5 min-w-[630px]">
        <form className="settings-form w-3/4 flex flex-col items-center justify-evenly p-5">
          <div className="w-full flex flex-row justify-between items-center">
            <label htmlFor="start-time" className="start-time-setting m-3 w-full text-slate-50">Start</label>
              <input onChange={e => setStartTime(e.target.value)} className="text-white bg-blue p-3 m-3 w-1/2 min-w-[130px]" type="time" name="start-time" id="start-time" value={startTime} />
          </div>
          <div className="w-full flex flex-row justify-between items-center">
          <label htmlFor="end-time" className="end-time-setting m-3 w-full">End</label>
            <input onChange={e => setEndTime(e.target.value)} className="bg-blue p-3 m-3 w-1/2 min-w-[130px]" type="time" name="end-time" id="end-time" value={endTime} />
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <label htmlFor="speed" className="speed-setting m-3  flex flex-row justify-between items-center" >Speed: {unit === 'Labels' ? findSpeedLabel(parseInt(speed)) : speed}</label>
            <input onChange={e => setSpeed(e.target.value)}className="bg-blue-500 m-3" type="range" name="speed" id="speed" min="1" max="3" value={speed} />
          </div>
        </form>
        <div className="clock-zone"></div>
      </div>
      {/* <button onClick={handleSave}>Save</button> */}
      <Button title="Save" onPress={handleSave} />
    </>
  );

}

export default AddSpeed;