import { _, assert, r } from './commonImports'
import { createSos } from './createSos'

import { IMonster, ISkills } from '.'
import { BodyPartType, createBody, IBody } from './body'
import { createInventory, drop, IInventory, pickup } from './inventory'
import {
  createItem,
  hands,
  IItem,
  ItemEmptyFood,
  lootA,
  lootItem,
} from './items'
import { createLoc, createNextLoc, ILocation, LocStart } from './locations'
import {
  createMonster,
  IMonsterPart,
  MonsterNull,
  spawnMonster,
} from './monsters'
import { createSkills, ISkill, nullSkill } from './skills'

export type TabType =
  | 'inventory'
  | 'location'
  | 'scavenge'
  | 'body'
  | 'skills'
  | 'fight'

export interface IStateLd45 {
  stats: IStats
  ver: number
  tab: TabType
  location: ILocation
  inv: IInventory
  body: IBody
  monster: IMonster
  skills: ISkills
  attackDetails: {
    active: boolean
    item: IItem
    skill: ISkill
    rolls: number[]
    total: number
    revenge: string
  }
}
export interface IStats {
  name: string
  hunger: number
  time: number
  radiation: number
  noise: number
  health: number
}
export function createStats(): IStats {
  return {
    name: 'Unknown',
    hunger: 0,
    time: 0,
    radiation: 0,
    noise: 0,
    health: 100,
  }
}

let initialState: IStateLd45 = {
  stats: createStats(),
  tab: 'location',
  ver: 0,
  location: createLoc(LocStart),
  inv: createInventory(),
  body: createBody(),
  monster: createMonster(MonsterNull),
  skills: createSkills(),
  attackDetails: {
    active: false,
    item: hands,
    skill: nullSkill,
    rolls: [],
    total: 0,
    revenge: '',
  },
}

const ver = 6
const { stateManager, useSubscribe } = createSos(
  'sosLd45',
  '1.0.' + ver,
  initialState,
  {
    useLocalStorage: true,
  },
)
export { useSubscribe }

export function setTab(tab: TabType) {
  stateManager.produce((ds) => {
    ds.tab = tab
  })
}

export function restart() {
  stateManager.produce((ds) => {
    ds.ver = ver
    ds.stats = createStats()
    ds.tab = 'location'
    ds.location = createLoc(LocStart)
    ds.inv = createInventory()
    ds.body = createBody()
    ds.monster = createMonster(MonsterNull)
    ds.skills = createSkills()
  })
}

if (!(stateManager.getState().ver !== ver)) {
  restart()
}

export function doPickup(item: IItem) {
  stateManager.produce((ds) => {
    pickup(ds.inv, ds.location, item)
  })
  doMakeNoise(10)
}

export function doDrop(item: IItem) {
  stateManager.produce((ds) => {
    drop(ds.inv, ds.location, item)
  })
  doMakeNoise(10)
}

export function doOnwards() {
  stateManager.produce((ds) => {
    ds.location = createNextLoc()
  })
  doMakeNoise(20)
}

export function doScavenge() {
  stateManager.produce((ds) => {
    assert(ds.location.scavengeChances > 0)

    let item = lootItem(lootA)
    ds.location.items.push(item)

    ds.location.noise += 15
    ds.location.scavengeChances--
  })
  doMakeNoise(20)
}

export function doEquip(item: IItem, bodyPart: BodyPartType) {
  console.log('trying to ewuip', item, bodyPart)
  stateManager.produce((ds) => {
    assert(r.contains(item, ds.inv.items))
    assert(r.contains(bodyPart, item.d.bodyParts || []))

    _.forEach(r.keys(ds.body), (cIdx) => {
      let c = ds.body[cIdx]
      if (c.equipped === item) {
        c.equipped = null
      }
    })

    doUnequip(bodyPart)
    ds.body[bodyPart].equipped = item
  })
  doMakeNoise(10)
}

export function doUnequip(bodyPart: BodyPartType) {
  stateManager.produce((ds) => {
    ds.body[bodyPart].equipped = null
  })
  doMakeNoise(5)
}

export function doLevelUp(skill: ISkill) {
  stateManager.produce((ds) => {
    let f = r.find((c) => c.d.name === skill.d.name, ds.skills.skills)
    assert(f != null)
    if (f != null) {
      assert(
        r.not(r.isNil(f)) &&
          r.lt(f.level, f.d.max) &&
          r.gte(ds.skills.skillPoints, f.d.cost),
      )
      f.level++
      ds.skills.skillPoints -= skill.d.cost
    }
  })
}

export function dev_pickFight() {
  stateManager.produce((ds) => {
    ds.monster = spawnMonster()
    ds.attackDetails.active = false
  })
}

export function getRandomWeapon(body: IBody) {
  let sample = [body.leftHand.equipped, body.rightHand.equipped]
  let s = _.sample(sample)
  if (!s) {
    return hands
  }
  return s
}

export function roll(
  max: number,
  rolls: number,
  skillBonus: number,
  hitChance: number,
) {
  let hits = r.map((c) => {
    if (_.random(0, 100, false) <= hitChance + skillBonus * 15) {
      return _.random(1, max + skillBonus)
    }
    return 0
  }, r.range(1, rolls + 1))
  return hits
}

export function doAttackPart(part: IMonsterPart) {
  console.log('attacking', part)
  // console.log('roll', roll())
  stateManager.produce((ds) => {
    let w = getRandomWeapon(ds.body) || hands

    let skill =
      r.find(
        (c) => r.equals(c.d.name, w.d.skill) && r.not(r.isNil(w.d.skill)),
        ds.skills.skills,
      ) || nullSkill

    let rolls = roll(
      w.d.damage || 1,
      w.d.rolls || 1,
      nullSkill.level - 1,
      part.d.hitChance || 0,
    )

    ds.attackDetails.item = w
    ds.attackDetails.active = true
    ds.attackDetails.rolls = rolls
    ds.attackDetails.skill = skill
    ds.attackDetails.total = r.sum(rolls) || 0

    //doMakeNoise(w.d.noise || 1)
    ds.stats.noise += w.d.noise || 1

    let f = r.find((c) => c.d.name === part.d.name, ds.monster.bodyParts)
    assert(f != null)
    if (f) {
      f.hp -= ds.attackDetails.total
      if (f.hp <= 0) {
        f.hp = 0
        if (f.d.critical) {
          ds.monster.isDead = true
          ds.skills.skillPoints += 1
        }
      }
    }

    if (!ds.monster.isDead) {
      ds.stats.health -= 5
      ds.attackDetails.revenge = 'The monster hits you for 5 damage X['
    } else {
      ds.attackDetails.revenge = ''
    }
  })
}

export function doMakeNoise(noise: number) {
  stateManager.produce((ds) => {
    let stealthSkill =
      r.find((c) => r.equals(c.d.name, 'stealth'), ds.skills.skills) ||
      nullSkill
    let lvl = stealthSkill.level - 1

    if (lvl === 2) {
      noise = Math.floor(noise * 0.75)
    }
    if (lvl === 3) {
      noise = Math.floor(noise * 0.5)
    }

    ds.stats.noise += noise

    if (ds.stats.noise >= 100) {
      if (ds.monster.isDead || ds.monster.d.name === 'null') {
        ds.monster = spawnMonster()
        ds.attackDetails.active = false
        ds.stats.noise -= 100
      }
    }
  })
}

export function doEat(item: IItem) {
  stateManager.produce((ds) => {
    ds.inv.items = r.reject((c) => c.d.name === item.d.name, ds.inv.items)
    ds.location.items.push(createItem(ItemEmptyFood))

    ds.stats.health += item.d.healthGain || 0
    if (ds.stats.health > 100) {
      ds.stats.health = 100
    }
  })

  doMakeNoise(10)
}
