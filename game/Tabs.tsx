import React from 'react'
import { sosLd45 } from '.'
import { TabType } from './sosLd45'
import classes from './ld45.module.scss'
import { _, r, assert } from './commonImports'
import { TabLocation } from './TabLocation'
import { TabInventory } from './TabInventory'
import { TabBody } from './TabBody'
import { TabScavenge } from './TabScavenge'
import { TabFight } from './TabFight'
import { TabSkills } from './TabSkills'

let tabs = {
  location: TabLocation,
  inventory: TabInventory,
  body: TabBody,
  scavenge: TabScavenge,
  fight: TabFight,
  skills: TabSkills,
}

export const Tabs = () => {
  let state = sosLd45.useSubscribe()
  let Tab = tabs[state.tab]
  return (
    <div>
      <div className={classes.tabs}>
        <TabLink selectedTab={state.tab} tab='location' />
        <TabLink selectedTab={state.tab} tab='fight' />
        <TabLink selectedTab={state.tab} tab='inventory' />
        <TabLink selectedTab={state.tab} tab='body' />
        <TabLink selectedTab={state.tab} tab='scavenge' />
        <TabLink selectedTab={state.tab} tab='skills' />
      </div>
      <div>{Tab && <Tab />}</div>
    </div>
  )
}

export const TabLink = (props: { tab: TabType; selectedTab: TabType }) => {
  let className = classes.tabLink
  if (props.selectedTab === props.tab) {
    className += ' ' + classes.selected
  }
  return (
    <div
      className={className}
      onClick={() => {
        sosLd45.setTab(props.tab)
      }}
    >
      {_.startCase(props.tab)}
    </div>
  )
}
