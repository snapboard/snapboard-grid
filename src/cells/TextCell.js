import React from 'react'
import { css } from '@emotion/core'
import isObject from 'lodash/isObject'

function TextCell ({ innerRef, isEditing, onChange, value }) {
  const cellInnerEl = isEditing ? (
    <input
      value={value}
      onChange={onChange}
      ref={innerRef}
      css={styles.input}
    />
  ) : getValue(value)
  return cellInnerEl
}

function getValue (value) {
  if (isObject(value)) return JSON.stringify(value)
  if (value && value.toString) return value.toString()
  if (value === null) return 'null'
  if (value === undefined) return ''
  return value
}

const styles = {
  input: css`
    font-size: 100%;
    outline: none;
    width: 100%;
    height: 100%;
    border: 0;
    box-shadow: none;
    background: #fff;
    border-radius: 0;
  `,
}

export default TextCell
