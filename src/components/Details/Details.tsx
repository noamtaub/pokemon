import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { completeZeros } from '@/services/services';
import Styles from './Details.module.css';

export const Details = () => {
  const router = useRouter();
  const {id} = router.query;
  const [data, setData] = useState([]);

  const fetchPokemonDetails = async (id) => {
    const data = await fetch(`http://localhost/pokemon/${id}`);
    setData(await data.json());
  };

  useEffect(() => {
    fetchPokemonDetails(id).catch(console.log);
  }, [id]);

  return id ? (
      <div>
        <h1>View Pokémon</h1>
        {data?.length === 0 && <h2>Pokémon Not found</h2>}
        <div className={Styles.wrapper}>
          <img src={`http://localhost/images/${completeZeros(id)}.png`} alt={"Pokémon Image"} width={100} height={100}/>
          {
            data.map((value, index) => {
              return <div key={index}>
                <h3 className={Styles.main_detail}>Name: {value.name.english}</h3>
                <h3 className={Styles.main_detail}>Type: {value.type.join(', ', ',')}</h3>
                <h3 className={Styles.main_detail}>Base:</h3>
                <ul>
                  {Object.entries(value.base).map(([stat, statValue]) => {
                    return <li key={value.id}>{stat}: {statValue}</li>
                  })}
                </ul>
              </div>
            })
          }
        </div>
        <a href={'/'} className={'btn btn-primary'}>Go back</a>
      </div>
    ) :
    <></>;
};