import * as React from 'react'

import { storiesOf } from '@storybook/react'
import Mark from '../components/Mark'
import { contained } from './decorators'

storiesOf('mark', module)
  .addDecorator(contained)
  .add('default', () => (
    <Mark
      marks={[
        {
          offset: 49,
          length: 10,
          markType: 'org'
        }
      ]}
    >
      Parliament
    </Mark>
  ))
  .add('nested', () => (
    <Mark
      marks={[
        {
          offset: 49,
          length: 10,
          markType: 'dfg'
        }
      ]}
    >
      <Mark
        marks={[
          {
            offset: 49,
            length: 10,
            markType: 'org'
          }
        ]}
      >
        UK{' '}
        <Mark
          marks={[
            {
              offset: 49,
              length: 10,
              markType: 'pol'
            }
          ]}
        >
          Parliament
        </Mark>
      </Mark>
    </Mark>
  ))
