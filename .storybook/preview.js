import React from 'react'
import { GlobalStyle } from '@/components-commons/app/GlobalStyle'
import { Global } from '@emotion/react'

export const decorators = [
  (Story) => (
    <div>
      <Global styles={GlobalStyle} />
      <Story />
    </div>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
