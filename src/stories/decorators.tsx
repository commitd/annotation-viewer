import * as React from 'react'
import { RenderFunction } from '@storybook/react'
import { Container } from '@commitd/components'
import { ThemeProvider } from '@commitd/components'

export const baselined = (story: RenderFunction) => (
  <ThemeProvider>{story()}</ThemeProvider>
)

export const contained = (story: RenderFunction) => (
  <ThemeProvider>
    <Container style={{ marginTop: 24 }} maxWidth="lg">
      {story()}
    </Container>
  </ThemeProvider>
)
