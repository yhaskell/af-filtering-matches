import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppRoot from '../components/app-root';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppRoot />, div);
});
