import React, {useState} from "react";
import styled from "styled-components";
import Layout from "../Layout";
import {EditTitle} from "./EidtTitle";
import {EditInput} from "./EditInput";
import {IconList} from "./IconList";
import {useType} from "../../hooks/useType";
import {useTags} from "../../hooks/useTags";
import {useHistory} from "react-router-dom";
import {PopWarning} from "../PopWarning";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .iconList {
    flex-grow: 1;
    margin-top: 20px;
    overflow: auto;
  }
`;
const AddTag = () => {
  const [value, setValue] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const {type} = useType();
  const {createTag} = useTags();
  const history = useHistory();
  const [show,setShow] = useState("")
  const [tagState,setTagState] = useState("")
  const save = () => {
    const saveState = {
      "name empty": "标签名不能为空",
      "icon empty": "请选择一个图标",
      "duplicated": "标签名重复了"
    };
    let result: "name empty" | "icon empty" | "duplicated" | "success" = createTag(selectedName, value, type);
    if (result !== "success") {
      setShow("show");
      setTagState(saveState[result]);
    } else {
      history.goBack();
    }
  };
  return (
    <Layout>
      <Wrapper>
        <EditTitle text="新增标签" save={save}/>
        <EditInput value={value} onChange={value => setValue(value)}/>
        <IconList selectedName={selectedName} getIconName={name => setSelectedName(name)}/>
        <PopWarning show={show} cancel={value => setShow(value)}>{tagState}</PopWarning>
      </Wrapper>
    </Layout>
  );
};
export {AddTag};