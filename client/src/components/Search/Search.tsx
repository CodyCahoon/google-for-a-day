import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import { search, SearchDatum } from '../../services/search.request';

const Search: React.FC = () => {
    const [searchResults, setSearchResults] = useState([] as SearchDatum[]);

    const onSearch = (term: string) => {
        search(term).then((searchData: SearchDatum[]) => {
            setSearchResults(searchData);
        });
    };

    const renderSearchResult = (s: SearchDatum, index: number) => {
        return <SearchResult key={index} title={s.title} url={s.url} occurrences={s.occurrences} />;
    };

    return (
        <div className="search">
            <SearchBar
                buttonText={'Search'}
                placeholder={'Search for through indexed sites'}
                onSearch={onSearch}
            />
            {searchResults.map(renderSearchResult)}
        </div>
    );
};

export default Search;
