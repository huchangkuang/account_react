import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import {RemoveTagButton} from "./RemoveTagButton";
import {EditTitle} from "./EidtTitle";
import {IconList} from "./IconList";
import {EditInput} from "./EditInput";
import {delTag, updateTag} from "../../api/tags";
import {BillType} from "../../api/bills/type";
import * as querystring from "querystring";

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
type Params = {
  id: string;
};
const EditTag = () => {
  let { id } = useParams<Params>();
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<BillType>(BillType.paid)
  const history = useHistory();
  const remove = async () => {
    try {
      await delTag(Number(id))
      history.goBack();
    } catch(e) {
      console.error(e);
    }
  };
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
      await updateTag({
        id: Number(id),
        type,
        name,
        icon
      })
      history.goBack();
    } catch(e) {
      console.error(e)
    }
  };
  useEffect(() => {
    const obj = querystring.parse(history.location.search.slice(1)) as any
    setType(obj.type as BillType)
  },[])
  return (
    <Layout>
      <Wrapper>
        <EditTitle text="编辑标签" save={save} />
        <EditInput value={name} onChange={(value) => setName(value)} />
        <IconList
          selectedName={icon}
          getIconName={(name) => setIcon(name)}
        />
        <RemoveTagButton remove={remove} />
      </Wrapper>
    </Layout>
  );
};
export { EditTag };
