import Layout from "@/components/Layout";
import React, { useState } from "react";
import { ConsumeType } from "@/components/ConsumeType";
import { Receipt } from "./Money/Receipt";
import { NumberPad } from "./Money/NumberPad";
import { Classify } from "./Money/Classify";
import styled from "styled-components";
import { BillType, CommonBill } from "@/api/bills/type";
import { addBill } from "@/api/bills";
import dayjs from "dayjs";
import { TagItem } from "@/api/tags/type";
import { useNavigate } from "react-router-dom";
import { LocalStore } from "@/utils/localStore";
import { errorToast } from "@/utils/errorToast";
import {message} from "boat-ui-react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .type {
    min-height: 54px;
  }
`;

const defaultData: CommonBill = {
  cash: "0",
  remark: "",
  date: dayjs().format("YYYY-MM-DD"),
  tags: [],
  type: BillType.paid,
};
const Money = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<TagItem[]>([]);
  const [receiptData, setReceiptData] = useState<CommonBill>(defaultData);
  const onChange = (obj: Partial<CommonBill>) => {
    setReceiptData({ ...receiptData, ...obj });
  };
  const confirm = async () => {
    if (!LocalStore.getToken()) {
      navigate("/login");
      return;
    }
    const { cash, tags = [] } = receiptData;
    if (!Number(cash)) {
      errorToast("金额不能为0");
      return;
    }
    if (!tags.length) {
      errorToast("请至少选择一个标签");
      return;
    }
    try {
      await addBill(receiptData);
      setReceiptData({ ...defaultData, type: receiptData.type });
      message.success('记了一笔')
    } catch (e) {
      errorToast(e);
    }
  };
  return (
    <Layout>
      <Wrapper>
        <ConsumeType
          type={receiptData.type}
          onChange={(type) => onChange({ type })}
        />
        <Classify
          onChange={(ids) => onChange({ tags: ids })}
          selectIds={receiptData.tags ?? []}
          type={receiptData.type}
          onGetList={setTags}
        />
        <Receipt receiptData={receiptData} tags={tags} />
        <NumberPad
          value={receiptData.cash}
          onChange={(value) => onChange({ cash: value })}
          getNote={(value) => onChange({ remark: value })}
          confirm={confirm}
          getTime={(value) => onChange({ date: value })}
        />
      </Wrapper>
    </Layout>
  );
};
export default Money;
