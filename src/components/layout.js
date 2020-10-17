import React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <>
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
            </>
    )
  } else {
    header = (
      <>
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      </>
    )
  }

  return (
    <ThemeToggler>
        {({ theme, toggleTheme }) => (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
                <label
                style={{float:'right'}}>
            <input
              type="checkbox"
              onChange={e => {toggleTheme(e.target.checked ? 'dark' : 'light');}}
              checked={theme === 'dark'}
            />{' '}
            Dark mode
          </label>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>)}
          </ThemeToggler>
  )
}

export default Layout
