import React, { useState } from 'react';
import './App.scss';
import SearchResult, { ISearchResult } from './components/SearchResult/SearchResult';
import SearchBar from './components/SearchBar/SearchBar';
import logo from './logo.svg';

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

    const onSearch = (term: string) => {
        console.log(term);
    };

    const renderSearchResult = (s: ISearchResult, index: number) => {
        return <SearchResult key={index} title={s.title} url={s.url} occurrences={s.occurrences} />;
    };

    const renderTab = () => {
        if (activeTab === searchTab) {
            return (
                <div>
                    <SearchBar
                        buttonText={'Search'}
                        placeholder={'Search for through indexed sites'}
                        onSearch={onSearch}
                    />
                    {searchResults.map(renderSearchResult)}
                </div>
            );
        }

        if (activeTab === indexTab) {
            return (
                <div>
                    <SearchBar
                        buttonText={'Index'}
                        placeholder={'Paste a url to index'}
                        onSearch={onSearch}
                    />
                </div>
            );
        }

        return null;
    };

    return (
        <div className="app">
            <img src={logo} alt="Pinpoint Logo" />

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
