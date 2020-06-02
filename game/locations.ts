import { _ } from './commonImports'
import { createItem, IItem, ItemWatch } from './items'
export interface ILocationDesc {
  name: string
  desc: string
  items?: IItem[]
  scavengeChances: number
}
export interface ILocation {
  d: ILocationDesc
  items: IItem[]
  scavengeChances: number
  noise: number
}

export const roll = (min: number, max: number) => {
  return _.random(min, max, false)
}

export function createLoc(d: ILocationDesc): ILocation {
  let loc = {
    d: d,
    items: _.map(d.items, (c) => _.cloneDeep(c)),
    scavengeChances: d.scavengeChances ? roll(1, d.scavengeChances) : 0,
    noise: 0,
  }
  return loc
}
export function createNextLoc() {
  let next = (_.sample(locsA) as unknown) as ILocationDesc
  return createLoc(next)
}

export const LocStart: ILocationDesc = {
  name: 'start',
  desc: 'the woods',
  items: [createItem(ItemWatch)],
  scavengeChances: 1,
}

export const LocHouse: ILocationDesc = {
  name: 'house',
  desc: 'a house',
  scavengeChances: 2,
}
export const LocApartment: ILocationDesc = {
  name: 'apartment',
  desc: 'an apartment',
  scavengeChances: 3,
}

export const locsA: ILocationDesc[] = [LocHouse, LocApartment]
