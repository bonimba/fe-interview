import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { data } from './mockData';

test('renders app', async () => {
  // @ts-expect-error
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(data) }));

  render(<App />);
  
  expect(screen.getAllByRole('tab').map(tab => tab.textContent)).toStrictEqual(['Bills', 'Potential bills']);

  // bills panel
  const billsPanel = screen.getByRole('tabpanel');
  const billItems = await within(billsPanel).findAllByRole('listitem');
  expect(billItems).toHaveLength(6);

  const firstBillItem = billItems[0];
  expect(firstBillItem.textContent).toContain('Sky TV');
  expect(firstBillItem.textContent).toContain('Available transactions: 5');

  // potential bills panel

  userEvent.click(screen.getByRole('button', { name: /potential bills/i }));
  const potentialBillsPanel = screen.getByRole('tabpanel');
  const optionalItems = await within(potentialBillsPanel).findAllByRole('listitem');
  expect(optionalItems).toHaveLength(3);
});
