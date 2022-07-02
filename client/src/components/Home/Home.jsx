import { NavBar } from "../Nav/NavBar";
import { AllPokemon } from "../AllPokemons/AllPokemons.jsx";
import { Footer } from "../Footer/Footer";
import { Aside as Filter } from "../Aside/Aside";
import imgLanding from "../../assets/LadingPage.jpg";
import s from "./HomeStyles.css";


export function Home() {
  return (
    <div className={s.Body}>
      <div>
        <img className="img" src={imgLanding} alt="" />
      </div>
      <div>
        <NavBar className={s.navBar}/>
      </div> 
      <div>
        <Filter className={s.filter}/>
      </div>
      <div>
        <AllPokemon className={s.allPokemon}/>
      </div>
      <div>
        <Footer className={s.footer}/>
      </div>
    </div>
  );
}

window.scrollTo(0, 0);
