import React from 'react';
import styled from 'styled-components';

export default function Input({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  padding: 0.4em;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.fontColor};
  border: 2px solid ${({ theme }) => theme.primary};
  ::placeholder {
    color: ${({ theme }) => theme.aux};
  }
  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.secondary};
    outline: none;
  }
  & > options {
    color: red;
  }
`;
