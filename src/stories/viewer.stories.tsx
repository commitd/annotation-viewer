import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

storiesOf('RoundedButton', module)
  .add(
    'with text',
    () => (
      <button color="hotpink" onClick={action('clicked')}>
        Hello Button
      </button>
    ),
    { info: { inline: true } }
  )
  .add(
    'with some emoji',
    () => (
      <button onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </button>
    ),
    { info: { inline: true } }
  )
