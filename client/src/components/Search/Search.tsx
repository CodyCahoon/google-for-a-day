import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import { search, SearchDatum } from '../../requests/search.request';

const Search: React.FC = () => {
    const [searchResults, setSearchResults] = useState([] as SearchDatum[]);
    const [showResults, setShowResults] = useState(false);
    const [isSearching, setSearching] = useState(false);

    const onSearch = (term: string) => {
        setSearching(true);
        search(term).then((searchData: SearchDatum[]) => {
            setSearchResults(searchData);
            setShowResults(true);
            setSearching(false);
        });
    };

    const render = () => {
        if (!showResults) {
            return null;
        }

        if (!searchResults || searchResults.length === 0) {
            return <span>No results found.</span>;
        }

        return searchResults.map((s: SearchDatum, index: number) => {
            return (
                <SearchResult key={index} title={s.title} url={s.url} occurrences={s.occurrences} />
            );
        });
    };

    return (
        <div className="search">
            <SearchBar
                buttonText="Search"
                canSearch={!isSearching}
                placeholder="Search through indexed sites"
                onSearch={onSearch}
            />
            {render()}
        </div>
    );
};

export default Search;
