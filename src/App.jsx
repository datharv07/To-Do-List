import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';

const App = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Navbar onFilterChange={handleFilterChange} />
      <Body filter={filter} />
    </div>
  );
};

export default App;
