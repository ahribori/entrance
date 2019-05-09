import React, { Component } from 'react';
import queryString from 'query-string';
import classNames from 'classnames';
import styles from '../styles/index.module.scss';

class Login extends Component<any, any> {
  state = {
    ...queryString.parse(window.location.search),
  };

  render() {
    return (
      <section className={styles.login_section}>
        <div className={styles.login_body}>
          <div className={styles.login_logo}>
            <a href="#none">
              <img
                src="https://file.namu.moe/file/686b063c5ce6deea1a54949c6dbf1888d65aae627af42cb40c5d881ce4121321"
                alt="로고"
              />
            </a>
          </div>
          <div className={styles.login_copy_text}>
            하나의 아이디로 모든 서비스를 이용하세요.
          </div>
          <form>
            <input
              type="text"
              placeholder="이메일"
              className={styles.login_input}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className={classNames(styles.login_input, styles.login_password)}
            />
            <div className={styles.password_renew_message}>
              <span className={styles.text}>
                <a href="#none">비밀번호 재설정</a>
              </span>
            </div>
            <button type="button" className={styles.login_button}>
              로그인
            </button>
          </form>
          <div className={styles.sign_up_message}>
            <span className={styles.text}>
              계정이 없으신가요? <a href="#none">회원가입</a>
            </span>
          </div>
        </div>
      </section>
    );
  }

  componentDidMount(): void {
    console.log(this.state);
  }
}

export default Login;
