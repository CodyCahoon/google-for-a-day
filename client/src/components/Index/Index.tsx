import React, { useState } from 'react';
import { index, IndexDatum } from '../../services/index.request';
import SearchBar from '../SearchBar/SearchBar';
import './Index.scss';

const Index: React.FC = () => {
    const [indexDatum, setIndexDatum] = useState({ pages: 0, tokens: 0 } as IndexDatum);
    const [showResults, setShowResults] = useState(false);
    const [isSearching, setSearching] = useState(false);

    const onIndex = (url: string) => {
        setSearching(true);
        setShowResults(false);
        index(url).then((datum: IndexDatum) => {
            setIndexDatum(datum);
            setShowResults(true);
            setSearching(false);
        });
    };

    const render = () => {
        if (!showResults) {
            return null;
        }

        const { pages, tokens } = indexDatum;

        if (pages === 0) {
            return null;
        }
        return (
            <div>
                <span>Indexed </span>
                <span className="index__text--focus">{pages}</span>
                <span>{pages === 1 ? ' page' : ' pages'}</span>
                <span> and </span>
                <span className="index__text--focus">{tokens}</span>
                <span>{tokens === 1 ? ' token' : ' tokens'}</span>
            </div>
        );
    };

    return (
        <div className="index">
            <SearchBar
                buttonText={'Index'}
                canSearch={!isSearching}
                placeholder={'Paste a url to index'}
                onSearch={onIndex}
            />
            {render()}
        </div>
    );
};

export default Index;
