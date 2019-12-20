import React, { useState } from 'react';
import './SearchBar.scss';

export interface ISearchBar {
    buttonText: string;
    placeholder: string;
    onSearch: Function;
}

const SearchBar = (props: ISearchBar) => {
    const [search, setSearch] = useState('');

    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                type="search"
                placeholder={props.placeholder}
                onChange={event => {
                    setSearch(event.target.value);
                }}
                onKeyPress={event => {
                    const isEventKey = event.key === 'Enter';
                    if (isEventKey) {
                        props.onSearch(search);
                    }
                }}
            />
            <button
                className="search-bar__button"
                type="submit"
                onClick={() => {
                    props.onSearch(search);
                }}>
                {props.buttonText}
            </button>
        </div>
    );
};

export default SearchBar;
