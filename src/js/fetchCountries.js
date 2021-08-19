export default function fetchCountries(value) {
  return fetch(`https://restcountries.eu/rest/v2/name/${value}`).then(result => {
    if (!result.ok) {
      alert('нет совпадений, попробуйте еще раз');
      throw Error(result.statusText);
    } else {
      return result.json();
    }
  });
}
