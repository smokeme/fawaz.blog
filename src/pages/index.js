import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allPosts = data.allMarkdownRemark.nodes
  const trainings = allPosts.filter(post => post.fields.slug.includes('/trainings/'))
  const posts = allPosts.filter(post => !post.fields.slug.includes('/trainings/'))

  if (posts.length === 0 && trainings.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <section className="section-divider">
        <h2 className="section-title">Latest Posts</h2>
      </section>
      <ol className="post-list">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const tags = post.frontmatter.tags || []

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      {trainings.length > 0 && (
        <>
          <section className="section-divider">
            <h2 className="section-title">Training</h2>
          </section>
          <div className="training-card">
            {trainings.map(training => {
              const title = training.frontmatter.title || training.fields.slug
              return (
                <Link to={training.fields.slug} key={training.fields.slug} className="training-link">
                  <span className="training-icon">&#x1F393;</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{training.frontmatter.description}</p>
                  </div>
                  <span className="training-arrow">&rarr;</span>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
