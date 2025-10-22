import { Page } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <div className="flex flex-col justify-center items-center">
      {typeof block?.image === 'object' && block.image.url && (
        <Image
          src={block.image?.url}
          alt={block.image?.alt}
          width={2048}
          height={1365}
          priority
          className="min-h-screen min-w-screen"
        />
      )}
      <h1 className="text-9xl">{block.heading}</h1>
      <RichText data={block.subheading} />
      {/* <div dangerouslySetInnerHTML={{ __html: block.subheading }} /> */}
      <Link
        className="bg-amber-700 w-xl h-7 rounded-xl hover:bg-amber-500 text-center"
        href={block.cta_button.url}
      >
        {block.cta_button.label}
      </Link>
    </div>
  )
}
