import { useEffect, useState } from 'react';
import Search from './components/Search';
import APICountries from './services/API-countries';
import Countries from './components/country-list/Countries';

function App() {
  const [countries, setCountries] = useState(null);
  const [findCountries, setFindCounries] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      const response = await APICountries.getAll();
      setCountries(response);
    };

    getCountry();
  }, []);

  return (
    <>
      <Search countries={countries} findCountries={setFindCounries} />
      <Countries countries={findCountries} setCountries={setFindCounries} />
    </>
  );
}

export default App;
