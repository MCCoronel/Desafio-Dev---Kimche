import GetCharacters from './components/CharacterList/CharacterList';
import logorym from './assets/logorym.png';
import style from './App.module.css';
export default function App() {
  return (
    <div>
      <img src={logorym} alt="logo" className={style.logo} />
      <GetCharacters />
    </div>
  );
}
