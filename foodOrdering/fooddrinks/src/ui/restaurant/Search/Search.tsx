import React from 'react';
import styles from '@/ui/restaurant/Search/Search.module.css';
import { MdSearch } from 'react-icons/md';

interface SearchProps {
    placeholder: string;
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.input}></input>
        </div>
    );
};

export default Search;
