export type Null = undefined | null

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type Page = {
  name: string
  path: string
  children?: {
    [key: string]: Page
  }
  disabled?: boolean
  invisible?: boolean
}
