import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '../../graphql/characterQueries';
import PropTypes from 'prop-types';
import style from './CharacterDetail.module.css';

function CharacterDetail({ characterId, onClose }) {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: {
      id: characterId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.character;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.characterDetails}>
          <div className={style.characterDetailsWrapper}>
            <div className={style.characterImage}>
              <img src={character?.image} alt={character?.name} />
            </div>
            <div className={style.characterData}>
              <h1 className={style.characterName}>{character?.name}</h1>
              <div className={style.characterData1}>
                {character?.status && (
                  <p className={style.detailItem}>Status: {character.status}</p>
                )}
                {character?.gender && (
                  <p className={style.detailItem}>Gender: {character.gender}</p>
                )}
                {character?.species && (
                  <p className={style.detailItem}>Species: {character.species}</p>
                )}
                {character?.type && (
                  <p className={style.detailItem}>Type: {character.type}</p>
                )}
                {character?.location?.name && (
                  <p className={style.detailItem}>Location: {character.location.name}</p>
                )}
                {character?.origin?.name && (
                  <p className={style.detailItem}>Origin: {character.origin.name}</p>
                )}
                {character?.origin?.dimension && (
                  <p className={style.detailItem}>Dimension: {character.origin.dimension}</p>
                )}
              </div>
            </div>
          </div>

          <button className={style.closeButton} onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

CharacterDetail.propTypes = {
  characterId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CharacterDetail;

