import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

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
        }

    }
`;
const Nav = () => {
    return (
        <NavWrapper>
            <ul>
                <li>
                    <Link to="/">money</Link>
                </li>
                <li>
                    <Link to="/statistic">statistic</Link>
                </li>
                <li>
                    <Link to="/bill">bill</Link>
                </li>
                <li>
                    <Link to="/tags">tags</Link>
                </li>
                <li>
                    <Link to="/target">target</Link>
                </li>
            </ul>
        </NavWrapper>
    );
};
export default Nav;