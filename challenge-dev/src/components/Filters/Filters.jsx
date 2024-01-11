import PropTypes from 'prop-types';

function Filters({ currentFilters, onFiltersSelected, onClearFilters }) {
  const handleSelectFilters = (e) => {
    currentFilters[e.target.name] = e.target.value;
  };

  return (
    <div>
      <select name='gender' onChange={(e) => handleSelectFilters(e)}>
        <option value='' disabled selected>
          Gender
        </option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Genderless'>Genderless</option>
        <option value='unknown'>unknown</option>
      </select>

      <select name='status' onChange={(e) => handleSelectFilters(e)}>
        <option value='' disabled selected>
          Status
        </option>
        <option value='Alive'>Alive</option>
        <option value='Dead'>Dead</option>
        <option value='unknown'>Unknown</option>
      </select>

      <select name='species' onChange={(e) => handleSelectFilters(e)}>
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

      <button
        onClick={() => {
          onFiltersSelected(currentFilters);
        }}
      >
        Apply Filters
      </button>
      <button onClick={onClearFilters}>Clear Filters</button>
    </div>
  );
}

Filters.propTypes = {
  onFiltersSelected: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  currentFilters: PropTypes.object.isRequired,
};

export default Filters;
