export const monthConversions = (monthString: string) => {
  switch (monthString) {
    case "01":
      return "Jan";
      break;
    case "02":
      return "Feb";
      break;
    case "03":
      return "Mar";
      break;
    case "04":
      return "Apr";
      break;
    case "05":
      return "May";
      break;
    case "06":
      return "Jun";
      break;
    case "07":
      return "Jul";
      break;
    case "08":
      return "Aug";
      break;
    case "09":
      return "Sep";
      break;
    case "10":
      return "Oct";
      break;
    case "11":
      return "Nov";
      break;
    case "12":
      return "Dec";
      break;
    default:
      "N/A";
  }
};
