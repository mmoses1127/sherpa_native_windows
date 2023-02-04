import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import AddTemp from "./AddTemp";
import AddSpeed from "./AddSpeed";


const AddSetting = ({db}) => {
  console.log('db in addsetting is', db)
  // const userType = useSelector(getCurrentUser).userType;
  const userType = 'A';

  if (userType ==='A') {
    return <AddTemp db={db}/>
  } else {
    return <AddSpeed db={db}/>
  }
}

export default AddSetting;