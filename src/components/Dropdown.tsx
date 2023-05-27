
export default function Dropdown({parameters}:{parameters:string[]}) {

  return (
    <>
    <select>
      {
        parameters.map((elem, idx) =>{
          return <option value={elem} key={idx}>{elem}</option>
        })
      }
    </select>
    </>
  )
}
