import React from 'react'
import { sosLd45 } from '.'
import { Button } from './Button'

import { ThingsHere } from './TabLocation'

export const TabScavenge = () => {
  let state = sosLd45.useSubscribe()

  if (state.stats.health <= 0) {
    return <div>You are dead!</div>
  }

  return (
    <div>
      <div>Scavenge</div>
      <div>Noise: {state.location.noise}</div>
      <div>
        {state.location.scavengeChances === 0 && (
          <div>
            <div>There's nothing to scavenge here</div>
          </div>
        )}
        {state.location.scavengeChances > 0 && (
          <div>
            <div>There are some things to scavenge here</div>
            <Button
              onClick={() => {
                sosLd45.doScavenge()
              }}
            >
              Scavenge
            </Button>
          </div>
        )}
      </div>
      <div>
        <ThingsHere items={state.location.items} />
      </div>
      <div>
        <Button
          onClick={() => {
            sosLd45.setTab('location')
          }}
        >
          Continue onwards
        </Button>
      </div>
    </div>
  )
}
