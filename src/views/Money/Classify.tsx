import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { BillType } from "../../api/bills/type";
import { tagList } from "../../api/tags";
import { TagItem } from "../../api/tags/type";

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
const Classify: React.FC<Props> = ({
  selectIds,
  onChange,
  type,
  onGetList,
}) => {
  const [list, setList] = useState<TagItem[]>([]);
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
