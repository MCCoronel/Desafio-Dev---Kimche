import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CHARACTERS } from '../../graphql/queries/characterQueries';

function GetCharacters() {
  const [page, setPage] = useState(1);
  const [click, setClick] = useState(false); // Para saber si se hizo click
  const [searchInput, setSearchInput] = useState('');
  const [prevSearchInput, setPrevSearchInput] = useState(''); // Para guardar el valor anterior

  const query = CHARACTERS;
  const variables = click
    ? { name: click ? prevSearchInput : '', page }
    : { page };

  console.log(variables);
  console.log('query', query);

  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: {
      variables,
    },
  });

  const handleNextPage = async () => {
    if (page < data?.characters.info.pages) {
      try {
        await fetchMore({
          variables: {
            page: page + 1,
          },
        });
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching more data:', error);
      }
    }
  };

  const handlePreviousPage = async () => {
    if (page > 1) {
      try {
        await fetchMore({
          variables: {
            page: page - 1,
          },
        });
        setPage(page - 1);
      } catch (error) {
        console.error('Error fetching more data:', error);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setClick(true); // Marco que se hizo click
    if (click && searchInput === '') {
      setClick(false);
      return alert('Please enter a character name');
    } else {
      e.preventDefault();
      setPage(1);
      setPrevSearchInput(searchInput); // Guardo el valor actual antes de realizar la búsqueda
    }
  };

  const characters = data?.characters.results;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* <form onSubmit={handleSearch}> */}
      <input
        type='text'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch} type='submit'>
        Search
      </button>
      {/* </form> */}

      {characters &&
        characters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}

      {data?.characters.info.prev && (
        <button onClick={handlePreviousPage}>Previous Page</button>
      )}

      {data?.characters.info.next && (
        <button onClick={handleNextPage}>Next Page</button>
      )}
    </div>
  );
}

GetCharacters.propTypes = {
  characterList: PropTypes.object.isRequired,
  setCharacterList: PropTypes.func.isRequired,
  updateCharacterList: PropTypes.func.isRequired,
};

export default GetCharacters;
