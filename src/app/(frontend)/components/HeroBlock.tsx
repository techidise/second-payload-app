import { Page } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // height: '100vh',
        // width: '100vw',
      }}
    >
      {typeof block?.image === 'object' && block.image.url && (
        <Image src={block.image?.url} alt={block.image?.alt} width={2048} height={1365} priority />
      )}
      <h1 className="text-9xl">{block.heading}</h1>
      <RichText data={block.subheading} />
      {/* <div dangerouslySetInnerHTML={{ __html: block.subheading }} /> */}
      <Link className="bg-amber-700 rounded-xl hover:bg-amber-500" href={block.cta_button.url}>
        {block.cta_button.label}
      </Link>
    </div>
  )
}
