import {person} from './documents/person'
import {collection} from './documents/collection'
import {page} from './documents/page'
import {post} from './documents/post'
import {project} from './documents/project'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {homePage} from './singletons/homePage'
import {collectionsPage} from './singletons/collectionsPage'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {navItem} from './objects/navItem'
import {footerColumn} from './objects/footerColumn'
import {socialLink} from './objects/socialLink'
import {reefPartCard} from './objects/reefPartCard'
import {teamSection} from './objects/teamSection'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  collectionsPage,
  // Documents
  page,
  post,
  person,
  project,
  collection,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  navItem,
  footerColumn,
  socialLink,
  reefPartCard,
  teamSection,
]
