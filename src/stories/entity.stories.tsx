import * as React from 'react'

import { storiesOf } from '@storybook/react'
import Entity from '../components/Entity'

storiesOf('entity', module).add('default', () => (
  <Entity
    annotation={{
      offset: 49,
      length: 10,
      label: 'HM Parliament',
      annotationType: 'entity',
      entityType: 'org'
    }}
  >
    Parliament
  </Entity>
))
