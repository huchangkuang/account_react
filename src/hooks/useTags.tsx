import {useState} from "react";

const iconMap = [{id:0,name:"food",text:"餐饮",type:"-"},{id:1,name:"shop",text:"购物",type:"-"}]
const useTags = ()=>{
    const [tags,setTags] = useState(iconMap)
    return {tags,setTags}
}
export {useTags}