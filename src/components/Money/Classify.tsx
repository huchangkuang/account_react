import React, {useState} from "react";
import styled from "styled-components";
import Icon from "../Icon";

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
`
const iconMap = [{id:0,name:"food",text:"餐饮",type:"-"},{id:1,name:"shop",text:"购物",type:"-"}]

const Classify:React.FC = ()=>{
    const [selectedIcon,setSelectedIcon] = useState("food")
    return (
        <Wrapper>
            <ul>
                {iconMap.map(i=>
                    <li key={i.id}>
                        <Icon name={i.name} className={selectedIcon===i.name?"selected":""}
                              onClick={()=>setSelectedIcon(i.name)}/>
                        <span>{i.text}</span>
                    </li>
                )}
            </ul>
        </Wrapper>
    )
}
export {Classify}