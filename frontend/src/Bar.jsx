import React, { useState } from 'react';

const Bar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Bar;