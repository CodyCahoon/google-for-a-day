import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import { search, SearchDatum } from '../../requests/search.request';
import './Search.scss';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

const Search: React.FC = () => {
    const [searchResults, setSearchResults] = useState([] as SearchDatum[]);
    const [isSearching, setIsSearched] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const onSearch = (term: string) => {
        if (!term) {
            setHasSearched(true);
            setSearchResults([]);
            return;
        }

        setIsSearched(true);
        search(term).then((searchData: SearchDatum[]) => {
            setSearchResults(searchData);
            setIsSearched(false);
            setHasSearched(true);
        });
    };

    const renderSearchResults = () => {
        if (isSearching) {
            return <LoadingIcon />;
        }

        if (!hasSearched) {
            return null;
        }

        if (!searchResults || searchResults.length === 0) {
            return <span>No results found.</span>;
        }

        const mapToSearchResult = (s: SearchDatum, index: number) => {
            return (
                <SearchResult key={index} title={s.title} url={s.url} occurrences={s.occurrences} />
            );
        };

        return (
            <div>
                <span>Found {searchResults.length}</span>
                <span>{searchResults.length === 1 ? ' result' : ' results'}</span>
                {searchResults.map(mapToSearchResult)}
            </div>
        );
    };

    return (
        <div className="search">
            <SearchBar
                buttonText="Search"
                canSearch={!isSearching}
                placeholder="Search through indexed sites"
                onSearch={onSearch}
            />
            {renderSearchResults()}
        </div>
    );
};

export default Search;
