import classNames from 'classnames'
import React from 'react'
import type types from './arrowType.d'
import styles from './arrowStyle.module.scss'

const Arrow = ({ isCollapse, handleClick }: types.ConfigProp) => {
  return (
    <div
      className={classNames(
        styles['arrow'],
        {
          [styles['arrow--collapse']]: isCollapse,
        },
        {
          [styles['arrow--expand']]: !isCollapse,
        }
      )}
      onClick={() => handleClick(!isCollapse)}
    >
      <div className={styles['arrow-main']}>
        <div className={styles['arrow-main-top']}></div>
        <div className={styles['arrow-main-bottom']}></div>
      </div>
    </div>
  )
}

export default Arrow
