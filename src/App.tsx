import {useState} from "react";

import AddLocationForm from "./components/add-location-form";
import Wrapper from "./components/wrapper";
import CitySelector from "./components/city-selector";
import TouristLocationTable from "./components/tourist-location-table";

function App() {
    const [currentCity, setCurrentCity] = useState<string>('');

    const handleCitySelect = (city: string) => {
        console.log('Current city: ', city);
        setCurrentCity(city);
    };

    return (
        <Wrapper>
              <AddLocationForm/>
              <CitySelector onCitySelect={handleCitySelect} />
            {currentCity ? <TouristLocationTable city={currentCity}/> : <p className="text-white">Please choose city</p>}
        </Wrapper>
    );
}

export default App;
