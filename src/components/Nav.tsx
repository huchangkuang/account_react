import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Icon from "./Icon";


const NavWrapper = styled.nav`
    background: #ffffff;
    padding: 5px 0;
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.25);
    > ul {
        display: flex;
        > li {
            width: 20%;
            font-size: 12px;
            a {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .icon {
                    width: 32px;
                    height: 32px;
                    margin: 3px;
                }
                &.selected {
                    color: #f3c623;
                    .icon {
                      fill: #f3c623;
                    }
                }
            }
        }

    }
`;
const Nav = () => {
    return (
        <NavWrapper>
            <ul>
                <li>
                    <NavLink to="/bill" activeClassName="selected">
                        <Icon name={"bill"}/>
                        账单
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/statistic" activeClassName="selected">
                        <Icon name={"charts_line"}/>
                        统计
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/money" activeClassName="selected">
                        <Icon name={"add"}/>
                        记账
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tags" activeClassName="selected">
                        <Icon name={"tag"}/>
                        标签
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/target" activeClassName="selected">
                        <Icon name={"target"}/>
                        目标
                    </NavLink>
                </li>
            </ul>
        </NavWrapper>
    );
};
export default Nav;