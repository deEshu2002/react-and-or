import { useEffect, useState } from 'react'
import './App.css'
import Arguments, { ArgumentCollapseIntoSelect } from './components/Arguments';
import Operations from './components/Operations';
import Constants, { ConstantCollapseToSelect, myResultType } from './components/Constants';

export type possibleOperation = "select" | "constant" | "argument" | "and" | "or";
export type argValuesTypes = "true" | "false";

export interface AppProps{
  index?:number
  globalResult?: myResultType,
  setGlobalResult?: React.Dispatch<React.SetStateAction<myResultType>>,
  globalArgument?: string[]
  globalArgValue?: argValuesTypes[]
}

function App({index, globalResult, setGlobalResult, globalArgument=["newArg"], globalArgValue=["false"]}:AppProps) {

  const [selectedOption, setSelectedOption] = useState<possibleOperation>("select")
  const [result, setResult] = useState<string>("");

  const [argument, setArgument] = useState<string[]>(globalArgument);
  const [argValue, setArgValue] = useState<argValuesTypes[]>(globalArgValue);
  
  useEffect(() => {
  //   if(operationName === 'and' && typeof setGlobalResult === 'function' && globalResult.length > 1){
  //     setGlobalResult(stringBooleanOperation(result, globalResult, 'and'))
  //   }else if(operationName === 'or' && typeof setGlobalResult === 'function' && globalResult.length > 1){
  //     setGlobalResult(stringBooleanOperation(result, globalResult, 'or'))
  //   }
  //   console.log(result)
    if(globalResult && setGlobalResult && index){
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
      {!globalResult && <Arguments argument={argument} setArgument={setArgument} argValue={argValue} setArgValue={setArgValue}/>}
      <div className='flex'>
      {(selectedOption === 'select') && <Operations setSelectedOption={setSelectedOption}/>}
      {(selectedOption === 'constant') && <ConstantCollapseToSelect vals={argValue} setResult={setResult}/>}
      {(selectedOption === 'argument') && <ArgumentCollapseIntoSelect args={argument} vals={argValue} setResult={setResult}/>}
      {(selectedOption === 'and' || selectedOption === 'or' ) && <Constants argument={argument} argValue={argValue} globalResult={result} setGlobalResult={setResult}/>}
      <button type='button' onClick={() =>removeSelectedOption()}>x</button>
      </div>
    </div>
    {!globalResult && <p>result:{result}</p>}
    </>
  )
}

export default App
