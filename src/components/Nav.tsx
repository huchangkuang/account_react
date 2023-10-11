import React from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "boat-ui-react";
import cs from "classnames";

const NavWrapper = styled.nav`
  background: #ffffff;
  padding: 10px 0 20px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.25);
  > ul {
    display: flex;
    > li {
      width: 20%;
      font-size: 12px;
      .navItem {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .boat-icon {
          width: 32px;
          height: 32px;
          margin: 3px;
        }
        &.selected {
          color: #f3c623;
          .boat-icon {
            fill: #f3c623;
          }
        }
      }
    }
  }
`;
const Nav = () => {
  const location = useLocation();
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink
            to="/bill"
            className={cs(
              "navItem",
              location.pathname === "/bill" && "selected",
            )}
          >
            <Icon name="bill" />
            账单
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/statistic"
            className={cs(
              "navItem",
              location.pathname === "/statistic" && "selected",
            )}
          >
            <Icon name="charts_line" />
            统计
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/money"
            className={cs(
              "navItem",
              location.pathname === "/money" && "selected",
            )}
          >
            <Icon name="add" />
            记账
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tags"
            className={cs(
              "navItem",
              location.pathname === "/tags" && "selected",
            )}
          >
            <Icon name="tag" />
            标签
          </NavLink>
        </li>
        <li>
          <NavLink
            className={cs(
              "navItem",
              location.pathname === "/target" && "selected",
            )}
            to="/target"
          >
            <Icon name="target" />
            目标
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};
export default Nav;
