import { ChangeEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';

type SwitchProps = {
  name: string;
  checked: boolean;
  onChange?: () => void;
};

export default function Switch({
  name,
  checked,
  onChange,
}: SwitchProps): ReactElement {
  return (
    <Label htmlFor={name}>
      <Input checked={checked} type="checkbox" onChange={onChange} id={name} />
      <SwitchElement />
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const SwitchElement = styled.div`
  position: relative;
  width: 32px;
  height: 14px;
  background: ${({ theme }) => theme.primary};
  border-radius: 16px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 16px;
    top: 50%;
    left: 1px;
    background: ${({ theme }) => theme.fontColor};
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${SwitchElement} {
    background: ${({ theme }) => theme.primary};

    &:before {
      transform: translate(16px, -50%);
    }
  }
`;
