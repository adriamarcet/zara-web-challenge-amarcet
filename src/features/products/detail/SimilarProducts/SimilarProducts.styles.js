import styled, { keyframes } from 'styled-components'
import { MEDIA_QUERIES } from '../../../../shared/styles/breakpoints'

const moveScrollbarThumb = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(100cqi - 100%));
  }
`

const SimilarProductsSection = styled.section`
  min-width: 0;
  padding-block: var(--size-2xl);

  @media ${MEDIA_QUERIES.tablet} {
    margin-inline-end: -16px;

    @supports (width: 1cqi) {
      margin-inline-end: min(
        -16px,
        calc((var(--container-max-width) - 100cqi) / 2 - 16px)
      );
    }
  }

  @media ${MEDIA_QUERIES.desktop} {
    margin-inline-start: max(0px, calc((100% - 1200px) / 2));
  }
`

const SimilarProductsScroller = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline-start: 0;
  -webkit-overflow-scrolling: touch;

  scrollbar-color: var(--color-gray-90) var(--color-gray-20);
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 1px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-gray-20);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-90);
  }

  @supports (scroll-timeline: --similar-items-scroll inline) and
    (animation-timeline: --similar-items-scroll) and (width: 1cqi) {
    scrollbar-width: none;
    scroll-timeline: --similar-items-scroll inline;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const SimilarProductsTrack = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(85vw, 344px);
  width: max-content;

  margin: 0;
  padding: 0 0 var(--size-2xl);
  list-style: none;

  > li {
    aspect-ratio: 1;
    border-block: 1px solid var(--color-gray-90);
    border-inline-start: 1px solid var(--color-gray-90);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  > li:last-child {
    border-inline-end: 1px solid var(--color-gray-90);
  }
`

const SimilarProductsScrollbar = styled.div`
  display: none;

  @supports (scroll-timeline: --similar-items-scroll inline) and
    (animation-timeline: --similar-items-scroll) and (width: 1cqi) {
    background-color: var(--color-gray-20);
    container-type: inline-size;
    display: flex;
    height: 1px;
    inset-inline-start: 0;
    overflow: hidden;
    position: sticky;
    width: 100%;
  }
`

const SimilarProductsScrollbarSegment = styled.span`
  flex: 1 1 0;
  min-width: 0;

  &:first-child {
    animation-duration: 1ms;
    animation-fill-mode: both;
    animation-name: ${moveScrollbarThumb};
    animation-timeline: --similar-items-scroll;
    animation-timing-function: linear;
    background-color: var(--color-gray-90);
  }
`

export {
  SimilarProductsScroller,
  SimilarProductsScrollbar,
  SimilarProductsScrollbarSegment,
  SimilarProductsSection,
  SimilarProductsTrack,
}
