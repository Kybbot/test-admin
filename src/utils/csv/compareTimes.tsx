const compareTimes = (time1: number[], time2: number[]) => {
  const timestamp1 = time1[0] * 60 + time1[1];
  const timestamp2 = time2[0] * 60 + time2[1];
  let compare;
  if (timestamp1 > timestamp2) {
    compare = 1;
  } else if (timestamp1 < timestamp2) {
    compare = -1;
  } else {
    compare = 0;
  }
  return compare;
};

export const formatTime = (time: string) => {
  const timestamp = +(+time).toFixed(2) * 60;
  const hours = Math.trunc(timestamp / 60);
  const minutes = parseFloat((timestamp % 60).toFixed());
  return [hours, minutes];
};

export default compareTimes;
