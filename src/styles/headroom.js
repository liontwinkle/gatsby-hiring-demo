import { css } from 'styled-components'
import theme from '../../config/theme'

const headroom = css`
  .headroom-wrapper {
    position: fixed;
    width: 100%;
    z-index: 2000;
  }
  .headroom {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    padding: 1rem 1.5rem;
    svg {
      height: 2.5rem;
      fill: ${theme.colors.white.base};
    }
  }
  .headroom--unfixed {
    position: relative;
    transform: translateY(0);
    transition: ${theme.transitions.headroom.transition};
  }
  .headroom--scrolled {
    transition: ${theme.transitions.headroom.transition};
  }
  .headroom--unpinned {
    position: fixed;
    transform: translateY(-100%);
    transition: ${theme.transitions.headroom.transition};
  }
  .headroom--pinned {
    position: fixed;
    transform: translateY(0);
    transition: ${theme.transitions.headroom.transition};
    background-color: #1b1f23;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    nav {
      a {
        color: ${props => props.theme.colors.white.base};
        &:hover {
          border-color: ${theme.colors.black.base};
          color: ${theme.colors.black.base};
        }
        &:focus {
          color: ${theme.colors.black.base};
        }
      }
    }
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    svg {
      height: 2.5rem;
      fill: ${props => props.theme.colors.white.base};
    }
    span {
      color: ${props => props.theme.colors.white.base};
    }
  }
`

export default headroom
