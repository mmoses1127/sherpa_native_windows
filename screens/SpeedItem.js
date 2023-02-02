import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSpeedSetting } from "../store/speedSettings";
import { findUnitCookie, findSpeedLabel } from "./Settings";

const SpeedItem = ({speedSetting}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unit = findUnitCookie('Speed');
  const speed = unit === 'Labels' ? findSpeedLabel(speedSetting.speed) : speedSetting.speed;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpeedSetting(speedSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate(`/speeds/${speedSetting.id}`)
  };

  return (
    <div className="flex flex-row justify-between items-center bg-lightBlue m-3 h-12 p-3 min-w-[600px]" key={speedSetting.id}>
      <p>Start: {speedSetting.startTime.slice(11,16)}  End: {speedSetting.endTime.slice(11,16)}  Intensity: {speed}</p>
      <div className="ml-15">
        <button onClick={handleDelete} className="bg-red m-3">Delete</button>
        <button onClick={handleUpdate} className="m-3 bg-blue">Edit</button>
      </div>
    </div>
  )

}

export default SpeedItem;