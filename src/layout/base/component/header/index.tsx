'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
} from '@nextui-org/react'
import React from 'react'
import AvatarPng from '@/asset/image/avatar/avatar.png'
import IconFont from '@/component/iconFont'
import type nextUiTypes from '@/type/nextUiType.d'
import styles from './headerStyle.module.scss'

const dropdownList = [
  {
    key: 'information',
    name: '粗略信息',
  },
  {
    key: 'personal',
    name: '个人信息',
    icon: '',
  },
  {
    key: 'set',
    name: '网站设置',
    icon: '',
  },
  {
    key: 'quit',
    name: '退出登录',
    icon: '',
    color: 'danger',
  },
]

const Header = () => {
  return (
    <div className={styles['header']}>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            className={styles['header-avatar']}
            isBordered
            color="default"
            src={AvatarPng.src}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          items={dropdownList}
          disabledKeys={['information']}
        >
          {item => {
            if (item.key === 'information') {
              return (
                <DropdownItem
                  key={item.key}
                  showDivider={true}
                  color={
                    item.color
                      ? (item.color as nextUiTypes.ConfigColor)
                      : 'default'
                  }
                  className={styles['information__mask']}
                >
                  <div className={styles['information']}>
                    <div className={styles['information-name']}>梦涵之诺</div>
                    <div className={styles['information-identity']}>
                      注册会员
                    </div>
                    <div className={styles['information-level']}>
                      <p className={styles['information-level-now']}>lv0</p>
                      <Progress color="primary" size="sm" value={68} />
                      <p className={styles['information-level-next']}>lv1</p>
                    </div>
                    <div className={styles['information-tip']}>
                      当前经验0，还需要111111经验升到lv1
                    </div>
                  </div>
                </DropdownItem>
              )
            } else {
              return (
                <DropdownItem
                  key={item.key}
                  color={
                    item.color
                      ? (item.color as nextUiTypes.ConfigColor)
                      : 'default'
                  }
                >
                  <div className={styles['tag']}>
                    <IconFont icon={item.icon as string} size="14px" />
                    <div>{item.name}</div>
                    <div className={styles['tag-arrow']}>
                      <IconFont icon="" size="14px" />
                    </div>
                  </div>
                </DropdownItem>
              )
            }
          }}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Header
