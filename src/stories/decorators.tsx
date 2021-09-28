import React from 'react'
import { Container } from '@mui/material'

export const contained = (story: any) => (
  <Container style={{ marginTop: 24 }} maxWidth="lg">
    {story()}
  </Container>
)
