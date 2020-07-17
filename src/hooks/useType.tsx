import {useState} from "react"

type Category = "-"|"+"
let currentType:Category = "-"
const useType = ()=>{
  const [type,setType] = useState<Category>(currentType)
  currentType = type
  return {type,setType}
}
export {useType}