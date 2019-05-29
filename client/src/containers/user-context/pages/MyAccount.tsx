import React, { Component } from 'react';
import * as dateFns from 'date-fns';
import { Descriptions, Badge, Avatar } from 'antd';
import { inject, observer } from 'mobx-react';
import AccountStore from '../../../store/AccountStore';

interface IProps {
  accountStore: typeof AccountStore;
}

interface IState {}

@inject('accountStore')
@observer
class MyAccount extends Component<IProps, IState> {
  render() {
    const { accountDetails } = this.props.accountStore;
    if (!accountDetails) {
      return null;
    }

    const {
      id,
      accountType,
      email,
      emailVerified,
      active,
      nickname,
      thumbnailImage,
      profileImage,
      point,
      exp,
      roles,
      createdAt,
    } = accountDetails;

    return (
      <Descriptions
        title="내 계정 정보"
        bordered
        column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Descriptions.Item label="계정(이메일)">
          <span>{email}</span>
        </Descriptions.Item>
        <Descriptions.Item label="닉네임">
          <span>{nickname}</span>
        </Descriptions.Item>
        <Descriptions.Item label="계정 타입">
          <span>{accountType}</span>
        </Descriptions.Item>
        <Descriptions.Item label="가입일">
          <span>{dateFns.format(createdAt, 'YYYY년 MM월 DD일')}</span>
        </Descriptions.Item>
        <Descriptions.Item label="프로필 이미지" span={2}>
          <Avatar shape="square" icon="user" size={'large'} />
        </Descriptions.Item>
        <Descriptions.Item label="계정 상태">
          <Badge
            status={active ? 'processing' : 'error'}
            text={active ? '정상' : '휴면'}
          />
        </Descriptions.Item>
        <Descriptions.Item label="이메일 인증">
          <Badge
            status={emailVerified ? 'success' : 'error'}
            text={emailVerified ? '인증됨' : '인증 안됨'}
          />
        </Descriptions.Item>
        <Descriptions.Item label="포인트">
          <span>{point} P</span>
        </Descriptions.Item>
        <Descriptions.Item label="경험치">
          <span>{exp} EXP</span>
        </Descriptions.Item>
      </Descriptions>
    );
  }
}

export default MyAccount;
