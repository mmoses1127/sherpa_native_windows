import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSpeedSetting } from "../store/speedSettings";
import { findUnitCookie, findSpeedLabel, fetchUnit } from "./Settings";

const SpeedItem = ({speedSetting}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = 'A';
  const [speedUnit, setSpeedUnit] = useState('Labels');
  const speed = speedUnit === 'Labels' ? findSpeedLabel(speedSetting.speed) : speedSetting.speed;

  useEffect(() => {

    const setUnit = async () => {
      console.log('setting unit...')
      let unit = await fetchUnit(userType);
      console.log('unit is', unit)
      setSpeedUnit(unit);
    }

    setUnit();

  }, [userType]);

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
    <View className="flex flex-row justify-between items-center bg-cyan-300 m-3 h-12 p-3 w-[90%] min-w-[300px]" key={temperatureSetting.id}>
      <Text>Start: {String(temperatureSetting.start_time).slice(11,16)}  End: {String(temperatureSetting.end_time).slice(11,16)}  Speed: {speed}</Text>
      <View className="flex flex-row items-center ml-2 w-[80px] h-10">
        <Button color='red' title="Delete" onPress={handleDelete} />
        <Button title="Edit" onPress={handleUpdate} />
      </View>
    </View>
  )

}

export default SpeedItem;