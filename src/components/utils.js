import { DateTime } from "luxon";
export const convertDateTime = (date) => {
  const Date = DateTime.fromISO(date);
  const fullDate = Date.toFormat("yyyy/MM/dd");
  const fullTime = Date.toFormat("HH:mm:ss");
  return `${fullDate} ${fullTime}`;
};
