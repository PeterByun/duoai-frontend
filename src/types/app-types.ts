export type Null = undefined | null

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type Page = {
  name: string
  path: string
  disabled?: boolean
  invisible?: boolean
  index?: boolean
  children?: {
    [key: string]: Page
  }
}

export type PageLeaf = Exclude<Page, 'children'>

export type PageTree = {
  [key: string]: Page
}
