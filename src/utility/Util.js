import { useHistory, useLocation } from "react-router-dom";
import Consts from "./Consts";
import CryptoJS from "crypto-js";
import Configure from "../configure";
import { DateTime } from "luxon";

const regexEmail = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
const regexNumber = "^[0-9]{8}$";

export function useQuery() {
  const location = useLocation();
  const history = useHistory();

  function getQuery() {
    return new URLSearchParams(location.search);
  }

  function removeQuery(key) {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(key)) {
      queryParams.delete(key);
      history.replace({
        search: queryParams.toString(),
      });
    }
  }

  function addQuery(key, value) {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(key, value);
    history.replace({
      search: queryParams.toString(),
    });
  }

  function addQuerys(querys) {
    const queryParams = new URLSearchParams(location.search);
    Object.keys(querys).map((key) => {
      queryParams.set(key, querys[key]);
      return null;
    });
    history.replace({
      search: queryParams.toString(),
    });
  }

  return { getQuery, removeQuery, addQuery, addQuerys };
}

export function mailNumber(mailNumber) {
  if (mailNumber.match(regexEmail)) {
    let arry = mailNumber.split("@");
    let name = arry[0].split("");
    for (let i = 2; i < name.length - 1; i++) {
      name[i] = "*";
    }
    arry[0] = name.join("");
    mailNumber = arry[0] + "@" + arry[1];
    return mailNumber;
  } else if (mailNumber.match(regexNumber)) {
    let arry = mailNumber.split("");
    for (let i = 2; i < arry.length - 3; i++) {
      arry[i] = "*";
    }
    mailNumber = arry.join("");
    return mailNumber;
  } else {
    return alert("Мэйл эсвэл утасны дугаар оруулна уу");
  }
}

export function checkUsernameType(mailNumber) {
  if (mailNumber.match(regexEmail)) {
    return Consts.typeEmail;
  } else if (mailNumber.match(regexNumber)) {
    return Consts.typePhoneNumber;
  } else {
    return Consts.typeMismatch;
  }
}

export function number(number) {
  let regexNumber = "^[0-9]+$";
  if (number.match(regexNumber)) {
    return number;
  } else {
    return alert("Зөвхөн тоо бичнэ үү");
  }
}

export function name(name) {
  let regexName = /^[A-Za-z]+$/;
  if (name.match(regexName)) {
    return name;
  } else {
    return alert("Хэрэглэгчийн нэр зөвхөн том жижиг үсгээс бүрдсэн");
  }
}

export function mergeDate(year, month, day) {
  return year + "-" + month + "-" + day;
}

export function unmergeDate(date) {
  let returnDate = {
    year: "",
    month: "",
    day: "",
  };

  if (date) {
    let splitedDate = date.split("-");

    returnDate = {
      year: splitedDate[0],
      month: splitedDate[1],
      day: splitedDate[2],
    };
  }

  return returnDate;
}

export function isFilledObj(obj) {
  return Object.keys(obj).length > 0;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function generateFileUrl(file) {
  if (file)
    return (
      "https://" +
      file.bucket +
      ".s3." +
      file.region +
      ".amazonaws.com/" +
      file.level +
      "/" +
      file.id +
      "." +
      file.ext
    );
  return null;
}

export function decodeURL(string) {
  let id = CryptoJS.AES.decrypt(
    decodeURIComponent(string),
    Configure.urlEncodeKey
  ).toString(CryptoJS.enc.Utf8);
  return id;
}

export function encodeURL(string) {
  return encodeURIComponent(
    CryptoJS.AES.encrypt(string, Configure.urlEncodeKey)
  );
}

// Postiin uussen ognoog ni stringeer avch heden second/minute/tsagiin/odriin omno uussniig stringeer butsaadag funkts
export function generateTimeAgo(date) {
  const postdate = DateTime.fromISO(date);
  const today = DateTime.now();
  const diff = today.diff(postdate, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ]);
  if (diff.years !== 0 || diff.months !== 0) {
    return postdate.toLocaleString();
  } else if (diff.days !== 0) {
    return diff.days + " өдрийн өмнө";
  } else if (diff.hours !== 0) {
    return diff.hours + " цагийн өмнө";
  } else if (diff.minutes !== 0) {
    return diff.minutes + " минутын өмнө";
  } else if (diff.seconds !== 0) {
    return diff.seconds + " секундын өмнө";
  } else {
    return "Саяхан";
  }
}

export function checkUser(user) {
  if (!user) {
    return false;
  } else {
    if (!user.sysUser) {
      return false;
    }
  }

  return true;
}

export function closeModal(history, state) {
  if (state && state.background) {
    history.goBack();
  } else {
    history.replace("/");
  }
}

export function checkUsername(username) {
  let usrname = username;

  if (checkUsernameType(usrname) === Consts.typePhoneNumber) {
    usrname = "+976" + usrname;
  }

  return usrname;
}

let object = {
  useQuery,
  mailNumber,
  name,
  number,
  mergeDate,
  unmergeDate,
  checkUsernameType,
  checkUsername,
  getRandomInt,
  generateFileUrl,
  checkUser,
  closeModal,
};
export default object;

