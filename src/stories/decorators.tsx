import React from 'react'
import { Container } from '@material-ui/core'

export const contained = (story: any) => (
  <Container style={{ marginTop: 24 }} maxWidth="lg">
    {story()}
  </Container>
)
