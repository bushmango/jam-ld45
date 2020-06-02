import React from 'react'
import { ISkills, sosLd45 } from '.'
import { Button } from './Button'
import { r, _ } from './commonImports'

export const TabSkills = () => {
  let state = sosLd45.useSubscribe()
  return (
    <div>
      <div>Skills</div>
      <div>Skill points: {state.skills.skillPoints}</div>
      <div>
        <Skills skills={state.skills} />
      </div>
    </div>
  )
}

export const Skills = (props: { skills: ISkills }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Level</th>
            <th>Max</th>
            <th>Increase</th>
          </tr>
        </thead>
        <tbody>
          {r.map(
            (c) => (
              <tr key={c.d.name}>
                <td>{_.startCase(c.d.name)}</td>
                <td>{c.level - 1}</td>
                <td>{c.d.max - 1}</td>
                <td>
                  {c.level < c.d.max && (
                    <>
                      {props.skills.skillPoints >= c.d.cost ? (
                        <Button
                          onClick={() => {
                            sosLd45.doLevelUp(c)
                          }}
                        >
                          Increase for {c.d.cost}{' '}
                        </Button>
                      ) : (
                        <div>Need {c.d.cost} skill points</div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ),
            props.skills.skills,
          )}
        </tbody>
      </table>
    </div>
  )
}
