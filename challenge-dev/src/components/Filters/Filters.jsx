import { useState } from 'react';
import PropTypes from 'prop-types';

function Filters({ onFiltersSelected, onClearFilters }) {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'gender':
        setSelectedGender(value);
        break;
      case 'status':
        setSelectedStatus(value);
        break;
      case 'species':
        setSelectedSpecies(value);
        break;
      default:
        break;
    }

    onFiltersSelected({
      gender: selectedGender,
      status: selectedStatus,
      species: selectedSpecies,
    });
  };

  const handleClearFilters = () => {
    setSelectedGender('');
    setSelectedStatus('');
    setSelectedSpecies('');
    onClearFilters();
  };

  return (
    <div>
      <select onChange={(e) => handleFilterChange('gender', e.target.value)}>
        <option value='' disabled selected>
          Gender
        </option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Genderless'>Genderless</option>
        <option value='unknown'>unknown</option>
      </select>

      <select onChange={(e) => handleFilterChange('status', e.target.value)}>
        <option value='' disabled selected>
          Status
        </option>
        <option value='Alive'>Alive</option>
        <option value='Dead'>Dead</option>
        <option value='unknown'>Unknown</option>
      </select>

      <select onChange={(e) => handleFilterChange('species', e.target.value)}>
        <option value='' disabled selected>
          Species
        </option>
        <option value='Human'>Human</option>
        <option value='Animal'>Animal</option>
        <option value='Alien'>Alien</option>
        <option value='Robot'>Robot</option>
        <option value='Humanoid'>Humanoid</option>
        <option value='Mythological Creature'>Mythological Creature</option>
        <option value='Cronenberg'>Cronenberg</option>
        <option value='Disease'>Disease</option>
        <option value='Poopybutthole'>Poopybutthole</option>
      </select>

      <button onClick={handleFilterChange}>Apply Filters</button>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </div>
  );
}

Filters.propTypes = {
  onFiltersSelected: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default Filters;
