import React, { useState } from 'react';
import './SearchBar.scss';

export interface ISearchBar {
    buttonText: string;
    canSearch: boolean;
    placeholder: string;
    onSearch: Function;
}

const SearchBar = (props: ISearchBar) => {
    const [search, setSearch] = useState('');

    return (
        <div className="search-bar">
            <input
                autoFocus={true}
                className="search-bar__input"
                type="search"
                placeholder={props.placeholder}
                onChange={event => {
                    setSearch(event.target.value);
                }}
                onKeyPress={event => {
                    if (!props.canSearch) {
                        return;
                    }
                    const isEventKey = event.key === 'Enter';
                    if (isEventKey) {
                        props.onSearch(search);
                    }
                }}
            />
            <button
                className="search-bar__button"
                type="submit"
                disabled={!props.canSearch}
                onClick={() => {
                    if (!props.canSearch) {
                        return;
                    }
                    props.onSearch(search);
                }}>
                {props.buttonText}
            </button>
        </div>
    );
};

export default SearchBar;
