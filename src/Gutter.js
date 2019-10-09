import React from 'react'
import { css } from '@emotion/core'
import { Grid } from 'react-virtualized'
import GutterCell from './GutterCell'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import sharedStyles from './styles'

class Gutter extends React.Component {
  renderGutterCell = ({ key, rowIndex, style }) => {
    const { rowCount, showAddRow, gutterOffset, rowMenu, onAddRow } = this.props
    if (showAddRow && rowIndex === rowCount) {
      return (
        <div
          key={key}
          onClick={() => onAddRow && onAddRow(rowCount)}
          css={styles.addRow}
          style={style}>
          +
        </div>
      )
    }

    return (
      <GutterCell
        key={key}
        rowIndex={rowIndex}
        menuData={rowMenu}
        style={style}
        offset={gutterOffset}
      />
    )
  }

  render () {
    const {
      gutterWidth,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      totalHeight,
      rowCount,
      scrollTop,
      showAddRow,
      noHeader,
    } = this.props
    return (
      <div
        css={styles.gutterGridContainer}
        style={{
          position: 'absolute',
          left: 0,
          top: noHeader ? 0 : rowHeight,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Grid
          css={styles.gutterGrid}
          overscanColumnCount={overscanColumnCount}
          overscanRowCount={overscanRowCount}
          cellRenderer={this.renderGutterCell}
          columnWidth={gutterWidth}
          columnCount={1}
          height={totalHeight - (noHeader ? 0 : rowHeight) - scrollbarSize()}
          rowHeight={rowHeight}
          rowCount={showAddRow ? rowCount + 1 : rowCount}
          scrollTop={scrollTop}
          width={gutterWidth}
        />
      </div>
    )
  }
}

const styles = {
  gutterGridContainer: css`
    flex: 0 0 75px;
    z-index: 1;
    outline: none;
  `,
  gutterGrid: css`
    overflow: hidden !important;
    outline: none;
  `,
  addRow: css`
    ${sharedStyles.cell}
    border: 0;
    color: #999;
    font-weight: 600;
    text-align: center;
    :hover {
      background: #f4f4f4;
      cursor: pointer;
    }
  `,
}

export default Gutter
