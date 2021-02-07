import { PropsWithChildren, useState } from "react";

import './Tabs.scss';

interface TabsProps {
  tabs: ReadonlyArray<{
    name: string;
    content: React.ReactElement
  }>;
  className?: string;
}

export function Tabs({ className, tabs }: PropsWithChildren<TabsProps>) {
  const tabList = tabs.map(tab => tab.name);
  const [selectedTab, setSelectedTab] = useState<string>(tabList[0]);
  const content = tabs.find(tab => tab.name === selectedTab)?.content ?? null; 
  return (
    <div className={className}>
      <TabList tabs={tabList} selectedTab={selectedTab} onTabClick={setSelectedTab} className="tabs__tablist" />
      <TabPanel className="tabs__panel">{content}</TabPanel>
    </div>
  );
}

interface TabListProps {
  tabs: readonly string[];
  selectedTab: string;
  className?: string;
  onTabClick: React.Dispatch<React.SetStateAction<string>>;
}

export function TabList({ tabs, selectedTab, onTabClick, className }: TabListProps) {
  return (
    <ul className={className}>
      {tabs.map(tab => (
        <Tab
          key={tab}
          active={selectedTab === tab}
          label={tab}
          onClick={() => onTabClick(tab)}
        />)
      )}
    </ul>
  )
}

interface TabProps {
  label: string;
  title?: string;
  active: boolean;
  onClick: () => void;
}

function Tab({ label, active, title, onClick }: TabProps) {
  return (
    <li title={title} className={`tab ${active ? 'active-tab' : ''}`}>
      <button type="button" onClick={onClick}>{label}</button>
    </li>
  );
}

interface TabPanelProps {
  className?: string;
}

export function TabPanel({ children, className }: PropsWithChildren<TabPanelProps>) {
  return <div className={className}>{children}</div>
}