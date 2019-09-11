import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

// automatically import all files ending in *.stories.tsx
const req = require.context('../src/stories', true, /.stories.tsx$/)

function loadStories() {
  addDecorator(withInfo)
  req.keys().forEach(req)
}

configure(loadStories, module)

addParameters({
  docsContainer: DocsContainer,
  docs: DocsPage
})
