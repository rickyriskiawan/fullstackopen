export default function ShowCountry({ country }) {
  const { name, capital, area, flags } = country;
  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{name.common}</h1>

      <div>
        <p>capital {capital}</p>
        <p>area {area} </p>
      </div>

      <div>
        <p>
          <b>languages</b>
        </p>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </div>

      <div>
        <img src={flags.png} alt={flags.alt} />
      </div>
    </div>
  );
}
