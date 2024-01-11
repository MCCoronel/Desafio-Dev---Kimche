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
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Status:</span> {character.status}
                </div>
              )}
              {character?.gender && (
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Gender:</span> {character.gender}
                </div>
              )}
              {character?.species && (
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Species:</span> {character.species}
                </div>
              )}
              {character?.type && (
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Type:</span> {character.type}
                </div>
              )}
              {character?.location?.name && (
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Location:</span> {character.location.name}
                </div>
              )}
              {character?.origin?.name && (
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Origin:</span> {character.origin.name}
                </div>
              )}
              {character?.origin?.dimension && (
                <div className={style.detailItem}>
                  <span className={style.detailLabel}>Dimension:</span> {character.origin.dimension}
                </div>
              )}
            </div>
          </div>
          <button className={style.closeButton} onClick={onClose}>
            X
          </button>
        </div>
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
