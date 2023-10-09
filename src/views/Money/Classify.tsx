import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "boat-ui-react";
import { BillType } from "@/api/bills/type";
import { tagList } from "@/api/tags";
import { TagItem } from "@/api/tags/type";
import dayjs from "dayjs";

const Wrapper = styled.div`
  width: 90%;
  ul {
    display: flex;
    flex-wrap: wrap;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    li {
      width: 25%;
      height: 64px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media (max-height: 580px) {
        height: 48px;
        font-size: 14px;
        .icon {
          width: 22px;
          height: 22px;
        }
      }
      .icon {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        padding: 4px;
        &.selected {
          background: #f3c623;
        }
      }
    }
  }
`;
type Props = {
  onChange: (ids: number[]) => void;
  selectIds: number[];
  type: BillType;
  onGetList?: (list: TagItem[]) => void;
};
const { paid, receive } = BillType;
export const initTags = [
  { icon: "food", name: "餐饮", type: paid },
  { icon: "shop", name: "购物", type: paid },
  { icon: "clothes", name: "服饰", type: paid },
  { icon: "bus", name: "交通", type: paid },
  { icon: "entertainment", name: "娱乐", type: paid },
  { icon: "handshake", name: "社交", type: paid },
  { icon: "chat", name: "通讯", type: paid },
  { icon: "medical", name: "医疗", type: paid },
  { icon: "part_time_job", name: "兼职", type: receive },
  { icon: "salary", name: "工资", type: receive },
  { icon: "bonus", name: "奖金", type: receive },
  { icon: "lottery", name: "彩票", type: receive },
];
const Classify: React.FC<Props> = ({
  selectIds,
  onChange,
  type,
  onGetList,
}) => {
  const [list, setList] = useState<TagItem[]>(initTags.map((i, index) => ({...i, id: index, createAt: dayjs().format('YYYY-MM-DD HH:mm:ss')})));
  const fetchTagList = async () => {
    try {
      const { data } = await tagList();
      setList(data);
      onGetList?.(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchTagList();
  }, []);
  return (
    <Wrapper>
      <ul>
        {list
          .filter((i) => i.type === type)
          .map((i) => (
            <li key={i.id}>
              <Icon
                name={i.icon}
                className={selectIds.includes(i.id) ? "selected" : ""}
                onClick={() => {
                  const ids = selectIds.includes(i.id)
                    ? selectIds.filter((j) => j !== i.id)
                    : [...selectIds, i.id];
                  onChange(ids);
                }}
              />
              <span>{i.name}</span>
            </li>
          ))}
      </ul>
    </Wrapper>
  );
};
export { Classify };
