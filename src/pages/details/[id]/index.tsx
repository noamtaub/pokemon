import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Details } from '@/components/Details/Details';

function PokemonDetails({pokemon}) {

  return (
    <Details/>
  );
}


export default PokemonDetails;
