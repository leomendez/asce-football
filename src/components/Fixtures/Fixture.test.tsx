import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Fixture from './Fixture';
import { fixtures } from '../../__mocks__/data/fixtures';

const FIXTURE = fixtures[0];

describe('InfoItem', () => {
  test('EXPECT fixture to be in document WHEN rendered', () => {
    render(<Fixture fixture={FIXTURE} />);
    expect(screen.getByText('Fixture')).toBeInTheDocument();
  });
});
