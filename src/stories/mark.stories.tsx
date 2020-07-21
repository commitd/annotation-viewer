import React from 'react'
import { Mark } from '../components/Mark'
import { contained } from './decorators'
import { defaultMarkColors } from '../util/colorPalette'

export default {
  title: 'Mark',
  decorators: [contained]
}

export const Default = () => (
  <Mark
    marks={[
      {
        offset: 49,
        length: 10,
        markType: 'org'
      }
    ]}
    typeColors={{
      org: 'blue'
    }}
  >
    Parliament
  </Mark>
)

export const ContrastText = () => (
  <Mark
    marks={[
      {
        offset: 49,
        length: 10,
        markType: 'org'
      }
    ]}
    typeColors={{
      org: 'blue'
    }}
    lightTextColor="#ddd"
    darkTextColor="#111"
  >
    Parliament
  </Mark>
)
const nestedColors = {
  dfg: `#${defaultMarkColors[0]}`,
  org: `#${defaultMarkColors[1]}`,
  pol: `#${defaultMarkColors[2]}`
}

export const nested = () => (
  <Mark
    marks={[
      {
        offset: 49,
        length: 10,
        markType: 'dfg'
      }
    ]}
    typeColors={nestedColors}
  >
    <Mark
      marks={[
        {
          offset: 49,
          length: 10,
          markType: 'org'
        }
      ]}
      typeColors={nestedColors}
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
        typeColors={nestedColors}
      >
        Parliament
      </Mark>
    </Mark>
  </Mark>
)

export const NotIncluded = () => (
  <Mark
    marks={[
      {
        offset: 0,
        length: 3,
        markType: 'org'
      }
    ]}
    included={false}
    typeColors={nestedColors}
    hideType={true}
  >
    ORG
  </Mark>
)
