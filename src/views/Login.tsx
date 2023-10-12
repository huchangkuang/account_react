import React, { FC, useState } from "react";
import styled from "styled-components";
import {Button, Icon} from "boat-ui-react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "@/api/user";
import { LocalStore } from "@/utils/localStore";
import { errorToast } from "@/utils/errorToast";
import { globalStyle } from "@/utils/style";

type LoginProps = {};
export const Login: FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const [idName, setIdName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const toLogin = async () => {
    try {
      const {
        data: { token, userName, avatar },
      } = await login({ idName, password });
      LocalStore.setToken(token || "");
      LocalStore.setUserName(userName || "");
      LocalStore.setAvatar(avatar || "");
      back();
    } catch (e) {
      errorToast(e);
    }
  };
  const toRegister = async () => {
    if (password !== password2) {
      errorToast("两次密码不一致");
      return;
    }
    try {
      await signUp({ idName, password });
      await toLogin();
    } catch (e) {
      errorToast(e);
    }
  };
  const back = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      <div>
        <Icon name="left" fill="black" onClick={back} />
      </div>
      <form>
        <div className="formItem">
          <div className="label">用户名：</div>
          <input
            placeholder="请输入用户名"
            maxLength={20}
            value={idName}
            onChange={(e: any) => setIdName(e.target.value)}
            className="userName"
          />
        </div>
        <div className="formItem">
          <div className="label">密码：</div>
          <input
            placeholder="请输入密码"
            maxLength={20}
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
            className="password"
          />
        </div>
        {!isLogin && (
          <div className="formItem">
            <div className="label">确认密码：</div>
            <input
              placeholder="请再次输入密码"
              maxLength={20}
              value={password2}
              onChange={(e: any) => setPassword2(e.target.value)}
              type="password"
              className="password"
            />
          </div>
        )}
        <div className="descWrap">
          <div className="desc">用户名与密码最多20个字符</div>
          <div className="toggle" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "去注册" : "去登录"}
          </div>
        </div>
        <Button
          type='primary'
          className="btn"
          onClick={() => {
            console.log(isLogin);
            if (isLogin) {
              toLogin();
            } else {
              toRegister();
            }
          }}
        >
          {isLogin ? "登录" : "注册并登录"}
        </Button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: #ffffff;
  min-height: 100vh;
  padding: 16px 24px;

  .boat-icon {
    width: 24px;
    height: 24px;
  }

  form {
    margin-top: 200px;
    padding-inline: 10px;

    .descWrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
      font-size: 12px;
      .desc {
        color: #ccc;
      }
      .toggle {
        color: #19a8e7;
      }
    }
    .btn {
      width: 100%;
      height: 44px;
      color: #fff;
      font-size: 18px;
    }
  }

  .formItem {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;

    .label {
      color: #999999;
      font-size: 14px;
      min-width: 80px;
    }

    input {
      padding: 8px;
      outline: none;
      border: none;
      background: none;
      border-bottom: 1px solid #eee;
      flex-grow: 1;
    }
  }
`;
