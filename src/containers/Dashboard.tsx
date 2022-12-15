import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Papa, { ParseResult } from 'papaparse';
import BackIcon from '@/components/common/icons/BackIcon';

import { Link } from 'react-router-dom';
import DragAndDrop, { DropHere } from '@/components/csvTable/DragAndDrop';
import changeTimeFormat from '@/utils/csv/changeTimeFormat';

import Header from '@/components/csvTable/Header';
import TotalRow from '@/components/csvTable/TotalRow';

import { IVacations } from '@/utils/csv/formatVacations';
import calculateSum from '@/utils/csv/calculateSum';
import MainRows from '@/components/csvTable/MainRows';
import FormatPersonsAndContracts from '@/utils/csv/formatPersonsAndContracts';
import { IPerson } from '@/components/csvTable/Person';
import weeksPagination from '@/utils/csv/weeksPagination';
import Navigation from '@/components/csvTable/Navigation';

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: white;
  }
  #root {
    max-width: 100%;
  }
`;

export type DataType = Array<[number, string, string, number[], string]>;

export interface IDataBase {
  [key: string]: {
    adminId: string;
    avatar: string;
    name: string;
  }
}
export interface IContractDataBase {
  id: string,
  name: string,
  hours: string,
  startDate: string,
  endDate: string
}

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [contractData, setContractData] = useState<DataType>([]);
  const [personsAndContracts, setPersonsAndContracts] = useState<
  Array<IPerson>
  >([]);
  const [weeks, setWeeks] = useState<any>([]);
  const [database, setDataBase] = useState<IDataBase>({});
  const [contractBase, setContractBase] = useState<IContractDataBase[]>([]);
  const [vacations, setVacations] = useState<IVacations[]>([{
    vacations: [],
    holidays: [],
    sickLeaves: [],
  }]);
  const [page, setPage] = useState<number>(0);
  const [weekMoney, setWeekMoney] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [weekHours, setWeekHours] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    Papa.parse('./files/users.csv', {
      download: true,
      complete(input: { data: any; }) {
        const records = input.data;
        const tempdatabase: IDataBase = {};
        records.forEach((person: string[]) => {
          tempdatabase[person[0]] = {
            name: person[2],
            avatar: person[3],
            adminId: person[1],
          };
        });
        setDataBase(tempdatabase);
      },
    });
    Papa.parse('./files/contracts.csv', {
      download: true,
      complete(input: { data: any; }) {
        const records = input.data;
        const contractsDataBase: IContractDataBase[] = [];
        records.forEach((rec: string[]) => {
          contractsDataBase.push({
            id: rec[0],
            name: rec[1],
            hours: rec[2],
            startDate: rec[3],
            endDate: rec[4],
          });
        });
        setContractBase(contractsDataBase);
      },
    });
  }, []);

  useEffect(() => {
    setPage(0);
    if (selectedFile) {
      Papa.parse(selectedFile, {
        async complete({
          data,
        }: ParseResult<[number, string, string, number[], string]>) {
          data.shift();
          await weeksPagination(data, setWeeks, setVacations);
          setContractData(changeTimeFormat(data));
        },
      });
    }
  }, [selectedFile]);

  useEffect(() => {
    const newData = contractData.filter((i) => new Date(i[0]) >= weeks[page].startDay
        && new Date(i[0]) <= weeks[page].endDay);
    const personsObjects = FormatPersonsAndContracts(
      newData,
      setPersonsAndContracts,
      database,
    );
    calculateSum(personsObjects, setWeekMoney, setWeekHours);
  }, [contractData, page]);

  return (
    <div className="App">
      <TableHead>
        <HeaderWrap to="/me">
          <TopButton>
            <BackIcon />
          </TopButton>
        </HeaderWrap>
      </TableHead>
      <DragAndDrop
        handleDropFile={setSelectedFile}
      />
      <GlobalStyle />
      {selectedFile ? (
        <ContentWrapper>
          <Navigation weeks={weeks} page={page} setPage={setPage} />
          <TableWrapper>
            <tbody>
              <Header vacations={vacations[page]} />
              <MainRows
                contracts={contractBase}
                vacations={vacations[page]}
                personsAndContracts={personsAndContracts}
              />
              <TotalRow
                weekHours={weekHours}
                weekMoney={weekMoney}
                vacations={vacations[page]}
              />
              <tr style={{ height: '100px' }} />
            </tbody>
          </TableWrapper>
        </ContentWrapper>
      ) : <DropHere style={{ opacity: 0.1 }}>Drop here</DropHere>}
    </div>
  );
}

const ContentWrapper = styled.div`
  width: 1024px;
  margin: 100px auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 1024px) {
    left: 0;
    transform: translateX(0);
  }
`;

const TableWrapper = styled.table`
  background-color: white;
  text-align: center;
  width: 1024px;
  border-collapse: collapse;
  td,
  th {
    border: 1px solid #b9b9b9;
    position: relative;
  }

`;
const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  z-index: 6;
`;
const TableHead = styled.header`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 10px;
  top: 10px;
  z-index: 5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  width: 100%;
  max-width: 72px;
  border-radius: 5px 5px 0 0;
`;

const HeaderWrap = styled(Link)`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  border-bottom: 1px solid rgb(33 39 46 / 12%);
`;

export default Dashboard;
