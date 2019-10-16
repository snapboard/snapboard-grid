import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { css } from '@emotion/core'
import TextCell from './cells/TextCell'
import sharedStyles from './styles'

class Cell extends React.Component {
  state = {
    updatedValue: null,
  }

  static getDerivedStateFromProps (props) {
    if (props.isEditing) return null
    return {
      updatedValue: props.value,
    }
  }

  getCellRef = (ref) => {
    this.cellRef = ref
  }

  getInputRef = (ref) => {
    if (!this.input) {
      ref.focus()
      ref.select()
    }
    this.input = ref
  }

  componentDidUpdate (prevProps) {
    if (this.props.isEditing !== prevProps.isEditing) {
      if (!this.props.isEditing) {
        this.input = null
      }
      if (prevProps.isEditing && this.cellRef) {
        this.cellRef.focus()
      }
    }
  }

  onChange = (e) => {
    const value = e.target.value
    this.props.onChange(value, e)
    this.setState({
      updatedValue: value,
    })
  }

  render () {
    const {
      value,
      updatedValue,
      isSelected,
      isEditing,
      onEditDone,
      onClick,
      onChange,
      component,
      ...rest
    } = this.props

    const cellStyles = [sharedStyles.cell, styles.cell]

    if (!isEditing) {
      cellStyles.push(styles.display)
    }

    if (isSelected && !isEditing) {
      cellStyles.push(css`background: #eee;`)
    }

    const CellComponent = component || TextCell

    return (
      <OutsideClickHandler disabled={!isEditing} onOutsideClick={onEditDone}>
        <div
          tabIndex='0'
          ref={this.getCellRef}
          css={cellStyles}
          onClick={onClick}
          {...rest}
        >
          <CellComponent
            innerRef={this.getInputRef}
            isEditing={isEditing}
            onChange={this.onChange}
            value={this.state.updatedValue}
          />
        </div>
      </OutsideClickHandler>
    )
  }
}

const styles = {
  cell: css`
    outline: none;
    background: #fff;
  `,
  display: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
}

export default Cell
