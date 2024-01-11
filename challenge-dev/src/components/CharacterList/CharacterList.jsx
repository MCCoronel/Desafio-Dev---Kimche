import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { CHARACTERS } from '../../graphql/characterQueries';
import CharacterDetail from '../CharacterDetail/CharacterDetail';
import Filters from '../Filters/Filters';
import style from './CharacterList.module.css';

function GetCharacters() {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [click, setClick] = useState(false); // Para saber si se hizo click
  const [searchInput, setSearchInput] = useState('');
  const [prevSearchInput, setPrevSearchInput] = useState(''); // Para guardar el valor anterior
  const [filter, setFilter] = useState({
    gender: '',
    status: '',
    species: '',
  });
  // const [prevFilter, setPrevFilter] = useState({
  //   gender: '',
  //   status: '',
  //   species: '',
  // });

  const query = CHARACTERS;
  const variables = click
    ? { name: click ? prevSearchInput : '', page }
    : { page };

  console.log(variables);
  console.log('query', query);

  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: {
      ...variables,
      ...filter,
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
      setFilter({
        gender: '',
        status: '',
        species: '',
      });
      //setSearchInput('');
      // setSearchInput(''); // Limpio el input después de realizar la búsqueda
    }
  };

  const handleFiltersSelected = (filters) => {
    setPrevSearchInput('');
    setSearchInput('');
    setFilter(filters);
  };

  const handleClearFilters = () => {
    setPrevSearchInput('');
    setSearchInput('');
    setFilter({
      gender: '',
      status: '',
      species: '',
    });
  };

  const handleCharacterClick = (id) => {
    setId(id);
  };

  const handleCloseModal = () => {
    setId(null);
  };

  const characters = data?.characters.results;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* <form onSubmit={handleSearch}> */}
      <div className={style.searchBar}>
        <input
          type='text'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={style.searchInput}
        />
        <button
          onClick={handleSearch}
          type='submit'
          className={style.searchButton}
        >
          Search
        </button>
      </div>
      {/* </form> */}

      <Filters
        currentFilters={filter}
        onFiltersSelected={handleFiltersSelected}
        onClearFilters={handleClearFilters}
        className={style.Filters}
      />

      <div className={style.CardsContainer}>
        {characters &&
          characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character.id)}
              className={style.CharacterCard}
            >
              <div className={style.CharacterImage}>
                <img src={character.image} alt={character.name} />
              </div>
              <div className={style.CharacterName}>
                <p>{character.name}</p>
              </div>
            </div>
          ))}
      </div>

      <div className={style.pagination}>
        {data?.characters.info.prev && (
          <button onClick={handlePreviousPage} className={style.buttonPage}>
            Prev
          </button>
        )}
        <div className={style.pages}>
          Page {page} / {data?.characters.info.pages}
        </div>
        {data?.characters.info.next && (
          <button onClick={handleNextPage} className={style.buttonPage}>
            Next
          </button>
        )}
      </div>

      {id && (
        <CharacterDetail
          characterId={id.toString()}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default GetCharacters;
