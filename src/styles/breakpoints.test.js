import { describe, expect, it } from 'vitest'
import { BREAKPOINTS, MEDIA_QUERIES } from './breakpoints'

describe('breakpoints', () => {
  it('exposes the responsive values declared in the CSS variables module', () => {
    expect(BREAKPOINTS).toEqual({
      mobile: '393px',
      tablet: '768px',
      desktop: '1024px',
      wideDesktop: '1420px',
    })

    expect(MEDIA_QUERIES).toEqual({
      mobile: '(min-width: 393px)',
      tablet: '(min-width: 768px)',
      desktop: '(min-width: 1024px)',
      wideDesktop: '(min-width: 1420px)',
    })
  })
})
