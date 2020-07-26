import {useState} from "react";
import {createId} from "../lib/createId";
import {useUpdate} from "./useUpdate";

type Category = "-" | "+"
type Tag = {id: number, name: string, text: string, type: Category}
let iconMap = [
  {id: 0, name: "food", text: "餐饮", type: "-"},
  {id: 1, name: "shop", text: "购物", type: "-"},
  {id: 2, name: "clothes", text: "服饰", type: "-"},
  {id: 3, name: "bus", text: "交通", type: "-"},
  {id: 4, name: "entertainment", text: "娱乐", type: "-"},
  {id: 5, name: "handshake", text: "社交", type: "-"},
  {id: 6, name: "chat", text: "通讯", type: "-"},
  {id: 7, name: "medical", text: "医疗", type: "-"},
  {id: 8, name: "part_time_job", text: "兼职", type: "+"},
  {id: 9, name: "salary", text: "工资", type: "+"},
  {id: 10, name: "bonus", text: "奖金", type: "+"},
  {id: 11, name: "lottery", text: "彩票", type: "+"}
];
const useTags = () => {
  const [tags, setTags] = useState<Tag[]>(JSON.parse(window.localStorage.getItem("tags") || JSON.stringify(iconMap)));
  const findTag = (id:string) => tags.filter(i=>i.id===parseFloat(id))[0] || {}
  const updateTag = (id:string, value:string, selectedName:string) => {
    setTags(tags.map(tag=>tag.id===parseFloat(id) ?  {...tag,name:selectedName,text:value} : tag))
  }
  const createTag = (selectedName:string,value:string,type:Category) => {
    let tagsClone: Tag[] = JSON.parse(JSON.stringify(tags))
    tagsClone.push({id: createId(),name: selectedName,text: value,type: type})
    setTags(tagsClone)
  }
  const removeTag = (id:string)=>{
    setTags(tags.filter(i=>i.id!==parseFloat(id)))
  }
  const save=() => {
    window.localStorage.setItem("tags",JSON.stringify(tags))
  }
  useUpdate(()=>{
    save()
  },[tags])

  return {tags, setTags,findTag,updateTag,createTag,removeTag};
};
export {useTags};