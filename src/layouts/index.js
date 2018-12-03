import React from 'react'
import { ContextProviderComponent } from './GlobalPlayerContext'

export default ({ children }) => (
  <ContextProviderComponent>{children}</ContextProviderComponent>
)
