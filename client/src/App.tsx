import React, { useState } from 'react';
import './App.scss';
import logo from './logo.png';
import Search from './components/Search/Search';
import Index from './components/Index/Index';

const App: React.FC = () => {
    const indexTab = '1';
    const searchTab = '2';
    const [activeTab, setActiveTab] = useState(indexTab);

    const toggle = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const renderTab = () => {
        if (activeTab === searchTab) {
            return <Search />;
        }

        if (activeTab === indexTab) {
            return <Index />;
        }
        return null;
    };

    return (
        <div className="app">
            <img src={logo} alt="Google Logo" />

            <nav>
                <ul>
                    <button
                        className={
                            activeTab === indexTab ? 'nav-item nav-item--active' : 'nav-item'
                        }
                        type="button"
                        onClick={() => toggle(indexTab)}>
                        Index
                    </button>

                    <button
                        className={
                            activeTab === searchTab ? 'nav-item nav-item--active' : 'nav-item'
                        }
                        type="button"
                        onClick={() => toggle(searchTab)}>
                        Search
                    </button>
                </ul>
            </nav>

            {renderTab()}
        </div>
    );
};

export default App;
