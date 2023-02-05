import { useSelector } from "react-redux";
import { getCurrentUser, getUserType } from "../store/session";
import AddTemp from "./AddTemp";
import AddSpeed from "./AddSpeed";


const AddSetting = () => {

  const userType = useSelector(getUserType);

  if (userType ==='A') {
    return <AddTemp/>
  } else {
    return <AddSpeed/>
  }
}

export default AddSetting;