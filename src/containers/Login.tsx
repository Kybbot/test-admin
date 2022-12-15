import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Buffer } from 'buffer';

import { selectIsLoginPending, selectIsLoginResolved } from '@/store/selectors/auth';
import { login } from '@/store/actions/login';
import useToggle from '@/components/common/hooks/useToggle';

import useLanguage from '@/components/common/hooks/useLanguage';
import Button from '@/components/Button';
import Input from '@/components/Input';
import LoaderDots from '@/components/common/LoaderDots';
import useInput from '@/components/common/hooks/useInput';
import Icon from '@/components/Icon';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = ({ history, location }) => {
  const isLoading = useSelector(selectIsLoginPending);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [isEmailError, toggleIsEmailError] = useToggle();
  const [isPasswordError, toggleIsPasswordError] = useToggle();
  const dispatch = useDispatch();
  const [{ authorization }] = useLanguage();
  const isLoggedIn = useSelector(selectIsLoginResolved);
  const path = location.pathname.replace('/login', '');

  useEffect(() => {
    if (location.pathname.length && isLoggedIn) history.push(path);
  }, []);

  const keyHandler = (e: any) => {
    if (e.keyCode === 13) {
      handleLoginBtnClick();
    }
  };

  const handleLoginBtnClick = () => {
    if (!email) toggleIsEmailError(true);
    if (!password) toggleIsPasswordError(true);

    if (!email || !password) return;

    const data = {
      email,
      password: Buffer.from(password).toString('base64'),
    };

    dispatch(login(data, path));
  };

  useEffect(() => {
    if (email) toggleIsEmailError(false);
    if (password) toggleIsPasswordError(false);
  }, [email, password]);

  const isButtonDisabled = isEmailError || isPasswordError;

  return (
    <LoginStyled>
      <Header>
        <Icon img="lambda.png" width="40px" height="40px" />
        <Title>LambdaManagement</Title>
      </Header>
      <Container>
        <Section>
          <SubTitle>{authorization.authorization_header}</SubTitle>
          <InputWrapper>
            <Input
              type="text"
              placeholder="email@gmail.com"
              value={email}
              onChange={setEmail}
              onKeyDown={keyHandler}
              errorMsg="Email is required"
              isError={isEmailError}
              label={authorization.authorization_email}
              autoComplete="on"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              onKeyDown={keyHandler}
              errorMsg="Password is required"
              isError={isPasswordError}
              label={authorization.authorization_password}
            />
          </InputWrapper>
        </Section>
        <BtnWrapper>
          <Button
            shadow
            isLoading={isLoading}
            onClick={handleLoginBtnClick}
            disabledOnly={isButtonDisabled}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {isLoading ? <LoaderDots /> : authorization.authorization_header}
          </Button>
        </BtnWrapper>
      </Container>
      <Dots src="/assets/lines_left.png" />
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  // height: 100%;
  max-width: 552px;
`;

const Header = styled.header`
  display: flex;
  height: 90px;
  padding: 24px 16px;
  align-items: center;
  margin-bottom: 90px;
`;

const Container = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 100%;
`;

const Section = styled.section`
`;

const Title = styled.h1`
  font-size: 23px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-left: 16px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #21272e;
  text-transform: uppercase;
`;

const InputWrapper = styled.div`
  display: flex;
  margin: 24px 0;
  position: relative;
  z-index: 2;
`;

const BtnWrapper = styled.div`
  margin-bottom: 24px;
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 80px 16px 0;
  width: 100%;
  max-width: 552px;
`;

const Dots = styled.img`
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  right: 0;
  z-index: 0;
`;

export default Login;
