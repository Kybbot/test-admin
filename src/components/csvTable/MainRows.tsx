import React from 'react';
import styled from 'styled-components';
import { IVacations } from '@/utils/csv/formatVacations';
import DatesFunc from '@/components/csvTable/DatesFunc';
import HoursAndDollars from '@/components/csvTable/HoursAndDollars';
import Person, { IContract, IPerson } from '@/components/csvTable/Person';
import { IContractDataBase } from '@/containers/Dashboard';
import compareTimes, { formatTime } from '@/utils/csv/compareTimes';
import UnworkedHours from '@/components/csvTable/UnworkedHours';
import subtractTimes from '@/utils/csv/subtractTimes';
import sumTimes from '@/utils/csv/sumTimes';

interface Props {
  personsAndContracts: IPerson[];
  vacations: IVacations;
  contracts: IContractDataBase[];
}
const MainRows: React.FC<Props> = ({ personsAndContracts, vacations, contracts }) => {
  const daysInWeek = [1, 2, 3, 4, 5, 6, 7];
  const findContract = (id: string) => contracts.find((contract) => contract.id === id);
  const findResByCompare = (compare: number, time1: number[], time2: number[]) => {
    if (compare === 1) {
      return { operator: '+', time: subtractTimes(time1, time2) };
    }
    if (compare === -1) {
      return { operator: '-', time: subtractTimes(time2, time1) };
    }
    return { operator: '', time: [0, 0] };
  };

  return (
    <>
      {personsAndContracts.map((item) => {
        let foundContractsCounter = 0;
        let totalContractsTime = [0, 0];
        let totalPersonTime = [0, 0];
        let compareCounter = 0;
        if (item.contracts.length >= 1) {
          item.contracts.forEach((contract) => {
            const tempContract = findContract(contract.id);
            if (tempContract) {
              foundContractsCounter += 1;
              totalContractsTime = sumTimes(totalContractsTime, formatTime(tempContract.hours));
              totalPersonTime = sumTimes(
                totalPersonTime,
                item.contracts.find((i) => i.id === tempContract.id)!
                  .totalHours,
              );
              const foundHours = formatTime(tempContract.hours);
              const compare = foundHours && compareTimes(contract.totalHours, foundHours);
              if (compare) {
                compareCounter += 1;
              }
            }
          });
        }
        return item.contracts.map(
          (contract: IContract, index: number) => {
            const foundContract = findContract(contract.id);
            const foundHours = foundContract && formatTime(foundContract.hours);
            const compare = foundHours && compareTimes(contract.totalHours, foundHours);
            let res = { operator: '', time: [0, 0] };
            let compareTotalString;
            if (compare && foundHours) {
              res = findResByCompare(compare, contract.totalHours, foundHours);
            }
            if (index === 0 && foundContractsCounter > 1) {
              const compareTotal = compareTimes(totalPersonTime, totalContractsTime);
              compareTotalString = findResByCompare(
                compareTotal,
                totalPersonTime,
                totalContractsTime,
              );
            }
            return (
              <tr key={contract.id}>
                <Person index={index} item={item} />
                <ContractBlock>
                  <div>{foundContract ? foundContract.name : contract.name}</div>
                </ContractBlock>
                {daysInWeek.map((day, ind) => DatesFunc(
                  contract,
                  day,
                  item.adminId,
                  vacations,
                  ind,
                ))}
                <td colSpan={item.contracts.length === 1 ? 2 : 1}>
                  <HoursAndDollars
                    time={contract.totalHours}
                    money={contract.totalMoney}
                  />
                </td>
                {
              item.contracts.length !== 1 && !index && (
                <td rowSpan={item.contracts.length}>
                  <HoursAndDollars
                    time={item.totalHours}
                    money={item.totalMoney}
                  />
                </td>
              )
              }
                { foundContractsCounter > 0 && res.operator
                  ? <UnworkedHours res={res} />
                  : <EmptyUnworked compare={compareCounter} />}
                {
                  !index && compareCounter > 0
                  && foundContractsCounter > 1
                  && compareTotalString
                  && <UnworkedHours contracts={item.contracts.length} res={compareTotalString} />
                }
              </tr>
            );
          },
        );
      })}
    </>
  );
};

const EmptyUnworked = styled.td<{compare: number}>`
  border: ${({ compare }) => (compare > 0 ? '1px solid #e7e7e7' : 'none')} !important;
  width: ${({ compare }) => (compare > 0 ? 'auto' : '0')};
`;

const ContractBlock = styled.td`
    width: 184px;
    div {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 15px 12px;
        width: 160px;
        font-family: 'Roboto', sans-serif;
        font-size: 12px;
        text-align: start;
    }
`;
export default MainRows;
