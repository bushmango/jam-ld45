import { ItemWatch, IItem } from './items'
import { _, r, assert } from './commonImports'
import { ILocation } from './locations'

export interface IInventory {
  items: IItem[]
}

export function createInventory(): IInventory {
  return {
    items: [],
  }
}

export function pickup(inv: IInventory, loc: ILocation, i: IItem) {
  assert(r.contains(i, loc.items))
  inv.items = r.append(i, inv.items)
  loc.items = r.without([i], loc.items)
}
export function drop(inv: IInventory, loc: ILocation, i: IItem) {
  assert(r.contains(i, inv.items))
  loc.items = r.append(i, loc.items)
  inv.items = r.without([i], inv.items)
}

export const LocStart = {
  name: 'start',
  desc: 'the woods',
  items: [ItemWatch],
}
