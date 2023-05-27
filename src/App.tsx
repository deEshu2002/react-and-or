import { useEffect, useState } from 'react'
import './App.css'
import Arguments, { ArgumentCollapseIntoSelect } from './components/Arguments';
import Operations from './components/Operations';
import Constants, { ConstantCollapseToSelect, myResultType } from './components/Constants';

export type possibleOperation = "select" | "constant" | "argument" | "and" | "or";
export type argValuesTypes = "true" | "false";

export interface AppProps{
  index?:number
  setGlobalResult?: React.Dispatch<React.SetStateAction<myResultType>>,
  globalArgument?: string[]
  globalArgValue?: argValuesTypes[]
}

function App({index, setGlobalResult, globalArgument, globalArgValue}:AppProps) {

  const [selectedOption, setSelectedOption] = useState<possibleOperation>("select")
  const [result, setResult] = useState<string>("");

  const [argument, setArgument] = useState<string[]>(globalArgument || ["newArg"]);
  const [argValue, setArgValue] = useState<argValuesTypes[]>(globalArgValue || ["false"]);
  
  useEffect(() => {
    if(setGlobalResult && globalArgValue && typeof index === 'number'){
      globalArgValue[index] = result as argValuesTypes;
      setGlobalResult([...globalArgValue]);
    }
  }, [result])

  function removeSelectedOption(){
    setSelectedOption("select");
    setResult("");
  }

  return (
    <>
    <div className='flex flex-col fit-content'>
      {!globalArgument && <Arguments argument={argument} setArgument={setArgument} argValue={argValue} setArgValue={setArgValue}/>}
      <div className='flex'>
      {(selectedOption === 'select') && <Operations setSelectedOption={setSelectedOption}/>}
      {(selectedOption === 'constant') && <ConstantCollapseToSelect setResult={setResult}/>}
      {(selectedOption === 'argument') && <ArgumentCollapseIntoSelect args={argument} vals={argValue} setResult={setResult}/>}
      {(selectedOption === 'and' ) && <Constants constantType={"and"} argument={argument} argValue={argValue} globalResult={result} setGlobalResult={setResult}/>}
      {( selectedOption === 'or') && <Constants constantType={"or"} argument={argument} argValue={argValue} globalResult={result} setGlobalResult={setResult}/>}
      <button type='button' onClick={() =>removeSelectedOption()}>x</button>
      </div>
    </div>
    {!globalArgument && <p>result:{result}</p>}
    </>
  )
}

export default App
