import React from 'react'
import { Route} from 'react-router-dom';

import FetchData from './Fetch'

const Routing = () => (
  <main>
      <Route exact path='/' component={FetchData}/>
  </main>
)

export default Routing