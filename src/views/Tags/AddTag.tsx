import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { EditTitle } from "./EidtTitle";
import { EditInput } from "./EditInput";
import { IconList } from "./IconList";
import { useLocation, useNavigate } from "react-router-dom";
import { addTag } from "@/api/tags";
import { BillType } from "@/api/bills/type";
import { parseQuery } from "@/utils/parseQuery";
import { errorToast } from "@/utils/errortoast";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState<BillType>(BillType.paid);
  const validate = () => {
    if (!name.trim()) return "请输入标签名";
    if (!icon.trim()) return "请选择标签图标";
  };
  const save = async () => {
    const msg = validate();
    if (msg) {
      errorToast(msg);
      return;
    }
    try {
      await addTag({ type, name, icon });
      navigate(-1);
    } catch (e) {
      errorToast(e);
    }
  };
  useEffect(() => {
    const obj = parseQuery(location.search) as any;
    setType(obj.type);
  }, []);
  return (
    <Layout>
      <Wrapper>
        <EditTitle text="新增标签" save={save} />
        <EditInput value={name} onChange={(value) => setName(value)} />
        <IconList selectedName={icon} getIconName={(name) => setIcon(name)} />
      </Wrapper>
    </Layout>
  );
};
export { AddTag };
