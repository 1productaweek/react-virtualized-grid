import React from 'react'
import { css } from '@emotion/core'
import isString from 'lodash/isString'
import { MenuItem } from './types'

export interface MenuProps {
  data: MenuItem[]
  context: any
  onRequestClose: () => void
}

function Menu ({ data, context, onRequestClose }: MenuProps) {
  const menuItemsEl = data.map(({ text, onClick }, i) => {
    return (
      <div
        key={isString(text) ? text : i}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (onClick) onClick(context, e)
          onRequestClose()
        }}
        css={styles.menuItem}
      >
        {text}
      </div>
    )
  })

  return (
    <div css={styles.menu}>
      {menuItemsEl}
    </div>
  )
}

const styles = {
  menu: css`
    font-size: 0.85em;
    background: #3d3d3d;
    border: 0px;
    min-width: 160px;
    border-radius: 3px;
    overflow: hidden;
    color: #eaeaea;
  `,
  menuItem: css`
    padding: 0.5em 1em;
    // border-bottom: 1px solid #545454;
    cursor: pointer;
    :hover {
      background: #545454; 
    }
  `,
}

export default Menu
