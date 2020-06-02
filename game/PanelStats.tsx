import React from 'react'
import { sosLd45 } from '.'
import { Button } from './Button'

const isDev = true

export const PanelStats = () => {
  let state = sosLd45.useSubscribe()
  return (
    <div>
      <Stat label='Name' val={state.stats.name} />
      <Stat label='Health' val={state.stats.health} />
      <Stat label='Hunger' val={state.stats.hunger} />
      {/* <Stat label='Time' val={state.stats.time} /> */}
      <Stat label='Noise' val={state.stats.noise} />
      <Stat label='Radiation' val={state.stats.radiation} />
      <Stat label='Skill points' val={state.skills.skillPoints} />
      <Button
        onClick={() => {
          sosLd45.restart()
        }}
      >
        Restart
      </Button>
      {isDev && (
        <div>
          <Button
            onClick={() => {
              sosLd45.dev_pickFight()
            }}
          >
            Pick a fight
          </Button>
        </div>
      )}
    </div>
  )
}

export const Stat = (props: { label: string; val: any }) => {
  return (
    <div>
      {props.label}: {'' + props.val}
    </div>
  )
}
