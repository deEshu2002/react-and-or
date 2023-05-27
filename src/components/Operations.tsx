import React from 'react'
import type { possibleOperation } from '../App';

export interface operationProps{
  setSelectedOption: React.Dispatch<React.SetStateAction<possibleOperation>>;
}

export default function Operations({setSelectedOption}:operationProps) {

  function updateSelectedOption(e: React.ChangeEvent<HTMLSelectElement>){
    setSelectedOption(e.target.value as possibleOperation);
  }

  return (
    <div className='flex-col'>
      <select onChange={(e) => updateSelectedOption(e)}>
        <option disabled selected hidden value={"select"}>select...</option>
        <option value={"constant"}>constant</option>
        <option value={"argument"}>argument</option>
        <option value={"and"}>and</option>
        <option value={"or"}>or</option>
      </select>
    </div>
  )
}
