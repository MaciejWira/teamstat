import React from 'react';

const Box = ({ title, content = [], limit }) => {

  const limitedContent = limit ? content.slice(0, limit) : limitedContent;

  const list = limitedContent.map((item, index) => (
    <li className='c-box__li' key={item._id}>
      {item.name}: <span>{item.gamesWon.length}</span>
    </li>
  ));

  return(
    <div className='c-box'>
      <h3 className='a-subheading c-box__heading'>{title}</h3>
      <ol className='c-box__ol'>
        {list}
      </ol>
    </div>
  )

}

export default Box;
