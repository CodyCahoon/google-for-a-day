import React, { useState } from 'react';
import { index, IndexDatum } from '../../services/index.request';
import SearchBar from '../SearchBar/SearchBar';

const Index: React.FC = () => {
    const [indexDatum, setIndexDatum] = useState({ pages: 0, tokens: 0 } as IndexDatum);

    const onIndex = (url: string) => {
        index(url).then((datum: IndexDatum) => {
            console.log(datum);
            setIndexDatum(datum);
        });
    };

    const renderer = () => {
        if (indexDatum.pages === 0) {
            return null;
        }
        return <span>{indexDatum.pages}</span>;
    };

    return (
        <div className="index">
            <SearchBar
                buttonText={'Index'}
                placeholder={'Paste a url to index'}
                onSearch={onIndex}
            />
            {indexDatum}
        </div>
    );
};

export default Index;
