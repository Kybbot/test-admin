import React, { SetStateAction } from 'react';
import { DataType, IDataBase } from '@/containers/Dashboard';
import { IPerson } from '@/components/csvTable/Person';
import sumTimes from '@/utils/csv/sumTimes';

const FormatPersonsAndContracts = (
  data: DataType,
  setPersonsAndContracts: React.Dispatch<SetStateAction<IPerson[]>>,
  database: IDataBase,
) => {
  const findObj = (id: string) => (database[id]?.avatar ? database[id].avatar : undefined);
  const findId = (id: string) => (database[id]?.adminId ? database[id].adminId : '0');
  const SortArray = (x: IPerson, y: IPerson) => {
    if (x.name < y.name) return -1;
    if (x.name > y.name) return 1;
    return 0;
  };
  let uniquePersons: string[] = [];
  data.forEach((item) => {
    uniquePersons.push(item[1]);
  });
  uniquePersons = [...Array.from(new Set(uniquePersons))];
  let personsObjects: IPerson[] = [];
  uniquePersons.forEach((person) => {
    let personId: RegExpMatchArray | string | null = person.match(/\(\w+\)/);
    personId = personId ? personId[0].replace(/[()]/g, '') : 'id_was_not_found';
    personsObjects.push({
      id: personId,
      name: person.replace(/\(\w+\)/, ' ').trim(),
      contracts: [],
      totalMoney: 0,
      totalHours: [0, 0],
      avatar: findObj(personId),
      adminId: findId(personId),
    });
  });
  data.forEach((item) => {
    personsObjects.forEach((person) => {
      if (person.name === item[1].replace(/\(\w+\)/, ' ').trim()) {
        const element = person.contracts.find((i) => i.name === item[2].replace(/\(\w+\)/, ' ').trim());
        if (element) {
          element.dates.push({
            date: new Date(item[0]).getDay() === 0 ? 7 : new Date(item[0]).getDay(),
            hours: item[3],
            money: item[4],
          });
          element.totalMoney = +(+element.totalMoney + +item[4]).toFixed(2);
          const personTemp = person;
          personTemp.totalMoney = +(+person.totalMoney + +item[4]).toFixed(2);
          element.totalHours = sumTimes(element.totalHours, item[3]);
          personTemp.totalHours = sumTimes(person.totalHours, item[3]);
        } else {
          let id: RegExpMatchArray | string | null = item[2].match(/\(\w+\)/);
          id = id ? id[0].replace(/[()]/g, '') : 'id_was_not_found';
          person.contracts.push({
            name: item[2].replace(/\(\w+\)/, ' ').trim(),
            id,
            dates: [
              {
                date: new Date(item[0]).getDay() === 0 ? 7 : new Date(item[0]).getDay(),
                hours: item[3],
                money: item[4],
              },
            ],
            totalMoney: item[4] ? item[4] : 0,
            totalHours: item[3] ? item[3] : [0, 0],
          });
          const personTemp = person;
          personTemp.totalMoney = +(+person.totalMoney + +item[4]).toFixed(2);
          personTemp.totalHours = sumTimes(person.totalHours, item[3]);
        }
      }
    });
  });
  personsObjects = personsObjects.sort(SortArray);
  setPersonsAndContracts(personsObjects);
  return personsObjects;
};

export default FormatPersonsAndContracts;
