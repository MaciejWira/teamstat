import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '../../components/Box';

const Stats = () => {

  const [ statistics, setStatistics ] = useState([]);

  useEffect(() => {
    axios.get('/statistics')
      .then(res => {
        setStatistics(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  const boxesConstructor = [
    { content: statistics.winsSorted, title: 'Najwięcej wygranych' },
    { content: statistics.winsAsCaptainSorted, title: 'Najwięcej wygranych jako kapitan' },
    { content: statistics.winsWithCrateSorted, title: 'Najwięcej wygranych krat' },
    { content: statistics.winsAsCaptainWithCrateSorted, title: 'Najwięcej wygranych krat jako kapitan' },
  ];

  const boxes = boxesConstructor.map((box, index) => (
    <Box
      key={index}
      limit={5}
      title={box.title}
      content={box.content}/>
  ));

  return(
    <div className='o-statistics'>
      <h2 className='a-heading o-statistics__heading'>Statystyki</h2>
      {boxes}
    </div>
  )

}

export default Stats;
