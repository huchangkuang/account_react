import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { useTags } from "../../hooks/useTags";

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
type Props = {
  onChange: (id: number) => void;
  id: number;
  type: "-" | "+";
};
const Classify: React.FC<Props> = (props) => {
  const { tags } = useTags();
  let iconId = props.id;
  const select = (id: number) => {
    props.onChange(id);
  };
  return (
    <Wrapper>
      <ul>
        {tags
          .filter((i) => i.type === props.type)
          .map((i) => (
            <li key={i.id}>
              <Icon
                name={i.name}
                className={iconId === i.id ? "selected" : ""}
                onClick={() => {
                  select(i.id);
                }}
              />
              <span>{i.text}</span>
            </li>
          ))}
      </ul>
    </Wrapper>
  );
};
export { Classify };
