import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import type {HomePageData} from './types'

export default function ProjectsSection({data}: {data: HomePageData}) {
  if (!data?.projects?.length) return null

  return (
    <section className="bg-section py-16 md:py-20">
      <div className="container px-4 sm:px-6">
        {data.projectsTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12">{data.projectsTitle}</h2>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {data.projects.map((project) => (
            <Link
              key={project._id}
              href={project.slug ? `/projects/${project.slug}` : '#'}
              className="group overflow-hidden flex flex-col"
            >
              {project.image?.asset && (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={urlForImage(project.image).width(600).height(450).fit('crop').url()}
                    alt={project.title || ''}
                    fill
                    sizes="(max-width: 600px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-teal-dark transition-colors">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-navy/80 text-sm flex-1 line-clamp-3 mb-4">
                    {project.description}
                  </p>
                )}
                <span className="text-navy font-bold text-sm inline-flex items-center gap-1">
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
