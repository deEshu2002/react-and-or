import React, { useEffect, useState } from 'react'
import type { argValuesTypes } from '../App';

export const booleanParams = ["true", "false"];

export interface argumentProps {
  argument:string[],
  setArgument:React.Dispatch<React.SetStateAction<string[]>>,
  argValue: argValuesTypes[],
  setArgValue:React.Dispatch<React.SetStateAction<argValuesTypes[]>>,
}

export default function Arguments(props:argumentProps) {

  function handleInputFieldChange(e:React.ChangeEvent<HTMLInputElement>, idx:number){
    props.argument[idx] = e.target.value;
    props.setArgument([...props.argument]);
  }

  function handleSelectfieldChange(e:React.ChangeEvent<HTMLSelectElement>, idx:number){
    props.argValue[idx] = e.target.value as argValuesTypes;
    props.setArgValue([...props.argValue]);
  }

  function appendArguments(){
    props.argument.push("newArg")
    props.argValue.push("false")
    props.setArgument([...props.argument])
    props.setArgValue([...props.argValue])
  }

  return (
    <>
    {
      props.argument.map((elem, idx) => {
        return <div key={idx} className='flex'>
          <input value={elem} onChange={(e) => handleInputFieldChange(e,idx)}/>
          <select onChange={(e) => handleSelectfieldChange(e,idx)}>
            <option value={"false"}>false</option>
            <option value={"true"}>true</option>
          </select>
        </div>
      })
    }
    <button type='button' onClick={() =>appendArguments()}>+ arg</button>
    </>
  )
}

export interface PropsArgumentCollapseIntoSelect{
  args:string[],
  vals:argValuesTypes[],
  setResult:React.Dispatch<React.SetStateAction<string>>
}

export function ArgumentCollapseIntoSelect({args, vals, setResult}:PropsArgumentCollapseIntoSelect) {

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  function handleArgumentUpdate(e:React.ChangeEvent<HTMLSelectElement>){
    const value = e.target.value;
    const idx = args.indexOf(value)
    setSelectedIdx(idx)
    setResult(vals[idx]);
  }

  useEffect(() => {
    setResult(vals[0])
  },[])

  useEffect(() => {
    setResult(vals[selectedIdx])
  },[vals])

  return <>
    <select onChange={(e) => handleArgumentUpdate(e)}>
      {
        args.map((elem,idx) => {
          return <option value={elem} key={idx}>{elem}</option>
        })
      }
    </select>
  </>
}
