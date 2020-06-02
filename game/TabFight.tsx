import React from 'react'
import { sosLd45 } from '.'
import { Button } from './Button'
import { r, _ } from './commonImports'
import { IMonster } from './monsters'
import { IStateLd45 } from './sosLd45'

export const TabFight = () => {
  let state = sosLd45.useSubscribe()
  return (
    <div>
      <div>Fight</div>
      <div>
        <Monster monster={state.monster} state={state} />
      </div>
      <div>
        <AttackDetails state={state} />
      </div>
    </div>
  )
}

export const AttackDetails = (props: { state: IStateLd45 }) => {
  let deets = props.state.attackDetails
  if (!deets.active) {
    return null
  }
  return (
    <div>
      <div>
        You attacked with {_.startCase(deets.item.d.name)} with{' '}
        {_.startCase(deets.skill.d.name)} {deets.skill.level}
      </div>
      <div>
        You rolled {_.join(deets.rolls, ',')} for {deets.total} damage!!!
      </div>
      <div>{deets.revenge}</div>
    </div>
  )
}

export const Monster = (props: { monster: IMonster; state: IStateLd45 }) => {
  if (props.monster.d.name === 'null') {
    return <div>There's nobody else here...</div>
  }

  return (
    <div>
      <div>
        {props.monster.d.name} - {props.monster.d.desc}{' '}
        {props.monster.isDead && '(DEAD)'}
      </div>
      <div>
        <table>
          <tbody>
            {r.map(
              (c) => (
                <tr key={c.d.name}>
                  <td>
                    {c.hp === 0 ? (
                      <s> {_.startCase(c.d.name)}</s>
                    ) : (
                      <div> {_.startCase(c.d.name)}</div>
                    )}
                  </td>
                  <td>
                    {c.hp} / {c.d.hp}
                  </td>
                  <td>
                    {c.d.hp > 0 &&
                      r.not(props.monster.isDead) &&
                      props.state.stats.health > 0 && (
                        <Button
                          onClick={() => {
                            sosLd45.doAttackPart(c)
                          }}
                        >
                          Attack
                        </Button>
                      )}
                  </td>
                </tr>
              ),
              props.monster.bodyParts,
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
