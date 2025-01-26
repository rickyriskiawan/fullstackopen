export default function Search({ countries, findCountries }) {
  const onChange = (e) => {
    const value = e.target.value;

    if (!value) {
      findCountries(null);
    } else {
      const filteredCountries = countries.filter((country) => {
        const countryName = country.name.common.toLowerCase();

        return countryName.includes(value);
      });

      findCountries(filteredCountries);
    }
  };

  return (
    <div>
      <span>find countries </span>
      <input type='text' onChange={onChange} />
    </div>
  );
}
