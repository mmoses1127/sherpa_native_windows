import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../store/session";

export const findUnitCookie = (type) => {
  const targetCookie = type === 'temp' ? 'tempUnit' : 'speedUnit';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0].trim() === targetCookie) {
      return cookie[1];
    }
  }
  return 'Fahrenheit';
};

export const convertCtoF = (temp) => {
  return Math.round(((temp * 9/5) + 32) * 10) / 10;
};

export const convertFtoC = (temp) => {
  return Math.round(((temp - 32) * 5/9) * 10) / 10;
};

export const speedLabels = {
  'Low': 1,
  'Medium': 2,
  'High': 3
}

export const findSpeedLabel = (speedNumber) => {
  for (let key in speedLabels) {
    if (speedLabels[key] === speedNumber) {
      return key;
    }
  }
}

const Settings = () => {

  const navigate = useNavigate();
  // const userType = useSelector(getCurrentUser).userType;
  const userType = 'A';

  const [tempUnit, setTempUnit] = useState(findUnitCookie('temp'));
  const [speedUnit, setSpeedUnit] = useState(findUnitCookie('speed'));

  useEffect(() => {
    let button1;
    let button2;

    if (userType === 'A') {
      button1 = document.getElementById('farhenheit-button');
      button2 = document.getElementById('celcius-button');
    } else {
      button1 = document.getElementById('numbers-button');
      button2 = document.getElementById('labels-button');
    }

    if ((userType === 'A' && tempUnit === 'Fahrenheit') || (userType === 'B' && speedUnit === 'Numbers')) {
      button1.style.backgroundColor = 'rgb(36, 175, 233)';
      button1.style.color = 'white';
      button1.innerHTML = userType === 'A' ? 'Fahrenheit &#x2713;' : 'Numbers &#x2713;'
      button2.style.backgroundColor = 'rgb(209, 209, 209)';
      button2.style.color = 'black';
      button2.innerHTML = userType === 'A' ? 'Celcius' : 'Labels';
    } else {
      button1.style.backgroundColor = 'rgb(209, 209, 209)';
      button1.style.color = 'black';
      button1.innerHTML = userType === 'A' ? 'Fahrenheit' : 'Numbers';
      button2.style.backgroundColor = 'rgb(36, 175, 233)';
      button2.style.color = 'white';
      button2.innerHTML = userType === 'A' ? 'Celcius &#x2713;' : 'Labels &#x2713;'
    }
    
  }, [tempUnit, speedUnit, userType]);


  const handleSelect = (e) => {
    e.preventDefault();
    let unit = e.target.innerHTML.split(' ')[0];
    if (userType === 'A') {
      setTempUnit(unit);
    } else {
      setSpeedUnit(unit);
    }
  };
  
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/')
  };
  
  const handleSave = (e) => {
    e.preventDefault();
    if (userType === 'A') {
      document.cookie = `tempUnit=${tempUnit}; path=/; max-age=31536000; SameSite=Lax; Secure;`
    } else {
      document.cookie = `speedUnit=${speedUnit}; path=/; max-age=31536000; SameSite=Lax; Secure;`
    }
    navigate('/')
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-3/4'>
      <h1 className='text-xl mb-10'>{userType === 'A' ? 'Select Temperature Units' : 'Select Intensity Display Mode'}</h1>
      <div className="h-3/4 flex flex-col items-center justify-between">
        {userType === 'A' &&
        <div className="mb-10">
        <button id="farhenheit-button" className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Fahrenheit </button>
        <button id="celcius-button"className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Celcius</button>
        </div>
        }

        {userType === 'B' &&
        <div className="mb-10">
        <button id="numbers-button" className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Numbers</button>
        <button id="labels-button"className='bg-slate-200 text-black min-w-[150px] h-12' onClick={handleSelect}>Labels</button>
        </div>
        }

        <div className="flex flex-row justify-center items-center">
          <button onClick={handleCancel} className="m-3 bg-slate-200 text-black  min-w-[100px] h-12">Cancel</button>
          <button onClick={handleSave} className="m-3  min-w-[100px] h-12">Save</button>
        </div>
      </div>
    </div>
  )

}

export default Settings;