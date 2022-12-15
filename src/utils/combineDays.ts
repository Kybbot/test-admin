import moment from 'moment';

export type GetKey<T> = (data: T) => string;

interface Accumulator<T> {
  newDates: T[],
  count: number,
}

export const combineDays = <T>(
  dates: T[],
  getKey: GetKey<T>,
  getSecondKey?: GetKey<T>,
) => dates.reduce<Accumulator<T[]>>(
    (acc, item, i) => {
      if (!i) {
        acc.newDates[acc.count] = [item];
        return acc;
      }
      const lastElement = acc.newDates[acc.count][acc.newDates[acc.count].length - 1];

      if (
        lastElement
          && moment(getKey(item))
            .subtract('1', 'day')
            .isSame(
              moment(
                getSecondKey ? getSecondKey(lastElement) : getKey(lastElement),
              ),
            )
      ) {
        acc.newDates[acc.count].push(item);
        return acc;
      }
      if (
        lastElement
          && moment(getKey(item)).day() === 1
          && moment(getKey(item))
            .subtract('3', 'day')
            .isSame(
              moment(
                getSecondKey ? getSecondKey(lastElement) : getKey(lastElement),
              ),
            )
      ) {
        acc.newDates[acc.count].push(item);
        return acc;
      }
      acc.newDates[acc.count + 1] = [];
      acc.newDates[acc.count + 1].push(item);
      acc.count += 1;
      return acc;
    },
    { newDates: [], count: 0 },
  );
