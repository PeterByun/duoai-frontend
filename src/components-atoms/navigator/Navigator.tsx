import { NavLink, useNavigate } from 'react-router-dom'

import { NavContainerStyle, LinkStyle } from './StyledNavigator.style'

import { Anchor } from '@/components-atoms/anchor/Anchor'

import { Page } from '@/types/app-types'

import LogoImgSrc from '@/assets/images/logo_horizontal.svg'
import { Img } from '@/components-atoms/img/Img'
import { css } from '@emotion/react'

type NavigationBarProps = {
  pages: Page[]
  nested: boolean
  depth: number
}

const NavigationBar = (props: NavigationBarProps) => {
  const navigate = useNavigate()

  const onLogoClick = () => {
    navigate('/')
  }

  const visiblePages = props.pages.filter(
    (page) => !page.invisible && !page.index
  )

  return (
    <>
      {visiblePages.length > 0 ? (
        <NavContainerStyle depth={props.depth}>
          <div>
            <Img
              image={{
                src: LogoImgSrc,
              }}
              width="6rem"
              onClick={onLogoClick}
              isNameHidden
              imgCss={css`
                margin: 0 0 0 1rem;
              `}
            />
          </div>

          <div>
            {visiblePages.map((page) => (
              <LinkStyle disabled={page.disabled} key={page.name}>
                <NavLink
                  to={page.path}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          borderBottom: '2px solid var(--black)',
                        }
                      : {}
                  }
                >
                  {page.name} {page.disabled ? '⚒' : null}
                </NavLink>
              </LinkStyle>
            ))}
          </div>

          <div></div>
        </NavContainerStyle>
      ) : null}
    </>
  )
}

export default NavigationBar
