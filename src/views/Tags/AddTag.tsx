import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { EditTitle } from "./EidtTitle";
import { EditInput } from "./EditInput";
import { IconList } from "./IconList";
import { useHistory } from "react-router-dom";
import {addTag} from "../../api/tags";
import querystring from "querystring";
import {BillType} from "../../api/bills/type";

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
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const history = useHistory();
  const [type, setType] = useState<BillType>(BillType.paid)
  const validate = () => {
    if (!name.trim()) return "请输入标签名"
    if (!icon.trim()) return "请选择标签图标"
  }
  const save = async () => {
    const msg = validate()
    if (msg) {
      console.error(msg);
      return;
    }
    try {
      await addTag({type, name, icon})
      history.goBack();
    } catch(e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const obj = querystring.parse(history.location.search.slice(1)) as any
    setType(obj.type)
  },[])
  return (
    <Layout>
      <Wrapper>
        <EditTitle text="新增标签" save={save} />
        <EditInput value={name} onChange={(value) => setName(value)} />
        <IconList
          selectedName={icon}
          getIconName={(name) => setIcon(name)}
        />
      </Wrapper>
    </Layout>
  );
};
export { AddTag };
