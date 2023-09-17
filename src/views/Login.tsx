import React, {FC, useState} from 'react';
import styled from "styled-components";
import Icon from "../components/Icon";
import {useHistory} from "react-router-dom";

type LoginProps = {

};
export const Login: FC<LoginProps> = (props) => {
  const history = useHistory();
  const [idName, setIdName] = useState('')
  const [password, setPassword] = useState('')
  const login = () => {
    fetch('/api/user/login', {
      body: JSON.stringify({idName,password}),
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
    })
  };
  const back = () => {
    history.goBack();
  };
  return (
    <Wrapper>
      <div>
        <Icon name="left" fill='black' onClick={back} />
      </div>
      <form>
        <div className='formItem'>
          <div className='label'>用户名：</div>
          <input value={idName} onChange={(e: any) => setIdName(e.target.value)} className='userName'/>
        </div>
        <div className='formItem'>
          <div className='label'>密码：</div>
          <input value={password} onChange={(e: any) => setPassword(e.target.value)} type='password' className='password'/>
        </div>
        <div className='desc'>未注册用户将自动注册</div>
        <div className='btn' onClick={login}>注册/登录</div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: #ffffff;
  min-height: 100vh;
  padding: 16px 24px;
  .icon {
    width: 24px;
    height: 24px;
  }
  form {
    margin-top: 200px;
    padding-inline: 10px;
    .desc {
      color: #ccc;
      font-size: 12px;
      margin-bottom: 40px;
    }
    .btn {
      border-radius: 8px;
      height: 44px;
      background: #f3c623;
      display: flex;
      justify-content: center;
      align-items: center;
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
      padding: 2px 4px;
      outline: none;
      border: none;
      background: none;
      border-bottom: 1px solid #eee;
      flex-grow: 1;
    }
  }
`