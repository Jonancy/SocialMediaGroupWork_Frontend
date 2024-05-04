import moment from "moment";

export default function TimeConverter(date) {
  return moment(date).fromNow();
}
