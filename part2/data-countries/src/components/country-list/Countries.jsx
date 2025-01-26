import ShowCountry from './ShowCountry';

export default function Countries({ countries, setCountries }) {
  if (!countries) {
    return null;
  }

  console.log(countries);

  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  const onShow = (country) => {
    setCountries([country]);
  };

  return (
    <div>
      {countries.length > 1 ? (
        countries.map((country, index) => (
          <p key={index}>
            {country.name.common}
            <button onClick={() => onShow(country)}>show</button>{' '}
          </p>
        ))
      ) : (
        <ShowCountry country={countries[0]} />
      )}
    </div>
  );
}
