import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddItem from '../AddItem';
import { Cuisines, Diets, Difficulties } from '../../types';
import { MemoryRouter } from 'react-router-dom';

// Mock data
const cuisines: Cuisines[] = [
  { id: '1', name: 'Italian' },
  { id: '2', name: 'American' },
  { id: '3', name: 'Mexican' },
  { id: '4', name: 'Indian' },
  { id: '5', name: 'Japanese' },
  { id: '6', name: 'Spanish' },
  { id: '7', name: 'French' },
  { id: '8', name: 'Greek' },
  { id: '9', name: 'Thai' },
  { id: '10', name: 'British' },
  { id: '11', name: 'Russian' },
  { id: '12', name: 'Middle Eastern' },
  { id: '13', name: 'North African' },
  { id: '14', name: 'Korean' }
];

const diets: Diets[] = [
  { id: '1', name: 'Vegetarian' },
  { id: '2', name: 'Mediterranean' },
  { id: '3', name: 'Non-Vegetarian' },
  { id: '4', name: 'Pescatarian' }
];

const difficulties: Difficulties[] = [
  { id: '1', name: 'Easy' },
  { id: '2', name: 'Medium' },
  { id: '3', name: 'Hard' }
];

// Mock fetch responses
global.fetch = jest.fn((url) => {
  switch (url) {
    case 'http://localhost:8080/cuisines':
      return Promise.resolve({
        json: () => Promise.resolve(cuisines),
      });
    case 'http://localhost:8080/diets':
      return Promise.resolve({
        json: () => Promise.resolve(diets),
      });
    case 'http://localhost:8080/difficulties':
      return Promise.resolve({
        json: () => Promise.resolve(difficulties),
      });
    case 'http://localhost:8080/recipes':
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    default:
      return Promise.reject(new Error('not found'));
  }
}) as jest.Mock;

describe('AddItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form correctly', async () => {
    render(
      <MemoryRouter>
        <AddItem />
      </MemoryRouter>
    );

    // Wait for the API data to be loaded
    await waitFor(() => {
      expect(screen.getByLabelText(/Recipe Name/i)).toBeInTheDocument();
    });

    // Check if form elements are present
    expect(screen.getByLabelText(/Recipe Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ingredients/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instructions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cuisine Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dietary Preference/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Difficulty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Recipe/i })).toBeInTheDocument();
  });
});
