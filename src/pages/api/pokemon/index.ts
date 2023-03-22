import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = require('db/pokedex.json')
  const randomValues = getRandomValues(data);
  res.status(200).json(randomValues);
}

function getRandomValues(array) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}
