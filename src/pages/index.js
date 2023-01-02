import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ScrollArea from "../components/ScrollArea"

const IndexPage = () => (
  <Layout>
    <div className="relative grid grid-cols-2 gap-8">
      
      <ScrollArea />
      <div className="h-screen bg-gray-100 flex items-center sticky top-0">
        <h1>fostan.xyz</h1>
      </div>
    </div>
    <div className="h-screen bg-green-800"></div>

  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
