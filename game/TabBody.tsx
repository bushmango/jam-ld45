import React from 'react'
import { sosLd45 } from '.'
import { IBody } from './body'
import classes from './ld45.module.scss'
import { _, r, assert } from './commonImports'
import { Button } from './Button'

export const TabBody = () => {
  let state = sosLd45.useSubscribe()
  return (
    <div>
      <div>Body</div>
      <div>
        <Body body={state.body} />
      </div>
    </div>
  )
}

export const Body = (props: { body: IBody }) => {
  return (
    <div className={classes.area}>
      <div>
        {_.map(r.keys(props.body), (cIdx) => {
          let c = props.body[cIdx]
          return (
            <div key={cIdx} className={classes.item}>
              <div>{_.startCase(c.name)}</div>
              <div>
                {c.equipped && (
                  <div>
                    (Equipped {_.startCase(c.equipped.d.name)}){' '}
                    <Button
                      onClick={() => {
                        sosLd45.doUnequip(cIdx)
                      }}
                    >
                      Unequip
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
