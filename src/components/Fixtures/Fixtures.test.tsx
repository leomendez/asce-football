import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Fixtures from './Fixtures';
import { fixtures } from '../../__mocks__/data/fixtures';

const FIXTURES = fixtures;

describe('InfoItem', () => {
  test('EXPECT fixtures to be in document WHEN rendered', () => {
    render(<Fixtures fixtures={FIXTURES} />);
    expect(screen.getByText('Season schedule')).toBeInTheDocument();
  });
  test('EXPECT fixture list to be in document WHEN rendered', () => {
    render(<Fixtures fixtures={FIXTURES} />);
    expect(screen.getAllByText('FT')[0]).toBeInTheDocument();
  });
});
