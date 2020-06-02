import { Button } from './Button'

import React from 'react'
import { sosLd45 } from '.'
import { r, _ } from './commonImports'
import { IItem } from './items'
import classes from './ld45.module.scss'
export const TabLocation = () => {
  let state = sosLd45.useSubscribe()

  if (state.stats.health <= 0) {
    return <div>You are dead!</div>
  }

  return (
    <div>
      <div>Location - {state.location.d.name}</div>
      <div>{state.location.d.desc}</div>

      <ThingsHere items={state.location.items} />

      <div>
        {state.location.scavengeChances ? (
          <div>
            There are things to{' '}
            <Button
              onClick={() => {
                sosLd45.setTab('scavenge')
              }}
            >
              Scavenge
            </Button>{' '}
            here
          </div>
        ) : (
          ''
        )}
      </div>

      {state.monster.d.name !== 'null' && r.not(state.monster.isDead) && (
        <div className={classes.area}>
          There is a {state.monster.d.name} here.
          <Button
            onClick={() => {
              sosLd45.setTab('fight')
            }}
          >
            Fight
          </Button>
        </div>
      )}
      {state.monster.isDead && (
        <div className={classes.area}>
          There is a dead {state.monster.d.name} here.
        </div>
      )}
      {(state.monster.d.name === 'null' || state.monster.isDead) && (
        <div className={classes.area}>
          <Button
            onClick={() => {
              sosLd45.doOnwards()
            }}
          >
            Travel onwards
          </Button>
        </div>
      )}
    </div>
  )
}

export const ThingsHere = (props: { items: IItem[] }) => {
  if (props.items.length === 0) {
    return null
  }
  return (
    <div className={classes.area}>
      <div>
        {props.items.length === 1
          ? `There's something here:`
          : ` There are some things here`}
      </div>
      <div>
        {_.map(props.items, (c, cIdx) => {
          return (
            <div key={cIdx} className={classes.item}>
              <Button
                onClick={() => {
                  sosLd45.doPickup(c)
                }}
              >
                Pickup
              </Button>
              <div>
                {_.startCase(c.d.name)} - {c.d.desc}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
