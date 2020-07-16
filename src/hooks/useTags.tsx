import {useState} from "react";

const iconMap = [
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
  const [tags, setTags] = useState(iconMap);
  const findTag = (id:string) => tags.filter(i=>i.id===parseFloat(id))[0]
  return {tags, setTags,findTag};
};
export {useTags};