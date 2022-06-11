import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoItem from './InfoItem';

describe('InfoItem', () => {
  test('EXPECT label and value to be in document WHEN rendered', () => {
    render(<InfoItem label="Name" value="some name" />);
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('some name')).toBeInTheDocument();
  });
});
