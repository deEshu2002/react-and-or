
export default function reduceBooleanStringArray(resultArray:string[], operation: "and" | "or"){
      let result = false;

      for(const str of resultArray){
        if(str === ''){
          return "";
        }
        const bool = str === 'true' ? true : false;
        
        if(operation === 'and'){
          result = result && bool;
        }else{
          result = result || bool;
        }
      }
      return result.toString();
  }

