import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import Table, {
  GetRowClass,
  TableHeadItem,
} from '../components-atoms/table/Table'

export default {
  title: 'Atoms/Table',
  component: Table,
} as ComponentMeta<typeof Table>

type Subject = {
  rank: number
  name: string
  points: number
}

const initialHeadItems: TableHeadItem<keyof Subject>[] = [
  {
    name: '랭킹',
    key: 'rank',
    sortingEnabled: true,
  },
  {
    name: '이름',
    key: 'name',
  },
  {
    name: '점수',
    key: 'points',
  },
]

const initialRows: Subject[] = [
  {
    rank: 1,
    name: 'Algorithm',
    points: 9686,
  },
  {
    rank: 2,
    name: 'Data Structure',
    points: 8456,
  },
  {
    rank: 3,
    name: 'Design Patterns',
    points: 6576,
  },
  {
    rank: 4,
    name: 'Clean Architecture',
    points: 6453,
  },
  {
    rank: 5,
    name: 'Network',
    points: 6323,
  },
]

const Template: ComponentStory<typeof Table> = (args) => {
  const [headItems, setHeadItems] =
    useState<TableHeadItem<keyof Subject>[]>(initialHeadItems)
  const [rows, setRows] = useState<Subject[]>(initialRows)

  const rowClass: GetRowClass<Subject> = (item) => {
    return item.rank === 1 ? 'emphasized' : ''
  }

  return (
    <>
      <article>
        {Table<Subject>({
          headItems,
          rows,
          rowKeyPropName: 'rank',
          rowClass,
          setRows,
          setHeadItems,
        })}
      </article>
    </>
  )
}

export const Base = Template.bind({})
Base.args = {}
