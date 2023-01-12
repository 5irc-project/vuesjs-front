import moment from "moment";
import { DATE_FORMAT } from "@/utils/consts";

const formatDate = (date, format = DATE_FORMAT) => {
  if (date !== undefined) {
    return moment(date).format(format);
  }

  return '';
}

const formatTime = (timestamp) => {
  timestamp /= 1000;
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - (hours * 60);
  const seconds = timestamp % 60;

  return minutes.toString().padStart(2, '0') + ':' + Math.round(seconds).toString().padStart(2, '0');
}

export default {
  install(app) {
    app.config.globalProperties.$fd = formatDate;
    app.config.globalProperties.$ft = formatTime;
  }
}