import React from 'react';
import './SearchResult.scss';

export interface ISearchResult {
    url: string;
    title: string;
    occurrences: number;
}

const SearchResult = (props: ISearchResult) => {
    return (
        <div className="search-result">
            <h2 className="search-result__title">
                <a href={props.url} target="_blank'" rel="noopener noreferrer">
                    {props.title}
                </a>
            </h2>
            <span className="search-result__occurrences">{props.occurrences}</span>
            <span>{props.occurrences === 1 ? ' occurrence' : ' occurrences'}</span>
        </div>
    );
};

export default SearchResult;
