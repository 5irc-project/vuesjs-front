import moment from "moment";
import { DATE_FORMAT } from "@/utils/consts";

const formatDate = (date, format = DATE_FORMAT) => {
  if (date !== undefined) {
    return moment(date).format(format);
  }

  return '';
}

export default {
  install(app) {
    app.config.globalProperties.$d = formatDate;
  }
}