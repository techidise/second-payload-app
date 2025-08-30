/**
 * @fileoverview Home page component that renders the landing page with dynamic blocks
 * @module HomePage
 */

import { getPayload } from 'payload'
import { Page } from '@/payload-types'
// import { headers as getHeaders } from 'next/headers.js'
import config from '@/payload.config'
// import Image from 'next/image'
// import { fileURLToPath } from 'url'

import HeroBlock from './components/HeroBlock'
import ContentBlock from './components/ContentBlock'
import NewsletterBlock from './components/NewsletterBlock'
import MyFormComponent from './components/MyFormComponent'
// import { Button } from '@/components/ui/button'

/**
 * Renders a block based on its type from the page layout
 *
 * @param {Page['layout'][0]} block - The block configuration from the page layout
 * @returns {JSX.Element | null} The rendered block component or null if type not recognized
 */
// const renderBlock = (block: Page['layout'][0]) => {
//   switch (block.blockType) {
//     case 'hero':
//       return <HeroBlock block={block} key={block.id} />
//     case 'content':
//       return <ContentBlock block={block} key={block.id} />
//     case 'newsletter-form':
//       return <NewsletterBlock block={block} key={block.id} />
//     default:
//       return null
//   }
// }

/**
 * HomePage component
 * Fetches and renders the landing page content from Payload CMS
 * Supports multiple block types: hero, content, and newsletter form
 *
 * @component
 * @async
 * @returns {Promise<JSX.Element>} The rendered home page
 */
export default async function HomePage() {
  // const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'landing-page' },
    },
  })

  if (!page) {
    return <div>Page Not Found</div>
  }

  return (
    <div className="home">
      <h1 className="text-6xl text-red-50">TechiDISE: Product Development and Design </h1>
      <h3 className="text-2xl text-red-100">Contact Form</h3>
      <MyFormComponent formId="6858a2df36eb3e52a3979cb9" />

      {/* <h1 className="text-red-600 text-2xl">{page.title}</h1> */}
      {/* <p>{page.layout[0].heading}</p> */}
      {/* <pre>{JSON.stringify(page.layout[0], null, 2)}</pre> */}
      {/* <div className="page">{page.layout?.map((block) => renderBlock(block))}</div> */}
    </div>
  )
}
