const formatTime = (time) => {
  // console.log(time)
  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  return hours + ':' + minutes;
};

export const convertToLocalTime = (time) => {
  let dateObject = new Date(time);
  let offset = dateObject.getTimezoneOffset();
  dateObject = new Date(dateObject.getTime() - (offset*60*1000));
  let convertedDate = dateObject.toISOString();
  return convertedDate;

  console.log(time)
  console.log(convertedDate)
}

export default formatTime;