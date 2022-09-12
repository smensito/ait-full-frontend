import Moment from "moment";

function FormatDate(date: Date) {
  const formatDate = Moment().format("DD-MM-YYYY");

  return formatDate;
}

export default FormatDate;
