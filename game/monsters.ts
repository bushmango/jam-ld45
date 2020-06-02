import { r, _ } from './commonImports'
export interface IMonsterDesc {
  name: string
  bodyParts?: IMonsterPartDesc[]
  desc: string
}

export interface IMonster {
  d: IMonsterDesc
  bodyParts: IMonsterPart[]
  isDead: boolean
}

export interface IMonsterPartDesc {
  name: string
  hp: number
  critical?: boolean
  hitChance?: number
}
export interface IMonsterPart {
  d: IMonsterPartDesc
  hp: number
}

export const createMonsterPart = (d: IMonsterPartDesc): IMonsterPart => {
  return {
    d,
    hp: d.hp,
  }
}

export const MonsterNull: IMonsterDesc = {
  name: 'null',
  desc: 'a placeholder for no monster',
  bodyParts: [
    {
      name: 'void',
      hp: 9999,
      critical: true,
    },
  ],
}

export const MonsterBlob: IMonsterDesc = {
  name: 'blob',
  desc: 'a blob of radioactive goo',
  bodyParts: [
    {
      name: 'brain',
      hp: 5,
      critical: true,
      hitChance: 20,
    },
    {
      name: 'goo',
      hp: 30,
      critical: true,
      hitChance: 90,
    },
  ],
}

export const MonsterZombie: IMonsterDesc = {
  name: 'zombie',
  desc: 'a mutated human',
  bodyParts: [
    {
      name: 'head',
      hp: 5,
      critical: true,
      hitChance: 25,
    },
    {
      name: 'torso',
      hp: 10,
      critical: true,
      hitChance: 50,
    },
    {
      name: 'leftArm',
      hp: 5,
      hitChance: 50,
    },
    {
      name: 'rightArm',
      hp: 5,
      hitChance: 50,
    },
    {
      name: 'leftLeg',
      hp: 5,
      hitChance: 50,
    },
    {
      name: 'rightLeg',
      hp: 5,
      hitChance: 50,
    },
  ],
}
export const MonsterRobot: IMonsterDesc = {
  name: 'robot',
  desc: 'an automaton from the year 2000',
  bodyParts: [
    {
      name: 'posibrain',
      hp: 10,
      critical: true,
      hitChance: 20,
    },
    {
      name: 'torso',
      hp: 15,
      critical: true,
      hitChance: 50,
    },
    {
      name: 'grabber',
      hp: 5,
      hitChance: 40,
    },
    {
      name: 'extender',
      hp: 5,
      hitChance: 40,
    },
    {
      name: 'treads',
      hp: 5,
      hitChance: 50,
    },
  ],
}

export const monstersA = [MonsterBlob, MonsterRobot, MonsterZombie]

export const createMonster = (d: IMonsterDesc): IMonster => {
  return {
    d,
    bodyParts: r.map((c) => createMonsterPart(c), d.bodyParts),
    isDead: false,
  }
}

export const spawnMonster = () => {
  let d = _.sample(monstersA) as IMonsterDesc
  return createMonster(d)
}
