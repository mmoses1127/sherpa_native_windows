import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { findUnitCookie, findSpeedLabel } from "./Settings";
import { getSpeedSetting, fetchSpeedSetting, updateSpeedSetting } from "../store/speedSettings";


const EditSpeed = () => {

  const {speedItemId} = useParams(); 
  const speedSetting = useSelector(getSpeedSetting(speedItemId));
  const dispatch = useDispatch();
  const history = useHistory();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const unit = findUnitCookie();
  const [speed, setSpeed] = useState('');


  useEffect(() => {
    dispatch(fetchSpeedSetting(speedItemId))
  }, [dispatch, speedItemId]);

  useEffect(() => {
    if (speedSetting) {
      setStartTime(speedSetting.startTime.slice(11, 16));
      setEndTime(speedSetting.endTime.slice(11, 16));
      setSpeed(speedSetting.speed);
    }
  }, [speedSetting]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !speed) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    const updatedSpeedSetting = {
      id: speedItemId,
      start_time: startTime,
      end_time: endTime,
      speed: unit === 'Labels' ? speed : speed
    }
    const updatedItem = await dispatch(updateSpeedSetting(updatedSpeedSetting));
    if (updatedItem) {
      history.push('/');
    } else {
      alert('Item could not be updated')
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
      <button onClick={handleUpdate}>Save</button>
    </>
  );

};


export default EditSpeed;