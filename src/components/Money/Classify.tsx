import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import {useTags} from "../../hooks/useTags";

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
type Props = {
    onIdChange:(id:number)=>void,
    id:number
}
const Classify:React.FC<Props> = (props)=>{
    const {tags} = useTags()
    let iconId = props.id
    const select = (id:number)=>{
        props.onIdChange(id)
    }
    return (
        <Wrapper>
            <ul>
                {tags.map(i=>
                    <li key={i.id}>
                        <Icon name={i.name} className={iconId===i.id?"selected":""}
                              onClick={()=>{select(i.id)}}/>
                        <span>{i.text}</span>
                    </li>
                )}
            </ul>
        </Wrapper>
    )
}
export {Classify}