import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { selectIsSaveLoading } from '@/store/selectors/vacations';
import { addUserOvertime } from '@/store/actions/vacations';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useInput from '@/components/common/hooks/useInput';
import Calendar from '@/components/calendar/Calendar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import getMomentSting from '@/utils/getMomentSting';

interface Props extends RouteComponentProps<{ userId: string }> {}

const AddOvertime: React.FC<Props> = ({ match }) => {
  const { userId } = match.params;
  const date = moment();
  const [comment, setComment] = useInput('');
  const [isCommentEmpty, toggleIsCommentEmpty] = useToggle();
  const [tempDate, setTempDate] = useState<moment.Moment | null>(date);

  const handleSetDate = (value: moment.Moment | null) => setTempDate(value);

  const [{ inputsPages }] = useLanguage();

  const isSaveLoading = useSelector(selectIsSaveLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSaveButtonClick = () => {
    if (!comment.length) {
      toggleIsCommentEmpty(true);

      return;
    }

    const body = {
      userId: +userId,
      date: getMomentSting(tempDate!),
      comment,
    };
    dispatch(addUserOvertime(body));
  };

  useEffect(() => {
    if (comment.length) toggleIsCommentEmpty(false);
  }, [comment]);

  const isDateEmpty = !tempDate;

  const isSaveButtonDisabled = (
    isCommentEmpty
    || isDateEmpty
  );

  const handleGoToUsers = () => history.goBack();

  return (
    <>
      <Header>
        <IconWrap onClick={handleGoToUsers}>
          <CloseIcon />
        </IconWrap>
        <Title>{inputsPages.add_overtime}</Title>
      </Header>
      <MainWrap>
        <Wrapper>
          <CalendarWrap>
            <Calendar
              tempDate={tempDate}
              setTempDate={handleSetDate}
              fromDate
            />
          </CalendarWrap>
          <InputWrap>
            <Input
              type="text"
              placeholder="Description"
              label={inputsPages.comment}
              onChange={setComment}
              value={comment}
              errorMsg={inputsPages.required}
              isError={isCommentEmpty}
              autocapitalize="words"
            />
          </InputWrap>
        </Wrapper>
        <ButtonWrap>
          <Button
            onClick={handleSaveButtonClick}
            isLoading={isSaveLoading}
            disabledOnly={isSaveButtonDisabled}
            shadow
            isFixed={false}
          >
            {inputsPages.add}
          </Button>
        </ButtonWrap>
      </MainWrap>
    </>
  );
};

const Header = styled.header`
  height: 72px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 50%;
  max-width: 552px;
  width: 100%;
  transform: translateX(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 100px 16px 16px;
  overflow-y: auto;
  flex-shrink: 0;
  background: white;
  justify-content: space-between;
`;

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 40px;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const CalendarWrap = styled.div`
  height: 300px;
  width: 100%;
  margin: 15px 0 30px;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

export default AddOvertime;
