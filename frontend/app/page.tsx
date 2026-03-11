import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'
import type {HomePageData} from '@/app/components/home/types'
import HeroSection from '@/app/components/home/HeroSection'
import InvestSection from '@/app/components/home/InvestSection'
import ReefPartSection from '@/app/components/home/ReefPartSection'
import ProjectsSection from '@/app/components/home/ProjectsSection'
import NewsSection from '@/app/components/home/NewsSection'
import NewsletterSection from '@/app/components/home/NewsletterSection'

export default async function Page() {
  const {data} = await sanityFetch({query: homePageQuery})
  const home = (data ?? null) as HomePageData

  return (
    <div className="page-content page-home">
      <HeroSection data={home} />
      <InvestSection data={home} />
      <ReefPartSection data={home} />
      <ProjectsSection data={home} />
      <NewsSection data={home} />
      <NewsletterSection data={home} />
    </div>
  )
}
