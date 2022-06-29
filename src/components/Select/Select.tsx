import React from 'react';
import styled from 'styled-components';

export default function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <StyledSelect {...props}>{children}</StyledSelect>
  );
}

const StyledSelect = styled.select`
  padding: 0.4em;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.primary};
  ::placeholder {
    color: ${({ theme }) => theme.aux};
  }
  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.secondary};
    outline: none;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.primary};
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.aux + '80'};
    border-radius: 10px;
  } 

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.aux};
  }
`;
