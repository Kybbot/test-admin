import React from 'react';
import styled from 'styled-components';
import { OnChange } from '@/components/common/hooks/useInput';
import ImageIcon from './common/icons/ImageIcon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  src: string;
  alt: string;
  file: string;
  type: string;
  handlePhotoFile: any;
}

const InputFile: React.FC<Props> = ({
  src,
  alt,
  handlePhotoFile,
  type = 'file',
}) => (
  <>
    <InputsWrapFile>
      <InputWrapper>
        <IconWrapper>
          <ImageIcon />
        </IconWrapper>
        <Input accept="image/*" type={type} onChange={handlePhotoFile} />
      </InputWrapper>
      <EmptyPlace />
      <Image src={src} alt={alt} />
    </InputsWrapFile>
  </>
);

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
`;

const Input = styled.input<{ onChange: OnChange; type: string }>`
  background: rgb(240 241 242 / 27%);
  height: 50px;
  cursor: pointer;
  border: 1px solid #dae1e8;
  border-radius: 8px;
  width: 100%;
`;

const InputsWrap = styled.div<{ alt?: string }>`
  display: flex;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 24px;
  left: 20px;
  margin-top: 11px;
  cursor: pointer;
`;

const InputsWrapFile = styled(InputsWrap)`
  margin: 0;

  input::-webkit-file-upload-button {
    display: flex;
    align-items: center;
    padding: 0 16px;
    visibility: hidden;
    width: 100%;
  }

  input::before {
    content: 'Select Image';
    display: inline-block;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    font-weight: 600;
    color: #909599;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 14px;
    margin-left: 55px;
    margin-top: 15px;
    color: #21272e;
  }

  input::before {
    border: none;
  }
  input::hover {
    display: none;
  }
`;

const EmptyPlace = styled.div`
  width: 16px;
`;

const Image = styled.img`
  flex: 0 0 50px;
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 30px;
`;

export default InputFile;
