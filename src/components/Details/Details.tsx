import React, { useEffect, useState } from 'react';
import Styles from './Details.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { completeZeros } from '@/servieces/servieces';

export const Details = () => {
  const router = useRouter();
  const {id} = router.query;
  const [data, setData] = useState([])

  const fetchPokemonDetails = async (id) => {
    const data =  await fetch(`/api/pokemon/${id}`);
    setData(await data.json())
  };

  useEffect(() => {
    fetchPokemonDetails(id)
  },[id])
  console.log(data);
  return (
    <div>
      <h1>Edit Pokémon</h1>
      <div className={Styles.wrapper}>
        <Image src={`/images/${completeZeros(id)}.png`} alt={"Pokémon Image"} width={100} height={100}/>

        {
          data.map((value, index) => {
            return <div key={index}>
              <h3 className={Styles.main_detail}>Name: {value.name.english}</h3>
              <h3 className={Styles.main_detail}>Type: {value.type.join(', ', ',')}</h3>
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
  );
}