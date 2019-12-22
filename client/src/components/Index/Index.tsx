import React, { useState } from 'react';
import { clearIndex, index, IndexDatum } from '../../requests/index.request';
import SearchBar from '../SearchBar/SearchBar';
import './Index.scss';
import Button from '../Button/Button';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

const emptyMessageOptions = [
    'Nothing to search for here',
    'I have nothing for you',
    'Well you gotta search for something',
    'Oops, forgot to enter a search term!',
];

const Index: React.FC = () => {
    const [message, setMessage] = useState('');
    const [indexDatum, setIndexDatum] = useState({ pages: 0, tokens: 0 } as IndexDatum);
    const [isSearching, setSearching] = useState(false);

    const onIndex = (url: string) => {
        if (!url) {
            const messageIndex = Math.floor(Math.random() * emptyMessageOptions.length);
            setMessage(emptyMessageOptions[messageIndex]);
            setIndexDatum({ pages: 0, tokens: 0 });
            setSearching(false);
            return;
        }

        setSearching(true);
        index(url).then((datum: IndexDatum) => {
            setMessage('');
            setIndexDatum(datum);
            setSearching(false);
        });
    };

    const onClear = () => {
        setSearching(true);
        clearIndex().then((message: string) => {
            setMessage(message);
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

    const renderMessage = () => {
        if (isSearching) {
            return null;
        }

        if (!message) {
            return null;
        }

        return <span>{message}</span>;
    };

    const renderLoadingIcon = () => {
        if (isSearching) {
            return <LoadingIcon />;
        }
        return null;
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
                    isDisabled={isSearching}
                    onClickFn={onClear}
                    theme="secondary"
                    text={'Clear Index'}
                    type={'button'}
                />
            </div>
            {renderIndexDatum()}
            {renderMessage()}
            {renderLoadingIcon()}
        </div>
    );
};

export default Index;
