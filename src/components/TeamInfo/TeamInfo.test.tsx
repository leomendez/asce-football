import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamInfo from './TeamInfo';
import { Team, Venue } from '../../types';

const COUNTRY = 'Colombia';
const FOUNDED = 1993;
const ADDRESS = 'address';
const CAPACITY = 100;

const TEAM: Team = {
  id: 1,
  code: 'RM',
  country: COUNTRY,
  founded: FOUNDED,
  logo: 'logo/url',
  name: 'Name',
  national: false,
};

const VENUE: Venue = {
  name: 'some venue',
  id: 1,
  image: 'image/url',
  address: ADDRESS,
  capacity: CAPACITY,
  city: 'city',
  surface: 'grass',
};

describe('TeamInfo', () => {
  test('EXPECT info to be in document WHEN rendered', () => {
    render(<TeamInfo team={TEAM} venue={VENUE} />);
    expect(screen.getByText('Info')).toBeInTheDocument();
  });
  test('EXPECT Country to be in document WHEN rendered', () => {
    render(<TeamInfo team={TEAM} venue={VENUE} />);
    expect(screen.getByText(/Country/)).toBeInTheDocument();
    expect(screen.getByText(COUNTRY)).toBeInTheDocument();
  });
  test('EXPECT Founded to be in document WHEN rendered', () => {
    render(<TeamInfo team={TEAM} venue={VENUE} />);
    expect(screen.getByText(/Founded/)).toBeInTheDocument();
    expect(screen.getByText(FOUNDED)).toBeInTheDocument();
  });
  test('EXPECT Name to be in document WHEN rendered', () => {
    render(<TeamInfo team={TEAM} venue={VENUE} />);
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(VENUE.name)).toBeInTheDocument();
  });
  test('EXPECT Address to be in document WHEN rendered', () => {
    render(<TeamInfo team={TEAM} venue={VENUE} />);
    expect(screen.getByText(/Address/)).toBeInTheDocument();
    expect(screen.getByText(ADDRESS)).toBeInTheDocument();
  });
  test('EXPECT City to be in document WHEN rendered', () => {
    render(<TeamInfo team={TEAM} venue={VENUE} />);
    expect(screen.getByText(/City/)).toBeInTheDocument();
    expect(screen.getByText(VENUE.city)).toBeInTheDocument();
  });
  test('EXPECT Capacity to be in document WHEN rendered', () => {
    render(<TeamInfo team={TEAM} venue={VENUE} />);
    expect(screen.getByText(/Capacity/)).toBeInTheDocument();
    expect(screen.getByText(CAPACITY)).toBeInTheDocument();
  });
});
