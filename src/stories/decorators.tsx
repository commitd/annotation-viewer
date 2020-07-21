import React from 'react'
import { Container } from '@committed/components'

export const contained = (story: any) => (
  <Container style={{ marginTop: 24 }} maxWidth="lg">
    {story()}
  </Container>
)
