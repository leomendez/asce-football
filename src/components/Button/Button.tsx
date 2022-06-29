import React from 'react';
import styled from 'styled-components';

export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.fontColor};
  border: 2px solid ${({ theme }) => theme.background};
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1.5em;
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.secondary};
  }
  &:disabled {
    box-shadow: none;
    opacity: 0.5;
    cursor: default;
    border: 2px solid ${({ theme }) => theme.background};
  }
`;
