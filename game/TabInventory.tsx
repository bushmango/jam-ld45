import { Button } from './Button'

import React from 'react'
import { sosLd45 } from '.'
import { r, _ } from './commonImports'
import { IItem } from './items'
import classes from './ld45.module.scss'
import { IStateLd45 } from './sosLd45'
import { ThingsHere } from './TabLocation'

export const TabInventory = () => {
  let state = sosLd45.useSubscribe()
  return (
    <div>
      <div>Inventory</div>
      <div>
        <ThingsHave state={state} />
      </div>
      <div>
        <ThingsHere items={state.location.items} />
      </div>
    </div>
  )
}

export const ThingsHave = (props: { state: IStateLd45 }) => {
  let { items } = props.state.inv
  if (items.length === 0) {
    return <div>You have nothing!</div>
  }
  return (
    <div className={classes.area}>
      <div>
        {items.length === 1 ? `You have only this:` : `You have these things:`}
      </div>
      <div>
        <table>
          <tbody>
            {_.map(items, (c, cIdx) => {
              return (
                <tr key={cIdx}>
                  <td>{_.startCase(c.d.name)}</td>
                  <td>
                    <EquipActions state={props.state} item={c} />
                  </td>
                  <td>({c.d.desc})</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const EquipActions = (props: { state: IStateLd45; item: IItem }) => {
  if (
    r.any(
      (e) => props.state.body[e].equipped === props.item,
      r.keys(props.state.body),
    )
  ) {
    return <div>(Equipped)</div>
  }

  return (
    <div style={{ display: 'inline-flex' }}>
      <Button
        onClick={() => {
          sosLd45.doDrop(props.item)
        }}
      >
        Drop
      </Button>
      {props.item.d.healthGain && props.item.d.healthGain > 0 && (
        <Button
          onClick={() => {
            sosLd45.doEat(props.item)
          }}
        >
          Eat
        </Button>
      )}

      {_.map(props.item.d.bodyParts, (d) => {
        return (
          <div key={d}>
            <Button
              onClick={() => {
                sosLd45.doEquip(props.item, d)
              }}
            >
              Equip to {_.startCase(d)}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
