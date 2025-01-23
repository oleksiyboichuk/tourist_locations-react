import {useState} from "react";

import Wrapper from "./components/wrapper";
import CitySelector from "./components/city-selector";
import TouristLocationTable from "./components/tourist-location-table";
import SearchLocationForm from "./components/search-location-form";

function App() {
    const [currentCity, setCurrentCity] = useState<string>('');

    const handleCitySelect = (city: string) => {
        console.log('Current city: ', city);
        setCurrentCity(city);
    };

    return (
        <Wrapper>
            <SearchLocationForm/>
              <CitySelector onCitySelect={handleCitySelect} />
            {currentCity && <TouristLocationTable city={currentCity}/>}
        </Wrapper>
    );
}

export default App;
