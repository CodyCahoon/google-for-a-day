import React, { useState } from 'react';
import './SearchBar.scss';
import Button from '../Button/Button';

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
            <Button
                isDisabled={!props.canSearch}
                onClickFn={() => props.onSearch(search)}
                theme="primary"
                text={props.buttonText}
                type="submit"
            />
        </div>
    );
};

export default SearchBar;
