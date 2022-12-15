/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';

interface JSXWithProps extends JSX.Element {
  props: TabPaneProps;
}

interface TabsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  initialTab: string;
  children: JSXWithProps[];
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({ initialTab, children }) => {
  const [selectedTab, setSelectedTab] = React.useState(initialTab);
  return (
    <>
      <HeaderWrapper>
        {children.map((tab) => {
          const { tabId, tabName, classTracking } = tab.props;
          return (
            <TabHeader
              key={tabId}
              isActive={tabId === selectedTab}
              onClick={() => setSelectedTab(tabId)}
              className={classTracking}
            >
              {tabName}
            </TabHeader>
          );
        })}
      </HeaderWrapper>
      <ContentWrapper>
        {children.map((tab) => {
          const { tabId, children: content } = tab.props;
          return (
            <TabContent
              key={tabId}
              isActive={tabId === selectedTab}
            >
              {content}
            </TabContent>
          );
        })}
      </ContentWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`;

const TabHeader = styled.div<{ isActive?: boolean }>`
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  padding: 18px 10px;
  cursor: pointer;

  color: ${({ isActive }) => (isActive ? '#21272e' : '#909599')};
  border-bottom: ${({ isActive }) => (isActive ? '#21272e 2px solid' : '#dae1e8 1px solid')};
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const TabContent = styled.div<{ isActive?: boolean }>`
  width: 100%;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

interface TabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  tabId: string;
  tabName: string;
  classTracking: string;
}

export const TabPane: React.FC<TabPaneProps> = ({ children }) => (
  <>
    {children}
  </>
);
