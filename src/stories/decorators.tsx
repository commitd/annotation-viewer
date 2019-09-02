import * as React from 'react'
import { RenderFunction } from '@storybook/react'
import { CssBaseline, Container } from '@material-ui/core'

export const baselined = (story: RenderFunction) => (
  <>
    <CssBaseline />
    {story()}
  </>
)

export const contained = (story: RenderFunction) => (
  <>
    <CssBaseline />
    <Container style={{ marginTop: 24 }}>{story()}</Container>
  </>
)
