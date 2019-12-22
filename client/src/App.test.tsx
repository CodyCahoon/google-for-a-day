import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders a tab for Index', () => {
    const { getByText } = render(<App />);
    const indexTab = getByText('Index');
    expect(indexTab).toBeInTheDocument();
});

test('renders a tab for Search', () => {
    const { getByText } = render(<App />);
    const searchTab = getByText('Search');
    expect(searchTab).toBeInTheDocument();
});
