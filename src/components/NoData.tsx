import React from "react";
import { Icon } from "boat-ui-react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .boat-icon {
    margin-bottom: 20px;
    width: 48px;
    height: 48px;
  }
`;
const NoData: React.FC = () => {
  return (
    <Wrapper className="noData">
      <Icon name="write" />
      <div>暂无记录~</div>
      <div>快去记下一笔吧</div>
    </Wrapper>
  );
};
export { NoData };
