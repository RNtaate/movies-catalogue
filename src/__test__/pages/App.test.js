import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import {renderWithRedux} from '../CustomRender/RenderWithRedux';

import App from '../../pages/App';

test('Should render correctly', () => {
  let comp = renderWithRedux(<App/>);
  let el = comp.getByTestId("main-heading");
  expect(el.textContent).toMatch(/NORP MOVIES/i)
})