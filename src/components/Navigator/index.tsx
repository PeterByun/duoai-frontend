import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import {
  NavContainerStyle,
  LinkWrapperStyle,
  LinkStyle,
} from './StyledNavigator.style'

import { Anchor } from '@/components/Anchor'

import { Page } from '@/types/app-types'

import LogoImgSrc from '@/assets/images/logo_horizontal.svg'
import { Img } from '@/components/Img'

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

  return (
    <NavContainerStyle depth={props.depth}>
      {props.nested ? (
        <div></div>
      ) : (
        <Img
          src={LogoImgSrc}
          width="6rem"
          margin="0 0 0 3rem"
          cursor="pointer"
          onClick={onLogoClick}
        />
      )}

      <LinkWrapperStyle>
        {props.pages
          .filter((page) => !page.invisible)
          .map((page) => (
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
                {page.name}
              </NavLink>
            </LinkStyle>
          ))}
      </LinkWrapperStyle>

      {props.nested ? (
        <div></div>
      ) : (
        <Anchor color="disabled" margin="0 3rem" cursor="not-allowed">
          로그인 <br />⚒
        </Anchor>
      )}
    </NavContainerStyle>
  )
}

export default NavigationBar
