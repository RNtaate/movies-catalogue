import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRedux from '../../CustomRender/RenderWithRedux';

import App from '../../../container/pages/App';

test('Should render correctly', () => {
  const comp = renderWithRedux(<App />);
  const el = comp.getByTestId('main-heading');
  expect(el.textContent).toMatch(/NORP MOVIES/i);
});
