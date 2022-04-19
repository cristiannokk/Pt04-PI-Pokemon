import { NavBar } from "../Nav/NavBar";
import { AllPokemon } from "../AllPokemons/AllPokemons.jsx";
import { Footer } from "../Footer/Footer";
import { Aside as Filter } from "../Aside/Aside";

export function Home() {
  return (
    <div>
      <NavBar />
      <Filter />
      <AllPokemon />
      <div>
        <Footer />
      </div>
    </div>
  );
}

window.scrollTo(0, 0);
