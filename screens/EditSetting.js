import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import EditTemp from "./AddTemp";
import EditSpeed from "./AddSpeed";


const EditSetting = () => {

  const userType = useSelector(getCurrentUser).userType;

  if (userType ==='A') {
    return <EditTemp/>
  } else {
    return <EditSpeed/>
  }
}

export default EditSetting;