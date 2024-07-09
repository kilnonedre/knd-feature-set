'use client'

import React, { useState } from 'react'
import type types from './checkboxType.d'
import styles from './checkboxStyle.module.scss'

const Checkbox = (prop: types.ConfigProp) => {
  const [isCheck, setIsCheck] = useState(false)

  const styleList = [
    {
      '--checkbox-display': 'none',
      '--checkbox-background-color': '#ffffff',
      '--checkbox-border-color': prop.color,
    },
    {
      '--checkbox-display': 'block',
      '--checkbox-background-color': prop.color,
      '--checkbox-border-color': prop.color,
    },
  ]

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked)
    prop.onChange && prop.onChange(e.target.checked)
  }

  return (
    <div className={styles['checkbox']}>
      <label className={styles['checkbox-panel']}>
        <input
          className={styles['checkbox__input']}
          type="checkbox"
          checked={isCheck}
          onChange={change}
        />
        <div
          className={styles['checkbox__fake']}
          style={styleList[Number(isCheck)] as React.CSSProperties}
        ></div>
        <p>{prop.text}</p>
      </label>
    </div>
  )
}

export default Checkbox
