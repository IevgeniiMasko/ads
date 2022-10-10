export const timeAgoToDate = (timeAgo) => {
  try {
    let date = new Date();
    const timeAgoArr = timeAgo.split(" ");
    let agoMeasure;
    const agoNumber =
      timeAgoArr[0] === "an" || timeAgoArr[0] === "a"
        ? 1
        : Number(timeAgoArr[0]);
    if (timeAgoArr.includes("minute") || timeAgoArr.includes("minutes"))
      agoMeasure = "Minutes";
    if (timeAgoArr.includes("hour") || timeAgoArr.includes("hours"))
      agoMeasure = "Hours";
    if (timeAgoArr.includes("day") || timeAgoArr.includes("days"))
      agoMeasure = "Date";
    if (timeAgoArr.includes("month") || timeAgoArr.includes("months"))
      agoMeasure = "Month";

    date[`set${agoMeasure}`](date[`get${agoMeasure}`]() - agoNumber);
    date.setMinutes(0, 0);
    return date;
  } catch (error) {
    return "invalid date";
  }
};
