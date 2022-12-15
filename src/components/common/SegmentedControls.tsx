import React, {
  FC, MouseEvent, useEffect,
} from 'react';
import styled from 'styled-components';

type SegmentedControlsProps = {
  controls: string[];
  filters: string[];
  currentFilter: string;
  setFilters: (arr: string[]) => void;
  setCurrentFilter: (peopleFiltersArr: string) => void
};

const SegmentedControls: FC<SegmentedControlsProps> = ({
  controls, filters, currentFilter, setFilters, setCurrentFilter,
}) => {
  const clearFilter = () => {
    if (!filters.length) return;

    let updatedFilters: string[] = [];

    updatedFilters = filters.filter((item) => item !== currentFilter);

    setFilters(updatedFilters);
    setCurrentFilter('All');
  };

  const handleSetFilters = (event: MouseEvent<HTMLButtonElement>) => {
    const { filter } = event.currentTarget.dataset;
    let updatedFilters: string[] = [];

    if (filter) {
      if (filters.includes(filter)) {
        updatedFilters = filters.filter((i: string) => i !== filter);
        setCurrentFilter('All');
      } else if (filters.includes(currentFilter)) {
        updatedFilters = [...filters, filter].filter((i: string) => i !== currentFilter);
        setCurrentFilter(filter);
      } else {
        updatedFilters = [...filters, filter];
        setCurrentFilter(filter);
      }

      setFilters(updatedFilters);
    }
  };

  useEffect(() => {
    if (!filters.length) {
      setCurrentFilter('All');
    }
  }, [filters]);

  return (
    <Wrapper>
      <Control
        data-filter="All"
        active={currentFilter === 'All'}
        type="button"
        onClick={clearFilter}
      >
        All
      </Control>
      {controls.map((item) => (
        <Control
          key={item}
          data-filter={item}
          active={currentFilter === item}
          type="button"
          onClick={handleSetFilters}
        >
          {item}
        </Control>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(1px,1fr));
  width: 100%;
  border-radius: 8px;
  padding: 2px;
  background-color: #f0f1f2;
  z-index: 1;
`;

const Control = styled.button<{active?: boolean}>`
  font-family: 'Manrope3', 'Thonburi', 'Noto Sans SC';
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: #21272e;
  padding: 8px 0;
  border-style: none;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? '#ffffff' : 'transparent')};
  flex: 1;
  cursor: pointer;
  transition: all .2s ease;
`;

export default SegmentedControls;
