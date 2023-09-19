import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { BillType } from "../../api/bills/type";

const Wrapper = styled.div`
  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #c4c4c4;
    padding: 8px 0;
    background: white;
    .icon {
      width: 24px;
      height: 24px;
    }
  }
`;
const AddTagButton: React.FC<{ type: BillType }> = ({ type }) => {
  return (
    <Wrapper>
      <Link to={`/tag/add?type=${type}`} className="link">
        <Icon name="addNoCircle" />
        添加类别
      </Link>
    </Wrapper>
  );
};
export { AddTagButton };
