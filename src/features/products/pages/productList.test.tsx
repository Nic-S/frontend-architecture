import React from 'react';
import { render, screen } from '../../../core/testUtils/testing-library-react-wrapper';
import { ProductsList } from './ProductsList';

describe('Product List', () => {
  test('Load Product list', async () => {
    render(<ProductsList />);
    await screen.findByText('Red');
  });
});
