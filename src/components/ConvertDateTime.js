const ConvertDateTime = ({ date }) => {
  let fullDate = new Date(date);

  let twoDigitMonth =
    fullDate.getMonth().toString().length === 1
      ? `0${fullDate.getMonth()}`
      : fullDate.getMonth();

  let twoDigitDate =
    fullDate.getDay().toString().length === 1
      ? "0" + fullDate.getDay()
      : fullDate.getDay();

  let hour = `${fullDate.getHours() < 10 ? "0" : ""}${fullDate.getHours()}`;
  let min = `${fullDate.getMinutes() < 10 ? "0" : ""}${fullDate.getMinutes()}`;

  let sec = `${fullDate.getSeconds() < 10 ? "0" : ""}${fullDate.getSeconds()}`;

  let currentDate = `${fullDate.getFullYear()}/${twoDigitMonth}/${twoDigitDate} ${hour}:${min}:${sec}`;

  return currentDate;
};

export default ConvertDateTime;
