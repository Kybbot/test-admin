export const subtractTimes = (time1: number[], time2: number[]) => {
  const timestamp = (time1[0] * 60 + time1[1]) - (time2[0] * 60 + time2[1]);
  const hours = Math.trunc(timestamp / 60);
  const minutes = parseFloat((timestamp % 60).toFixed());
  return [hours, minutes];
};

export default subtractTimes;
