import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Table } from 'react-bootstrap';

import Styles from './List.module.css'
import { completeZeros } from '@/servieces/servieces';

export const List = (props) => {
  const [data, setData] = useState([])


  const fetchPokemonData = async () => {
    const data = fetch('api/pokemon');
    data.then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
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
        data?.map((value, index) => {
          return <tr key={index} onClick={() => console.log("sfd")}>
            <td className={'text-center'}>
              <Image src={`/images/${completeZeros(value.id)}.png`} alt={"Pokémon Image"} width={100} height={100}/>
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