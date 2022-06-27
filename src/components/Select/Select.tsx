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
  border: 2px solid ${({ theme }) => theme.primary};
  ::placeholder {
    color: ${({ theme }) => theme.aux};
  }
  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.secondary};
    outline: none;
  }
`;
