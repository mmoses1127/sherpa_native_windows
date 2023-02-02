import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import AddTemp from "./AddTemp";
import AddSpeed from "./AddSpeed";


const AddSetting = () => {

  // const userType = useSelector(getCurrentUser).userType;
  const userType = 'A';

  if (userType ==='A') {
    return <AddTemp/>
  } else {
    return <AddSpeed/>
  }
}

export default AddSetting;