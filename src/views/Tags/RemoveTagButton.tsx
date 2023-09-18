import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";

const Button = styled.button`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-top: 1px solid #c4c4c4;
  padding: 8px 0;
  background: white;
  font-size: 16px;
  > .icon {
    width: 24px;
    height: 24px;
  }
`;

type Props = {
  remove: () => void;
};
const RemoveTagButton: React.FC<Props> = (props) => {
  return (
    <Button onClick={() => props.remove()}>
      <Icon name="delete" />
      删除标签
    </Button>
  );
};
export { RemoveTagButton };
