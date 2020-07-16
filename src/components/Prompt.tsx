import React, {ChangeEvent, useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: none;
        &.show {
            display: block;
        }
        .board {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 300px;
            height: 150px;
            border-radius: 20px;
            background: white;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            label {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                flex-grow: 1;
                > span {
                    font-weight: bold;
                }
                > input {
                    border: none;
                    border-bottom: 1px solid  #b5b5b5;
                    text-align: center;
                    font-size: 16px;
                }
            }
            .buttons {
                width: 100%;
                display: flex;
                justify-content: space-around;
                border-top:1px solid #b5b5b5;
                box-shadow: none;
                button {
                    background: transparent;
                    border: none;
                    &:first-child {
                        color: #1a73e8;
                    }
                    &:last-child {
                        color: #b5b5b5;
                        &.change {
                            color: #1a73e8;
                        }
                    }
                }
            }
        }
`
type Props = {
    placeholder:string,
    children:string,
    show:string,
    onChange:(state:string)=>void
    getNote:(value:string)=>void
}
const Prompt:React.FC<Props> = (props)=>{
    const display = props.show
    const [value,setValue] = useState("")
    const confirm = ()=>{
        if (value!==""){
            props.getNote(value)
            props.onChange("hide")
            setValue("")
        }
    }
    return (
        <Wrapper className={display}>
            <div className="board">
                <label>
                    <span>{props.children}</span>
                    <input type="text" placeholder={props.placeholder} value={value}
                           onChange={(e:ChangeEvent<HTMLInputElement>)=>{setValue(e.target.value)}}/>
                </label>
                <div className="buttons">
                    <button onClick={()=>{props.onChange("hide")}}>取消</button>
                    <button className={value===""?"":"change"} onClick={confirm}>确认</button>
                </div>
            </div>
        </Wrapper>
    )
}
export {Prompt}