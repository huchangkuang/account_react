import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { RemoveTagButton } from "./RemoveTagButton";
import { EditTitle } from "./EidtTitle";
import { IconList } from "./IconList";
import { EditInput } from "./EditInput";
import { delTag, updateTag } from "@/api/tags";
import { BillType } from "@/api/bills/type";
import { parseQuery } from "@/utils/parseQuery";
import { errorToast } from "@/utils/errorToast";
import { LocalStore } from "@/utils/localStore";

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
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<BillType>(BillType.paid);
  const navigate = useNavigate();
  const location = useLocation();
  const remove = async () => {
    if (!LocalStore.getToken()) {
      navigate("/login");
      return;
    }
    try {
      await delTag(Number(id));
      navigate(-1);
    } catch (e) {
      errorToast(e);
    }
  };
  const validate = () => {
    if (!name.trim()) return "请输入标签名";
    if (!icon.trim()) return "请选择标签图标";
  };
  const save = async () => {
    if (!LocalStore.getToken()) {
      navigate("/login");
      return;
    }
    const msg = validate();
    if (msg) {
      errorToast(msg);
      return;
    }
    try {
      await updateTag({
        id: Number(id),
        type,
        name,
        icon,
      });
      navigate(-1);
    } catch (e) {
      errorToast(e);
    }
  };
  useEffect(() => {
    const obj = parseQuery(location.search) as any;
    setType(obj.type);
    setName(decodeURIComponent(obj.tagName));
    setIcon(obj.icon);
  }, []);
  return (
    <Layout>
      <Wrapper>
        <EditTitle text="编辑标签" save={save} />
        <EditInput value={name} onChange={(value) => setName(value)} />
        <IconList selectedName={icon} getIconName={(name) => setIcon(name)} />
        <RemoveTagButton remove={remove} />
      </Wrapper>
    </Layout>
  );
};
export { EditTag };
