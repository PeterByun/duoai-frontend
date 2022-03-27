import styled from '@emotion/styled'

export type TableStyleProps = {
  width?: string
  height?: string
}

export const TableStyle = styled.table<TableStyleProps>`
  width: ${({ width }) => (width ? width : '1000px')};

  border-collapse: collapse;
  table-layout: fixed;

  thead {
    background: var(--light-gray);
    color: var(--black);

    width: 100%;

    th:nth-of-type(1) {
      border-radius: 5px 0px 0px 5px;
    }
    th:nth-last-of-type(1) {
      border-radius: 0px 5px 5px 0px;
    }

    tr {
      height: 80px;
    }
  }

  tbody {
    background: var(--white);
    color: var(--black);

    width: 100%;

    tr {
      border-bottom: 1px solid var(--light-gray);
      height: 5rem;
    }

    td {
      text-align: center;
    }
    td:nth-of-type(1) {
      color: var(--blue);
      font-weight: bold;
    }

    .emphasized {
      background: var(--gradient-yellow);
      font-weight: bold;
    }
  }
`
