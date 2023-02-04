import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import AddTemp from "./AddTemp";
import AddSpeed from "./AddSpeed";


const AddSetting = () => {

  const userType = useSelector(getCurrentUser).user_type;

  if (userType ==='A') {
    return <AddTemp/>
  } else {
    return <AddSpeed/>
  }
}

export default AddSetting;