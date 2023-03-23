import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { completeZeros } from '@/servieces/servieces';
import Styles from './Details.module.css'

export const Details = () => {
  const router = useRouter();
  const {id} = router.query;
  const [data, setData] = useState([])

  const fetchPokemonDetails = async (id:number) => {
    const data =  await fetch(`http://localhost/pokemon/${id}`);
    setData(await data.json())
  };

  useEffect(() => {
    fetchPokemonDetails(id)
  },[id])
  console.log(data);
  return data?.length > 0 ?(
    <div>
      <h1>View Pokémon</h1>
      <div className={Styles.wrapper}>
        <img src={`http://localhost/images/${completeZeros(id)}.png`} alt={"Pokémon Image"} width={100} height={100}/>

        {
          data.map((value, index) => {
            return <div key={index}>
              <h3 className={Styles.main_detail}>Name: {value?.name?.english}</h3>
              <h3 className={Styles.main_detail}>Type: {value?.type.join(', ', ',')}</h3>
              <h3 className={Styles.main_detail}>Base:</h3>
              <ul>
                {Object.entries(value.base).map(([key, value]) => {
                  return <li>{key}: {value}</li>
                })}
              </ul>
            </div>
          })
        }
      </div>
      <a href={'/'} className={'btn btn-primary'}>Go back</a>
    </div>
  ):<h1>Pokémon not found</h1>
}