/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';

interface Props {
  mask: any;
  inputValue: string;
  setInputValue: (value: string) => void;
  placeholder: string;
  maskedChar: string;
  onBlur: () => void;
}

const InputMask: React.FC<Props> = ({
  mask,
  inputValue,
  setInputValue,
  placeholder,
  maskedChar,
  onBlur,
}) => {
  const [position, setPosition] = useState(0);
  const GlRef = useRef<any>();
  const back = useRef(false);
  const adjustCursor = useRef(false);

  const toMaskPattern = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e as ChangeEvent<HTMLInputElement>;
    const { value, selectionStart } = target;

    if (!mask) {
      return value;
    }

    if (mask) {
      const newValue = [];
      const patternChars = mask.filter((m: any) => !(m instanceof RegExp));
      const unMaskedValue = value
        .split('')
        .filter((v) => !patternChars.includes(v))
        .filter((v) => v !== maskedChar && v !== ' ' && v !== '\u2009');
      // const selectionStart = e.target.selectionStart;
      const backSpace = (inputValue?.length > 0 && value.length < inputValue?.length) ?? false;
      let vIdx = 0;
      back.current = backSpace;
      adjustCursor.current = false;

      for (const m of mask) {
        if (backSpace && !unMaskedValue[vIdx]) {
          break;
        }

        if (m instanceof RegExp) {
          if (unMaskedValue[vIdx] && unMaskedValue[vIdx].match(m)) {
            newValue.push(unMaskedValue[vIdx]);
            vIdx++;
          } else {
            break;
          }
        } else {
          newValue.push(m);
        }
      }

      if (backSpace || selectionStart + patternChars.length < newValue.length) {
        adjustCursor.current = true;
        setPosition(selectionStart!);
      }

      return newValue.join('');
    }

    return value;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    GlRef.current = e.target;
    const newValue = toMaskPattern(e);
    setInputValue(newValue);
  };

  useEffect(() => {
    if (mask && adjustCursor.current) {
      GlRef.current.setSelectionRange(position, position);
    }
  }, [inputValue, position, mask]);

  return (
    <Input
      type="text"
      onChange={handleChange}
      value={inputValue}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};

const Input = styled.input`
  /* border: none; */
  outline: none;
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #ffffff;
  padding: 0 16px;

  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;

  ::-webkit-inner-spin-button,
  ::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
  ::-webkit-clear-button{
    display: none;
  }

  ::placeholder{
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #909599;
  }
`;

export default InputMask;
