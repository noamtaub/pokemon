export default function handler(req, res) {
  const { id } = req.query;

  const pokemonDetails = getPokemonDetails(id)


  res.status(200).json(pokemonDetails);
}

function getPokemonDetails(id:string) {
  const data = require('db/pokedex.json')
  return data.filter((value) => {
    return value.id === parseInt(id)
  })
}