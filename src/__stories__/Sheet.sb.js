import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Sheet from '../Sheet'

const styles = {
  margin: 30,
  height: 300,
  width: 700,
  position: 'relative',
  border: '1px solid #eee',
}

const State = ({ children, initialState }) => {
  const [data, setData] = useState(initialState)
  return children(data, setData)
}

const columns = [
  { key: 'id', name: 'ID', editable: true, width: 40 },
  { key: 'title', name: 'Title', editable: true },
  { key: 'complete', name: 'Complete', editable: true, width: 300 },
  { key: 'success', name: 'Success', width: 100 },
  { key: 'started', name: 'Started At', width: 100 },
  { key: 'custom', name: 'Custom', component: () => 'Custom!' },
]

const rows = [
  { id: 10, title: 'Task 1', complete: 20, success: true, started: new Date() },
  { id: 20, title: 'Task 2', complete: 40, success: true },
  { id: 30, title: 'Task 3', complete: 60, success: false },
  { id: 40, title: 'Task 4', complete: 20, success: true },
  { id: 50, title: 'Task 5', complete: 40, success: null },
  { id: 60, title: 'Task 6', complete: 20, success: false },
  { id: 70, title: 'Task 7', complete: 40 },
  { id: 80, title: 'Task 8', complete: 60 },
  { id: 90, title: 'Task 9', complete: 20 },
  { id: 100, title: 'Task 10', complete: 20 },
  { id: 110, title: 'Task 11', complete: 20 },
  { id: 120, title: 'Task 12', complete: 20 },
  { id: 130, title: { 'set':[{}, {}] }, complete: 20 },
]

const columnMenu = [{
  text: 'Rename',
  onClick: action('Rename'),
  popover: () => {
    return <div style={{ width: 100, height: 100, background: 'blue' }}>Hello World</div>
  },
}, {
  text: 'Insert Left',
  onClick: action('Insert Left'),
}, {
  text: 'Insert Right',
  onClick: action('Insert Right'),
}, {
  text: 'Delete',
  onClick: action('Delete'),
}]

const rowMenu = [{
  text: 'Insert Above',
  onClick: action('Insert Above'),
}, {
  text: 'Insert Below',
  onClick: action('Insert Below'),
}, {
  text: 'Delete',
  onClick: action('Delete'),
}]

storiesOf('Sheet', module)
  .add('Default', () => (
    <div style={styles}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
      />
    </div>
  ))
  .add('Add Buttons', () => (
    <div style={{ ...styles, width: 200 }}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
        columnMenu={columnMenu}
        rowMenu={rowMenu}
        onAddColumn={action('onAddColumn')}
        onAddRow={action('onAddRow')}
      />
    </div>
  ))
  .add('Read-only', () => (
    <div style={styles}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
        columnMenu={columnMenu}
        rowMenu={rowMenu}
        readOnly
      />
    </div>
  ))

  .add('Column State', () => (
    <State initialState={columns}>
      {(columns, setColumns) => (
        <div style={styles}>
          <Sheet
            columns={columns}
            rowCount={rows.length}
            rowGetter={i => rows[i]}
            gutterOffset={0}
            onColumnResize={(columnIndex, offset) => {
              const update = columns.slice(0)
              const column = columns[columnIndex]
              update[columnIndex] = { ...column, width: Math.max(30, (column.width || 75) + offset) }
              setColumns(update)
            }}
          />
          <button onClick={() => setColumns(columns.slice(1))}>Delete</button>
        </div>
      )}
    </State>
  ))

  .add('Edit', () => (
    <State initialState={rows}>
      {(rows, setRows) => (
        <div style={styles}>
          <Sheet
            columns={columns}
            rowCount={rows.length}
            rowGetter={i => rows[i]}
            gutterOffset={0}
            onRowsChange={({ fromRow, toRow, updated }) => {
              const updatedRows = []
              for (let index = 0; index < rows.length; index++) {
                const row = rows[index]
                updatedRows[index] = index >= fromRow && index <= toRow ? { ...row, ...updated } : row
              }
              setRows(updatedRows)
            }}
          />
        </div>
      )}
    </State>
  ))

  .add('No headings', () => (
    <State initialState={rows}>
      {(rows, setRows) => (
        <div style={styles}>
          <Sheet
            noHeader
            columns={columns}
            rowCount={rows.length}
            rowGetter={i => rows[i]}
            gutterOffset={0}
          />
        </div>
      )}
    </State>
  ))
