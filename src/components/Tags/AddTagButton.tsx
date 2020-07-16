import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Icon from "../Icon";

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
type Props = {
  name: string
  children: string
}
const AddTagButton: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Link to="/tag/add" className="link">
        <Icon name={props.name}/>
        {props.children}
      </Link>
    </Wrapper>
  );
};
export {AddTagButton};