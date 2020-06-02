import { BodyPartType } from './body'
import { _, r, assert } from './commonImports'
import { number } from 'prop-types'

export interface ISkillDesc {
  name: string
  cost: number
  max: number
}

export interface ISkill {
  d: ISkillDesc
  level: number
}

export const SkillMartial: ISkillDesc = {
  name: 'martialArts',
  cost: 5,
  max: 10,
}

export const SkillMelee: ISkillDesc = {
  name: 'meleeWeapons',
  cost: 8,
  max: 3,
}

export const SkillGuns: ISkillDesc = {
  name: 'guns',
  cost: 10,
  max: 3,
}

export const SkillScavenge: ISkillDesc = {
  name: 'scavenging',
  cost: 10,
  max: 3,
}

export const SkillStealth: ISkillDesc = {
  name: 'stealth',
  cost: 10,
  max: 3,
}

export const SkillNull: ISkillDesc = {
  name: 'null',
  cost: 999,
  max: 1,
}

export const skillsA = [
  SkillMartial,
  SkillMelee,
  SkillGuns,
  SkillScavenge,
  SkillStealth,
]

export const createSkill = (d: ISkillDesc): ISkill => {
  return {
    d,
    level: 1,
  }
}

export const nullSkill = createSkill(SkillNull)

export interface ISkills {
  skillPoints: number
  skills: ISkill[]
}

export const createSkills = (): ISkills => {
  return {
    skillPoints: 0,
    skills: r.map((c) => createSkill(c), skillsA),
  }
}
