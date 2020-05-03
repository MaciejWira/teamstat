import React, { useState } from 'react';

export const useSearch = ({ arr, prop }) => {

  const [ searchValue, setSearchValue ] = useState('');

  const filteredValues = arr.filter(el => {
    if (searchValue){
      const index = el[prop].toLowerCase().indexOf(searchValue.toLowerCase());
      return index >= 0;
    } else return true;
  });

  const searchInput = (
    <input
      className="a-input"
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
      placeholder='Szukaj'/>
  )

  return {
    searchValue, setSearchValue, filteredValues, searchInput
  }

}
