function Filters() {
  return (
    <div>
      <select>
        <option value='' disabled selected>
          Gender
        </option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Genderless'>Genderless</option>
        <option value='unknown'>unknown</option>
      </select>

      <select>
        <option value='' disabled selected>
          Status
        </option>
        <option value='Alive'>Alive</option>
        <option value='Dead'>Dead</option>
        <option value='unknown'>Unknown</option>
      </select>

      <select>
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

      <button>Apply Filters</button>
      <button>Clear Filters</button>
    </div>
  );
}

export default Filters;
