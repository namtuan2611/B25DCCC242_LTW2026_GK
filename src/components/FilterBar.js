import React from 'react';
import { GROUPS } from '../data';

const FilterBar = ({ searchTerm, setSearchTerm, selectedGroup, setSelectedGroup }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label htmlFor="search">Tìm kiếm </label>
      <input
        id="search"
        type="text"
        placeholder="Tìm theo tên hoặc SĐT..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '20px' }}
      />

      <label htmlFor="groupFilter">Nhóm </label>
      <select
        id="groupFilter"
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {GROUPS.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;