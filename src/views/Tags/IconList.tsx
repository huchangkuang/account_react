import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";

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
      .icon {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        &.selected {
          background: #f3c623;
        }
      }
    }
  }
`;
const icon = [
  "food",
  "shop",
  "clothes",
  "bus",
  "entertainment",
  "handshake",
  "chat",
  "medical",
  "alipay",
  "time",
  "star",
  "beauty",
  "travel",
  "repair",
  "snacks",
  "sport",
  "gift",
  "house",
  "social_wechat",
  "social_sina",
  "part_time_job",
  "salary",
  "bonus",
  "lottery",
];
type Props = {
  selectedName: string;
  getIconName: (name: string) => void;
};
const IconList: React.FC<Props> = (props) => {
  return (
    <Wrapper className="iconList">
      <ul>
        {icon.map((i, index) => (
          <li key={index} onClick={() => props.getIconName(i)}>
            <Icon
              name={i}
              className={props.selectedName === i ? "selected" : ""}
            />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
export { IconList };
