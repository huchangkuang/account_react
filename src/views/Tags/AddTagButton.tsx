import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "boat-ui-react";
import { BillType } from "@/api/bills/type";
import { LocalStore } from "@/utils/localStore";

const Wrapper = styled.div`
  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #c4c4c4;
    padding: 8px 0;
    background: white;
    .boat-icon {
      width: 24px;
      height: 24px;
    }
  }
`;
const AddTagButton: React.FC<{ type: BillType }> = ({ type }) => {
  const token = LocalStore.getToken();
  return (
    <Wrapper>
      <Link to={token ? `/tag/add?type=${type}` : "/login"} className="link">
        <Icon name="addNoCircle" />
        添加类别
      </Link>
    </Wrapper>
  );
};
export { AddTagButton };
