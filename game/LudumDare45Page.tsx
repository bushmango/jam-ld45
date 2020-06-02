import React from 'react'
import { PanelStats } from './'
import { Tabs } from './Tabs'
import classes from './ld45.module.scss'
export const LudumDare45Page = (props: {}) => {
  return (
    <>
      Ludum Dare 45 - Start with Nothing - By Stevie &amp; Brenden Bushman -
      Made in about 4 hours
      <div className={classes.layout}>
        <div className={classes.stats}>
          <PanelStats />
        </div>
        <div>
          <Tabs />
        </div>
      </div>
    </>
  )
}
