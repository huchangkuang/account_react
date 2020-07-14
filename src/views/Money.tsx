import Layout from "../components/Layout";
import React from "react";
import {ConsumeType} from "../components/ConsumeType";
import {Receipt} from "../components/Money/Receipt";
import {NumberPad} from "../components/Money/NumberPad";
import {Classify} from "../components/Money/Classify";

function Money() {
    return (
        <Layout>
            <ConsumeType/>
            <Classify/>
            <Receipt/>
            <NumberPad/>
        </Layout>
    );
}
export default Money