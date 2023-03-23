import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table } from 'react-bootstrap';

import Styles from './List.module.css'
import { completeZeros } from '@/services/services';

export const List = (props) => {
  const [data, setData] = useState([])


  const fetchPokemonData = async () => {
    const data = fetch('http://localhost/pokemon');
    // const data = fetch('/api/pokemon/');
    data.then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    console.log(data);
    if(data.length === 0){
      fetchPokemonData(); 
    }
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
          console.log(value, index)
          return <tr key={index}>
            <td className={'text-center'}>
              {/* <Image src={`/images/${completeZeros(value.id)}.png`} alt={"Pokémon Image"} width={80} height={80}/> */}
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