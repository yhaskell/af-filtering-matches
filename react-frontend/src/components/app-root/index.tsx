import * as React from 'react'
import AppBar from 'material-ui/AppBar'

import PeopleList from '../people-list'
import FilterDialog from '../filter-dialog'
import ErrorMessage from '../error-message'

import CitiesMenu from '../cities-menu'

export default () => (
  <div>
    <AppBar 
      title="Filtering people"
      iconElementLeft={<CitiesMenu />}
    />
    <div className="container">
      <PeopleList />
      <FilterDialog />
      <ErrorMessage />
    </div>
  </div>
)