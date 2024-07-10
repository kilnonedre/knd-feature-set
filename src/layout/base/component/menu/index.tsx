'use client'

import { Avatar } from '@nextui-org/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import IconFont from '@/component/iconFont'
import Arrow from './component/arrow'
import styles from './menuStyle.module.scss'

const Menu = () => {
  const navList = [
    { id: 1, icon: '' },
    { id: 2, icon: '' },
    { id: 3, icon: '' },
  ]

  const [isCollapse, setIsCollapse] = useState(false)
  return (
    <div
      className={classNames(
        styles['menu'],
        {
          [styles['menu--collapse']]: isCollapse,
        },
        {
          [styles['menu--expand']]: !isCollapse,
        }
      )}
    >
      <div className={styles['menu-placeholder']}>
        <IconFont icon="" size="32px" />
      </div>
      <div className={styles['menu-divide']}></div>
      <div className={styles['menu-function']}>
        {navList.map(nav => {
          return (
            <div className={styles['menu-placeholder']} key={nav.id}>
              <IconFont icon="" size="24px" />
            </div>
          )
        })}
      </div>
      <div className={styles['menu-divide']}></div>
      <Avatar
        isBordered
        className={styles['menu-avatar']}
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <div className={styles['menu-placeholder']}>
        <IconFont icon="" size="24px" />
      </div>
      <Arrow
        isCollapse={isCollapse}
        handleClick={(status: boolean) => {
          setIsCollapse(status)
        }}
      />
    </div>
  )
}

export default Menu
