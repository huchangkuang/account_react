import React, {useState} from "react";
import styled from "styled-components";
import {Prompt} from "../Prompt";
import {PopWarning} from "../PopWarning";
import {TimeInput} from "./TimeInput";

const Wrapper = styled.div`
        width: 100%;
        .buttons {
            display: flex;
            flex-wrap: wrap;
            box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.25);
            button {
                width: 25%;
                height: 48px;
                background: transparent;
                border: none;
                @media(max-height: 580px){
                  height: 40px;
                }
            }
            & :nth-child(1) {
                background: #f2f2f2;
            }
            & :nth-child(2), & :nth-child(5) {
                background: #e8e8e8;
            }
            & :nth-child(3), & :nth-child(6), & :nth-child(9) {
                background: #dedede;
            }
            & :nth-child(4), & :nth-child(7), & :nth-child(10), & :nth-child(13) {
                background: #d3d3d3;
            }
            & :nth-child(8), & :nth-child(11), & :nth-child(14) {
                background: #c9c9c9;
            }
            & :nth-child(12), & :nth-child(15) {
                background: #bfbfbf;
            }
            & :nth-child(16) {
                background: #b5b5b5;
            }
        }
`;
type Props = {
  value: string
  onChange: (value: string) => void
  getNote: (value: string) => void
  confirm: () => void
}
const NumberPad: React.FC<Props> = (props) => {
  const [display, setDisplay] = useState("hide");
  const [show,setShow] = useState("hide")
  const [input,setInput] = useState("hide")
  let output = props.value;
  const setOutput = (newOutput: string) => {
    props.onChange(newOutput);
  };
  const onClickWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent as string;
    if (text) {
      if ("0123456789.".indexOf(text) >= 0) {
        if (output.length <= 8) {
          if (output === "0" && text !== ".") {
            setOutput(text);
          } else {
            if (text === "." && output.indexOf(".") >= 0) {
              return;
            } else {
              setOutput(output + text);
            }
          }
        } else {
          if (parseFloat(output) > 100000) {
            window.alert("小老弟，你有那么多钱嘛");
          }
        }
      } else if (text === "删除") {
        if (output.length > 1) {
          setOutput(output.slice(0, output.length - 1));
        } else {
          setOutput("0");
        }
      } else if (text === "清空") {
        setOutput("0");
      } else if (text === "备注") {
        setDisplay("show");
      } else if (text === "今天") {
        setInput("show")
      } else if (text === "确认") {
        if (output === "0") {
          setShow("show")
          // window.alert("你记了笔0元的帐啊！");
        } else {
          props.confirm();
          setOutput("0")
        }
      }
    }
  };
  return (
    <Wrapper>
      <div className="buttons" onClick={onClickWrapper}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>备注</button>
        <button>.</button>
        <button>0</button>
        <button>今天</button>
        <button className="ok">确认</button>
      </div>
      <Prompt placeholder="请输入备注" children="备注" show={display} onChange={state => setDisplay(state)}
              getValue={value => props.getNote(value)}/>
      <PopWarning show={show} cancel={(value)=>{setShow(value)}}>"你记了笔0元的帐！"</PopWarning>
      <TimeInput class={input}/>
    </Wrapper>
  );
};
export {NumberPad};
