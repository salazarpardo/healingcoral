import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import {dataAttr} from '@/sanity/lib/utils'
import type {PageBuilderSection} from '@/sanity/lib/types'

type TeamMember = {
  _id: string
  firstName?: string
  lastName?: string
  role?: string
  bio?: string
  picture?: {asset?: {_ref: string}; alt?: string}
}

type TeamSectionBlock = PageBuilderSection & {
  _type: 'teamSection'
  title?: string
  people?: TeamMember[]
}

type Props = {
  block: TeamSectionBlock
  index: number
  pageId: string
  pageType: string
}

export default function TeamSection({block, pageId, pageType}: Props) {
  const title = block.title ?? 'Our team'
  const people = block.people ?? []

  if (!people.length) return null

  return (
    <section
      className="bg-white py-16 md:py-24"
      data-sanity={dataAttr({
        id: pageId,
        type: pageType,
        path: `pageBuilder[_key=="${block._key}"]`,
      }).toString()}
    >
      <div className="container px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {people.map((person) => {
            const name = [person.firstName, person.lastName].filter(Boolean).join(' ')
            return (
              <article key={person._id} className="flex flex-col items-start">
                {person.picture?.asset && (
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 flex-shrink-0 grayscale">
                    <Image
                      src={urlForImage(person.picture).width(320).height(320).fit('crop').url()}
                      alt={(person.picture as {alt?: string}).alt || name}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-bold text-navy">{name}</h3>
                {person.role && (
                  <p className="text-sm font-medium mt-1 uppercase tracking-wide text-teal">{person.role}</p>
                )}
                {person.bio && (
                  <p className="text-navy/80 text-sm mt-3 max-w-sm">{person.bio}</p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
