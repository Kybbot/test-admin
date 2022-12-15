import React from 'react';
import { DataType } from '@/containers/Dashboard';
import getDateInterval from '@/utils/csv/getDateInterval';
import { formatVacations, IVacation, IVacations } from '@/utils/csv/formatVacations';

const weeksPagination = async (
  data: DataType,
  setWeeks: React.Dispatch<any>,
  setVacations: React.Dispatch<React.SetStateAction<IVacations[]>>,
) => {
  const arrayOfDates = data.map((item) => new Date(item[0]).getTime());
  const dateMin = Math.min.apply(null, arrayOfDates);
  const dateMax = Math.max.apply(null, arrayOfDates);
  const weeksCount = Math.ceil(((dateMax - dateMin) / 1000 / 60 / 60 / 24 + 1) / 7);
  const obj: Array<{
    startDay: Date,
    endDay: Date,
  }> = [];
  let tempDate = dateMin;
  for (let i = 0; i < weeksCount; i += 1) {
    const startDay = new Date(tempDate);
    const tempStart = new Date(startDay);
    tempStart.setDate(startDay.getDate() - (startDay.getDay() - 1));
    const endDay = new Date(startDay.getTime());
    if (startDay.getDay() !== 0) {
      endDay.setDate(startDay.getDate() + (7 - startDay.getDay()));
    }
    obj.push({
      startDay: i === 0 ? tempStart : new Date(startDay),
      endDay,
    });
    const temp = new Date(endDay);
    temp.setDate(endDay.getDate() + 1);
    tempDate = temp.getTime();
  }
  let vac = await getDateInterval(new Date(dateMin), new Date(dateMax));
  vac = formatVacations(vac);
  const finalVacations: any[] = [];
  for (let i = 0; i < obj.length; i += 1) {
    finalVacations.push({
      vacations: [],
      holidays: [],
      sickLeaves: [],
    });
    Object.keys(vac).forEach((key) => {
      vac[key].forEach((v: IVacation) => {
        if (key === 'vacations') {
          const startDay = new Date(v.startDate!);
          const endDay = new Date(v.endDate!);
          const objStart = obj[i].startDay;
          const objEnd = obj[i].endDay;
          if (startDay < objStart) {
            if (endDay >= objStart) {
              if (endDay > objEnd) {
                finalVacations[i][key].push({
                  personId: v.personId,
                  startDate: objStart.getTime(),
                  endDate: objEnd.getTime(),
                });
              } else {
                finalVacations[i][key].push({
                  personId: v.personId,
                  startDate: objStart.getTime(),
                  endDate: endDay.getTime(),
                });
              }
            }
          } else if (endDay >= objStart && endDay <= objEnd) {
            if (endDay > objEnd) {
              finalVacations[i][key].push({
                personId: v.personId,
                startDate: startDay.getTime(),
                endDate: objEnd.getTime(),
              });
            } else {
              finalVacations[i][key].push({
                personId: v.personId,
                startDate: startDay.getTime(),
                endDate: endDay.getTime(),
              });
            }
          }
        } else if (new Date(v.date!) >= obj[i].startDay && new Date(v.date!) <= obj[i].endDay) {
          finalVacations[i][key].push(v);
        }
      });
    });
  }
  setVacations(finalVacations);
  setWeeks(obj);
};

export default weeksPagination;
