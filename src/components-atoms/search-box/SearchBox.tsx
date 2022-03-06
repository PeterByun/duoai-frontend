import {
  SearchBarStyleProps,
  SearchBarStyle,
} from '@/components-atoms/search-box/StyledSearchBar.style'

export default function SearchBar(
  props: {
    children: any
    zIndex?: string
  } & SearchBarStyleProps
) {
  return <SearchBarStyle {...props}>{props.children}</SearchBarStyle>
}
