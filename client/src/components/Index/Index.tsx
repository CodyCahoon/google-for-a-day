import React, { useState } from 'react';
import { clearIndex, index, IndexDatum } from '../../requests/index.request';
import SearchBar from '../SearchBar/SearchBar';
import './Index.scss';
import Button from '../Button/Button';

const Index: React.FC = () => {
    const [clearIndexMessage, setClearIndexMessage] = useState('');
    const [indexDatum, setIndexDatum] = useState({ pages: 0, tokens: 0 } as IndexDatum);
    const [isSearching, setSearching] = useState(false);

    const onIndex = (url: string) => {
        setSearching(true);
        index(url).then((datum: IndexDatum) => {
            setClearIndexMessage('');
            setIndexDatum(datum);
            setSearching(false);
        });
    };

    const onClear = () => {
        setSearching(true);
        clearIndex().then((message: string) => {
            setClearIndexMessage(message);
            setIndexDatum({ pages: 0, tokens: 0 });
            setSearching(false);
        });
    };

    const renderIndexDatum = () => {
        if (isSearching) {
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

    const renderClearIndexMessage = () => {
        if (isSearching) {
            return null;
        }

        if (!clearIndexMessage) {
            return null;
        }

        return <span>{clearIndexMessage}</span>;
    };

    return (
        <div className="index">
            <div className="index__bar">
                <SearchBar
                    buttonText={'Index URL'}
                    canSearch={!isSearching}
                    placeholder={'Enter a url to index'}
                    onSearch={onIndex}
                />
                <Button
                    isDisabled={false}
                    onClickFn={onClear}
                    theme="secondary"
                    text={'Clear Index'}
                    type={'button'}
                />
            </div>

            {renderIndexDatum()}
            {renderClearIndexMessage()}
        </div>
    );
};

export default Index;
