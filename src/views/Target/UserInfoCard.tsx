import React, { FC } from "react";
import styled from "styled-components";
import { Card } from "../../components/Card";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";
import { LocalStore } from "../../utils/localStore";

type UserInfoProps = {};
export const UserInfo: FC<UserInfoProps> = (props) => {
  const token = LocalStore.getToken();
  const userName = LocalStore.getUserName();
  const avatar = LocalStore.getAvatar();
  return (
    <Wrapper>
      <Card className="userInfo">
        <div className="left">
          {token && avatar ? (
            <img className="avatar" alt="" src={avatar} />
          ) : (
            <Icon name="avatar" fill="#999" />
          )}
          <div className="userName">
            {token && userName ? userName : "HELLO!"}
          </div>
        </div>
        <Link to="/login" className="loginBtn">
          {!token ? "注册/登录" : "切换用户"}
        </Link>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: -10px;
  .userInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 12px;
        border-radius: 50%;
        object-fit: fill;
      }
      .userName {
        color: #333333;
        font-weight: bold;
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .loginBtn {
      color: #333333;
    }
  }
`;
