import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Icon from "./Icon";


const NavWrapper = styled.nav`
    background: #ffffff;
    padding: 5px 0;
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.25);
    > ul {
        display: flex;
        > li {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 20%;
            font-size: 12px;
            .icon {
                width: 32px;
                height: 32px;
                margin: 3px;
            }
        }

    }
`;
const Nav = () => {
    return (
        <NavWrapper>
            <ul>
                <li>
                    <Icon name={"bill"}/>
                    <Link to="/bill">bill</Link>

                </li>
                <li>
                    <Icon name={"charts_line"}/>
                    <Link to="/statistic">statistic</Link>
                </li>
                <li>
                    <Icon name={"add"}/>
                    <Link to="/">money</Link>
                </li>
                <li>
                    <Icon name={"tag"}/>
                    <Link to="/tags">tags</Link>
                </li>
                <li>
                    <Icon name={"target"}/>
                    <Link to="/target">target</Link>
                </li>
            </ul>
        </NavWrapper>
    );
};
export default Nav;