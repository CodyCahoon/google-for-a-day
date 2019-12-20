import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './App.scss';
import classnames from 'classnames';
import SearchResult, { ISearchResult } from './components/SearchResult/SearchResult';

const App: React.FC = () => {
    const indexTab = '1';
    const searchTab = '2';
    const [activeTab, setActiveTab] = useState(indexTab);

    const toggle = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const searchResults: ISearchResult[] = [
        { title: 'Example', url: 'https://www.google.com', occurrences: 10 },
        { title: 'Example', url: 'https://www.google.com', occurrences: 10 },
        { title: 'Example', url: 'https://www.google.com', occurrences: 10 },
        { title: 'Example', url: 'https://www.google.com', occurrences: 10 },
    ];

    const renderSearchResult = (s: ISearchResult) => {
        return <SearchResult title={s.title} url={s.url} occurrences={s.occurrences} />;
    };

    return (
        <div className={'App'}>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === indexTab })}
                        onClick={() => toggle(indexTab)}>
                        Index
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === searchTab })}
                        onClick={() => toggle(searchTab)}>
                        Search
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">Paste a url to index</TabPane>
                <TabPane tabId="2">{searchResults.map(renderSearchResult)}</TabPane>
            </TabContent>
        </div>
    );
};

export default App;
