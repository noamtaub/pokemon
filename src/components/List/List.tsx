import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table } from 'react-bootstrap';
import Cookies from 'js-cookie';

import Styles from './List.module.css'
import { completeZeros } from '@/services/services';
import { useRouter } from 'next/router';

export const List = (props) => {
  const [data, setData] = useState([])
  const router = useRouter()

  const fetchPokemonData = async () => {
    const data = fetch('http://localhost/pokemon',{credentials:"include"});
    data.then(res => res.json())
      .then(data => {
        Cookies.set('pokemonData', JSON.stringify(data))
        setData(data)
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    const cookieData = Cookies.get('pokemonData');
    if(document.referrer && cookieData){
      setData(JSON.parse(cookieData))
      return
    }
    fetchPokemonData(); 
  }, [])

  return (
    <Table className={Styles.table} striped={true} bordered={true} hover={true}>
      <thead>
      <tr>
        <th style={{width: '100px'}}></th>
        <th><h2>Pokémon</h2></th>
      </tr>
      </thead>
      <tbody>
      {
        data && data?.map((value, index) => {
          return <tr key={index}>
            <td className={'text-center'}>
              <img src={`http://localhost/images/${completeZeros(value.id)}.png`} alt={"Pokémon Image"} width={80} height={80}/>
            </td>
            <td valign={'middle'}>
              <Link href={`/details/${value.id}`}><h3>{value.name.english}</h3></Link>
            </td>
          </tr>
        })
      }
      </tbody>
      <tfoot>
      <tr>
        <td className={'text-center hide'} colSpan={2}>
          <button className={'btn btn-success w-100'} onClick={() => fetchPokemonData()}>Refresh</button>
        </td>
      </tr>
      </tfoot>
    </Table>
  );
}