import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '../../graphql/characterQueries';
import PropTypes from 'prop-types';
function GetCharacterDetail({ characterId, onClose }) {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: {
      id: characterId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  const character = data.character;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-4 rounded-md'>
        <h1>{character.name}</h1>
        <img src={character.image} alt={character.name} />
        <p>{character.status}</p>
        <p>{character.gender}</p>
        <p>{character.species}</p>
        <p>{character.type}</p>
        <p>{character.location.name}</p>
        <p>{character.origin.name}</p>
        <p>{character.origin.dimension}</p>
        <button
          className='absolute top-2 right-2 text-gray-500'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

GetCharacterDetail.propTypes = {
  characterId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default GetCharacterDetail;