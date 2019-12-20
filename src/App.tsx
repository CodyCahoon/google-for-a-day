import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './App.scss';
import classnames from 'classnames';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => {
                            toggle('1');
                        }}>
                        Index
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => {
                            toggle('2');
                        }}>
                        Search
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">Paste a url to index</TabPane>
                <TabPane tabId="2">Search for indexed pages by word</TabPane>
            </TabContent>
        </div>
    );
};

export default App;
