export default function reduceBooleanStringArray(resultArray:string[], operation: "and" | "or"){
      if(resultArray.includes("")) return "";
      let result = resultArray[0] === 'true' ? true : false;

      for(let i = 0; i < resultArray.length; i++){
        const bool = resultArray[i] === 'true' ? true : false;
        if(i === 0){
          result = bool;
          continue;
        }
        if(operation === 'and'){
          result &&= bool;
        }
        else if(operation === 'or'){
          result ||= bool;
        }
      }

      return result.toString();
  }

