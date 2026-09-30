import variables from './variables.module.css'

const BREAKPOINTS = Object.freeze({
  mobile: variables.breakpointMobile,
  tablet: variables.breakpointTablet,
  desktop: variables.breakpointDesktop,
  wideDesktop: variables.breakpointWideDesktop,
})

const MEDIA_QUERIES = Object.freeze({
  mobile: `(min-width: ${BREAKPOINTS.mobile})`,
  tablet: `(min-width: ${BREAKPOINTS.tablet})`,
  desktop: `(min-width: ${BREAKPOINTS.desktop})`,
  wideDesktop: `(min-width: ${BREAKPOINTS.wideDesktop})`,
})

export { BREAKPOINTS, MEDIA_QUERIES }
