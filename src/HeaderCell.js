import React, { useState, useRef } from 'react'
import { css } from '@emotion/core'
import Draggable from 'react-draggable'
import Popover from 'react-tiny-popover'
import Menu from './Menu'
import sharedStyles from './styles'

function HeaderDragHandle ({ onResize }) {
  return (
    <Draggable
      axis='x'
      defaultClassName='drag-handle'
      defaultClassNameDragging='drag-handle-active'
      onStop={(e, data) => onResize(data.x)}
      position={{
        x: 0,
        y: 0,
      }}
      zIndex={999}
    >
      <div css={styles.dragHandle} />
    </Draggable>
  )
}

function HeaderCell ({ column, style, menuData, onResize, columnIndex }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const ref = useRef()

  const onContextMenu = (e) => {
    e.preventDefault()
    setMenuIsOpen(true)
  }

  const cellStyles = [sharedStyles.cell, styles.headerCell]
  if (menuIsOpen) {
    cellStyles.push('background: #eee;')
  }

  return (
    <Popover
      position='bottom'
      containerStyle={{ zIndex: '10' }}
      content={() => (
        <Menu
          data={menuData}
          onRequestClose={() => setMenuIsOpen(false)}
          context={{ columnIndex: columnIndex - 1, ref: ref.current }}
        />
      )}
      isOpen={menuIsOpen}
      onClickOutside={() => setMenuIsOpen(false)}
    >
      <div
        ref={ref}
        onContextMenu={onContextMenu}
        style={style}
        css={cellStyles}
      >
        {column.name}
        <HeaderDragHandle onResize={onResize} />
      </div>
    </Popover>
  )
}

const styles = {
  headerCell: css`
    background: #f9f9f9;
    font-weight: 600;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .drag-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 3px;
      z-index: 2;
      cursor: col-resize;
      color: rgba(0, 0, 0, 0.2);
      :hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .drag-handle-active {
      color: rgba(0, 0, 0, 0.6);
      z-index: 3;
    }
  `,
}

export default HeaderCell
