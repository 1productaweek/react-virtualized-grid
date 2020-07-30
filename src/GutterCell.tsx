import React, { useState, useRef } from 'react'
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import Popover from 'react-tiny-popover'
import Menu from './Menu'
import sharedStyles from './styles'
import { MenuItem } from './types'

export interface GutterCellProps {
  rowIndex: number
  menuData: MenuItem[]
  offset?: number
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function GutterCell ({ rowIndex, menuData, offset = 1, style, onClick }: GutterCellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()
  const ref = useRef<any>()

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const cellStyles = [sharedStyles.cell(theme), styles.gutterCell(theme, isOpen)]

  return (
    <Popover
      position='right'
      containerStyle={{ zIndex: '10' }}
      content={() => (
        <Menu
          data={menuData}
          onRequestClose={() => setIsOpen(false)}
          context={{ rowIndex, ref: ref.current }}
        />
      )}
      isOpen={isOpen}
      onClickOutside={() => setIsOpen(false)}
    >
      <div
        ref={ref}
        onContextMenu={onContextMenu}
        css={cellStyles}
        style={style}
        onClick={onClick}
      >
        {rowIndex + offset}
      </div>
    </Popover>
  )
}

const styles = {
  gutterCell: (theme: any, isOpen: boolean) => css`
    text-align: center;
    color: ${theme?.colors?.base60 || '#858D94'};
    font-size: 0.95em;
    background-color: ${isOpen ? theme?.colors?.base10 || '#eee' : theme?.colors?.base0 || '#fff'};
  `,
}
export default GutterCell