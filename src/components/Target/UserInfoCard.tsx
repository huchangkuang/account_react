import React, {FC} from 'react';
import styled from "styled-components";
import {Card} from "../Card";
import Icon from "../Icon";
import { Link } from 'react-router-dom';

type UserInfoProps = {

};
export const UserInfo: FC<UserInfoProps> = (props) => {
  return (
    <Wrapper>
      <Card className='userInfo'>
          <div className='left'>
            <Icon name='avatar' fill='#999' />
            <div className='userName'>
              HELLO!
            </div>
          </div>
          <Link to='/login' className='loginBtn'>
            注册/登录
          </Link>
      </Card>
  </Wrapper>
)};

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
`