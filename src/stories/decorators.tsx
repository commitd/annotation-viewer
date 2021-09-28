import React from 'react'

export const contained = (story: any) => (
  <div css={{ margin: '0 auto', marginTop: 24, maxWidth: 1000 }}>{story()}</div>
)
