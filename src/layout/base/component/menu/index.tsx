'use client'

import { Avatar } from '@nextui-org/react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { type CSSProperties, useEffect, useRef, useState } from 'react'
import AvatarPng from '@/asset/image/avatar/avatar.png'
import IconFont from '@/component/iconFont'
import { notYetDeveloped } from '@/util/frontend'
import Arrow from './component/arrow'
import styles from './menuStyle.module.scss'

const Menu = () => {
  const appList = [
    { id: 1, icon: '', path: '/key_bag' },
    { id: 2, icon: '' },
    { id: 3, icon: '' },
  ]

  const router = useRouter()

  const [isCollapse, setIsCollapse] = useState(true)

  const [isFullScreen, setIsFullScreen] = useState(false)

  const [menuSize, setMenuSize] = useState({ width: 0, height: 0 })

  const menuRef = useRef<HTMLDivElement>(null)

  const toUrl = (path?: string) => {
    if (!path) {
      notYetDeveloped()
      return
    }
    router.push(path)
    setIsCollapse(true)
  }

  useEffect(() => {
    const { offsetHeight: height, offsetWidth: width } = menuRef.current!
    setMenuSize({ width, height })
  }, [])

  return (
    <div
      ref={menuRef}
      className={classNames(styles['menu'], {
        [styles['menu--collapse']]: isCollapse,
        [styles['menu--expand']]: !isCollapse,
        [styles['menu--overflow']]: isFullScreen,
      })}
      style={
        {
          '--var-height': menuSize.height ? `${menuSize.height}px` : undefined,
          '--var-width': menuSize.width ? `${menuSize.width}px` : undefined,
        } as CSSProperties
      }
    >
      {!isFullScreen && (
        <>
          <div className={styles['menu-logo']} onClick={() => toUrl('/base')}>
            <IconFont icon="" size="32px" cursor="pointer" />
          </div>
          <div className={styles['menu-divide']}></div>
          <div className={styles['menu-app']}>
            {appList.map(app => {
              return (
                <div
                  className={styles['menu-app-single']}
                  key={app.id}
                  onClick={() => toUrl(app.path)}
                >
                  <IconFont icon={app.icon} size="24px" color="#7d848e" />
                </div>
              )
            })}
          </div>
          <div className={styles['menu-divide']}></div>
          <Avatar
            isBordered
            className={styles['menu-avatar']}
            src={AvatarPng.src}
          />
          <div
            className={styles['menu-full']}
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            <IconFont icon="" size="24px" bold="bold" />
          </div>
        </>
      )}
      {isFullScreen && (
        <>
          <div onClick={() => setIsFullScreen(!isFullScreen)}>close</div>
        </>
      )}
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
