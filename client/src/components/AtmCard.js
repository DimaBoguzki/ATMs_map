import React from 'react';
import { ATM_TYPE } from '../api';
import orangeIcon from '../icons/orange-location.png';
import blueIcon from '../icons/blue-location.png';

function AtmCard({ id, bankName, type, address, city, onClick }){
  return (
    <div className="atm-card flex-container">
      <div className="icon" onClick={ onClick }>
        <img src={type===ATM_TYPE.CASH ? blueIcon : orangeIcon} alt=""/>
      </div>
      <div className="info">
        <h4>{bankName}</h4>
        <p> {`${address} ${city} | ${type}`}</p>
      </div>
    </div>
  )
}
export default AtmCard;