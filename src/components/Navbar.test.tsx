import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('EXPECT title to be in document WHEN rendered', () => {
    render(<Navbar />);
    expect(screen.getByText('ASCE FOOTBALL')).toBeInTheDocument();
  });
  test('EXPECT Home to be in document WHEN rendered', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
