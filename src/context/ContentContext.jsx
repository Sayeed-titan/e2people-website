/**
 * ContentContext
 * Fetches all site content from Supabase on app load.
 * Falls back to the static data.js values if the DB is unreachable.
 * Every component reads from useSiteContent() instead of importing data.js directly.
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import * as staticData from '../constants/data'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)   // null = still loading
  const [error,   setError]   = useState(null)

  const load = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('section, data')

    if (error || !data || data.length === 0) {
      // Fallback: build content object from static data.js
      setContent(buildFallback())
      setError(error)
      return
    }

    const map = {}
    data.forEach(row => { map[row.section] = row.data })
    setContent(map)
  }

  useEffect(() => { load() }, [])

  return (
    <ContentContext.Provider value={{ content, reload: load, error }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useSiteContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useSiteContent must be used inside <ContentProvider>')
  return ctx
}

/** Build a content map that matches DB shape from the static data.js file */
function buildFallback() {
  return {
    brand:     staticData.brand,
    nav:       { navLinks: staticData.navLinks, NAV_OFFSET: staticData.NAV_OFFSET },
    hero:      staticData.hero,
    services:  { items: staticData.services },
    about:     staticData.about,
    solutions: staticData.solutions,
    portfolio: staticData.portfolio,
    team:      { members: staticData.team },
    partners:  { items: staticData.partners },
    blog:      staticData.blog,
    contact:   staticData.contact,
    footer:    staticData.footer,
  }
}
