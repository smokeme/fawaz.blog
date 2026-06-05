import React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <div className="top-bar">
            <button
              className="theme-toggle"
              onClick={() => {
                toggleTheme(theme === "dark" ? "light" : "dark")
              }}
              aria-label="Toggle dark mode"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "\u2600" : "\u263E"}
            </button>
          </div>
          <header className="global-header">{header}</header>
          <main>{children}</main>
          <footer>
            &copy; {new Date().getFullYear()} Fawaz &mdash; Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
      )}
    </ThemeToggler>
  )
}

export default Layout
