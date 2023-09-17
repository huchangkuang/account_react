import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";
import { useTags } from "../../hooks/useTags";

const Wrapper = styled.div`
  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 10px;
    border-bottom: 1px solid #c4c4c4;
    margin-left: 20px;
    .icon-name {
      display: flex;
      justify-content: space-around;
      align-items: center;
      min-width: 25%;
      min-height: 48px;
      .icon-container {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #e0e0e0;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 24px;
          height: 24px;
        }
      }
    }
    > .icon {
      width: 16px;
      height: 16px;
    }
  }
`;
type Props = {
  type: "-" | "+";
};
const DisplayTags: React.FC<Props> = (props) => {
  const { tags } = useTags();
  return (
    <Wrapper className="display">
      {tags
        .filter((i) => i.type === props.type)
        .map((i) => (
          <Link to={"/tags/" + i.id} key={i.id} className="link">
            <div className="icon-name">
              <div className="icon-container">
                <Icon name={i.name} />
              </div>
              <span>{i.text}</span>
            </div>
            <Icon name="right" />
          </Link>
        ))}
    </Wrapper>
  );
};
export { DisplayTags };
