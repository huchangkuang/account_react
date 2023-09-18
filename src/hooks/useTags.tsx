import { useState } from "react";
import { createId } from "../lib/createId";
import { useUpdate } from "./useUpdate";
import { BillType } from "../api/bills/type";

const { paid, receive } = BillType;
type Tag = { id: number; name: string; icon: string; type: BillType };
let iconMap = [
  { id: 0, name: "food", text: "餐饮", type: paid },
  { id: 1, name: "shop", text: "购物", type: paid },
  { id: 2, name: "clothes", text: "服饰", type: paid },
  { id: 3, name: "bus", text: "交通", type: paid },
  { id: 4, name: "entertainment", text: "娱乐", type: paid },
  { id: 5, name: "handshake", text: "社交", type: paid },
  { id: 6, name: "chat", text: "通讯", type: paid },
  { id: 7, name: "medical", text: "医疗", type: paid },
  { id: 8, name: "part_time_job", text: "兼职", type: receive },
  { id: 9, name: "salary", text: "工资", type: receive },
  { id: 10, name: "bonus", text: "奖金", type: receive },
  { id: 11, name: "lottery", text: "彩票", type: receive },
];
const useTags = () => {
  const [tags, setTags] = useState<Tag[]>(
    JSON.parse(window.localStorage.getItem("tags") || JSON.stringify(iconMap)),
  );
  const findTag = (id: string) =>
    tags.filter((i) => i.id === parseFloat(id))[0] || {};
  const updateTag = (id: string, value: string, selectedName: string) => {
    if (!value) {
      return "empty";
    } else if (tags.filter((i) => i.text === value).length > 0) {
      return "duplicated";
    } else {
      setTags(
        tags.map((tag) =>
          tag.id === parseFloat(id)
            ? { ...tag, name: selectedName, text: value }
            : tag,
        ),
      );
      return "success";
    }
  };
  const createTag = (selectedName: string, value: string, type: Category) => {
    if (!value) {
      return "name empty";
    } else if (!selectedName) {
      return "icon empty";
    } else if (tags.filter((i) => i.text === value).length > 0) {
      return "duplicated";
    } else {
      let tagsClone: Tag[] = JSON.parse(JSON.stringify(tags));
      tagsClone.push({
        id: createId(),
        name: selectedName,
        text: value,
        type: type,
      });
      setTags(tagsClone);
      return "success";
    }
  };
  const removeTag = (id: string) => {
    setTags(tags.filter((i) => i.id !== parseFloat(id)));
  };
  const save = () => {
    window.localStorage.setItem("tags", JSON.stringify(tags));
  };
  useUpdate(() => {
    save();
  }, [tags]);

  return { tags, setTags, findTag, updateTag, createTag, removeTag };
};
export { useTags };
