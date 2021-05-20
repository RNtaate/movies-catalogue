import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../../reducers/index';

export const renderWithRedux = (
  ui, 
  {initialState, ...renderOptions} = {}
) => {
  const store = createStore(allReducers, initialState);
  const Wrapper = ({children}) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}