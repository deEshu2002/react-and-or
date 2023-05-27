import React, { useEffect, useState } from 'react'
import { argValuesTypes } from '../App'
import App from '../App';
import reduceBooleanStringArray from '../hooks/StringBoolean';

export interface ConstantProps{
  argument: string[],
  argValue: argValuesTypes[],
  globalResult: string,
  setGlobalResult: React.Dispatch<React.SetStateAction<string>>
}

type allowedResult = argValuesTypes | "";
export type myResultType = allowedResult[]

export default function Constants(props: ConstantProps) {

  const [resultArray, setResultArray] = useState<myResultType>(["", ""]);
  const [andOr, setAndOr] = useState<"and" | "or">("and");
  
  useEffect(() => {
    if(andOr === 'and'){
      const ans = reduceBooleanStringArray(resultArray, "and");
      props.setGlobalResult(ans)
    }
    if(andOr === 'and'){
      const ans = reduceBooleanStringArray(resultArray, "or");
      props.setGlobalResult(ans)
    }

  },[resultArray])
  function appendOperations(){
    resultArray.push("")
    setResultArray([...resultArray]);
  }

  return (
    <div className='flex flex-col'>
    <select onChange={(e) => setAndOr(e.target.value as "and" | "or")}>
      <option value={"and"}>and</option>
      <option value={"or"}>or</option>
    </select>
    <div className='ml-1'>
      {
        resultArray.map((_, idx) => {
          return <div key={idx} ><App index={idx} globalResult={resultArray} setGlobalResult={setResultArray} globalArgument={props.argument} globalArgValue={props.argValue}/></div>
        })
      }
      <button type='button' onClick={() => appendOperations()}>+ opr</button>
      </div>
    </div>
  )

}

export interface PropsConstantCollapseToSelect{
  vals:argValuesTypes[],
  setResult:React.Dispatch<React.SetStateAction<string>>
}

export function ConstantCollapseToSelect(props:PropsConstantCollapseToSelect){

  function updateResult(e:React.ChangeEvent<HTMLSelectElement>){
    const value = e.target.value;
    props.setResult(value);
  }

  useEffect(() => {
    props.setResult("false")
  } ,[])

  return <>
   <select onChange={(e) => updateResult(e)}>
      <option value={"false"}>false</option>
      <option value={"true"}>true</option>
   </select>
  </>
}
