// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
/**
 * Import setupTests for your unit tests and you can use `render`, `renderLight` and `renderDark` to render elements wrapped in a ThemeProvider.
 * To render without a theme provider use `renderPlain`.
 *
 * N.B. This adds a simple custom id generator so ids match between snapshots.
 *
 */
import userEvent from '@testing-library/user-event'

// re-export everything
export * from '@testing-library/react'

export { userEvent }
