import Layout from "../components/Layout";
import React, { useState } from "react";
import { ConsumeType } from "../components/ConsumeType";
import { Receipt } from "./Money/Receipt";
import { NumberPad } from "./Money/NumberPad";
import { Classify } from "./Money/Classify";
import styled from "styled-components";
import { useTags } from "../hooks/useTags";
import dayjs from "dayjs";
import { useRecord } from "../hooks/useRecord";

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
type Category = "-" | "+";
type ReceiptData = {
  amount: string;
  date: string;
  selectedId: number;
  note: string;
  type: Category;
};
const Money = () => {
  const { recordItem, setRecordItem } = useRecord();
  const { tags } = useTags();
  const now = dayjs().format("YYYY-MM-DD");
  const defaultData: ReceiptData = {
    amount: "0",
    date: now,
    selectedId: 0,
    note: "",
    type: "-",
  };
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    ...defaultData,
    selectedId: tags.filter((i) => i.type === defaultData.type)[0].id,
  });
  const onChange = (obj: object) => {
    setReceiptData({ ...receiptData, ...obj });
  };
  const confirm = () => {
    window.alert("记下一笔！");
    setRecordItem([...recordItem, receiptData]);
  };
  return (
    <Layout>
      <Wrapper>
        <ConsumeType
          type={receiptData.type}
          onChange={(type) =>
            onChange({
              type: type,
              selectedId: tags.filter((i) => i.type === type)[0].id,
            })
          }
        />
        <Classify
          onChange={(id) => onChange({ selectedId: id })}
          id={receiptData.selectedId}
          type={receiptData.type}
        />
        <Receipt receiptData={receiptData} />
        <NumberPad
          value={receiptData.amount}
          onChange={(value) => onChange({ amount: value })}
          getNote={(value) => onChange({ note: value })}
          confirm={confirm}
          getTime={(time) => onChange({ date: time })}
        />
      </Wrapper>
    </Layout>
  );
};
export default Money;
