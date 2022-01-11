import React from 'react'

import {
  SearchBarStyleProps,
  SearchBarStyle,
} from '@/components/searchBox/StyledSearchBar.style'

export default function SearchBar(
  props: SearchBarStyleProps & { children: any }
) {
  return <SearchBarStyle {...props}>{props.children}</SearchBarStyle>
}
