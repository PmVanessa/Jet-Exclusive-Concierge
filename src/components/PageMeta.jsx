import { useEffect } from 'react'

/**
 * PageMeta — sets <title> and all SEO / OG / Twitter meta tags
 * for the current page via direct DOM manipulation.
 */
export default function PageMeta({ title, description, ogImage = '/og-image.png' }) {
  useEffect(() => {
    // ── <title> ──
    document.title = title

    // Creates the tag if missing, then sets its content
    const set = (attrKey, attrVal, content) => {
      let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attrKey, attrVal)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Standard
    set('name',     'description',        description)

    // Open Graph
    set('property', 'og:title',           title)
    set('property', 'og:description',     description)
    set('property', 'og:image',           ogImage)
    set('property', 'og:type',            'website')

    // Twitter
    set('name',     'twitter:card',        'summary_large_image')
    set('name',     'twitter:title',       title)
    set('name',     'twitter:description', description)
    set('name',     'twitter:image',       ogImage)
  }, [title, description, ogImage])

  return null
}
