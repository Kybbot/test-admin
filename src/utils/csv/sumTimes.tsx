export const sumTimes = (time1: number[], time2: number[]) => {
  let hours; let
    minutes;
  hours = time1[0] + time2[0];
  minutes = time1[1] + time2[1];
  hours += Math.floor(minutes / 60);
  minutes %= 60;
  return [hours, minutes];
};
export default sumTimes;
