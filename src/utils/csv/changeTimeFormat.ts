import { DataType } from '@/containers/Dashboard';

const changeTimeFormat = (data: DataType) => data.map((item) => {
  const time = item[3];
  const timestamp = +(+time).toFixed(2) * 60;
  const hours = Math.trunc(timestamp / 60);
  const minutes = parseFloat((timestamp % 60).toFixed());
  item[3] = [hours, minutes];
  return item;
});
export default changeTimeFormat;
