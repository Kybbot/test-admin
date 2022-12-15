interface Props {
  userId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  name?: string
}
export interface IVacation {
  personId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  name?: string;
}
export interface IVacations {
  [key: string]: IVacation[];
}
export const formatVacations = (arr: IVacations) => {
  const resultArray: IVacations = {
    vacations: [],
    holidays: [],
    sickLeaves: [],
  };
  Object.keys(arr).forEach((key) => {
    arr[key].forEach((day: Props) => {
      if (key === 'holidays' && day.date && day.name) {
        const date = day.date.split('/').reverse().join('.');
        resultArray[key].push({
          name: day.name,
          date,
        });
      } else {
        if (day.startDate) {
          resultArray[key].push({
            personId: day.userId,
            startDate: day.startDate,
            endDate: day.endDate,
          });
        }
        if (day.date) {
          resultArray[key].push({
            personId: day.userId,
            date: day.date,
          });
        }
      }
    });
  });
  return resultArray;
};
