import {
  BackToCatalogNav,
  BackToCatalogNavLink,
} from './BackToCatalogLink.styles'

const BackToCatalogLink = () => (
  <BackToCatalogNav aria-label="Go back to see the list of products.">
    <BackToCatalogNavLink to="/" className="flex-inline">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8233 5.64645L12.5304 6.35356L8.88394 10L12.5304 13.6465L11.8233 14.3536L7.46973 10L11.8233 5.64645Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-s text-uppercase">Back</span>
    </BackToCatalogNavLink>
  </BackToCatalogNav>
)

export default BackToCatalogLink
