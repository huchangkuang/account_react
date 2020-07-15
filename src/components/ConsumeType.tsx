import React, {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f3c623;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
        padding: 12px 0;
        width: 100%;
        > div {
            border: 1px solid #333333;
            font-size: 16px;
            padding: 4px 23px;
            text-align: center;
            color: #333333;
            &.selected {
                background: #333333;
                color: #f3c623;
            }
        :first-child {
            border-radius: 4px 0 0 4px;
            }
        :last-child {
            border-radius: 0 4px 4px 0;
        }
        }     
`;
const ConsumeType:React.FC = () => {
    const [type,setType] = useState<string>("-")
    const selected = (t:string)=> type===t ? "selected" : ""

    return (
        <Wrapper className="type">
            <div className={selected("-")} onClick={()=>setType("-")}>支出</div>
            <div className={selected("+")} onClick={()=>setType("+")}>收入</div>
        </Wrapper>
    );
};
export {ConsumeType};