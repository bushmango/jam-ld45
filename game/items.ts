import { BodyPartType } from './body'
import { _ } from './commonImports'
export interface IItemDesc {
  name: string
  bodyParts?: BodyPartType[]
  desc: string
  noise?: number
  damage?: number
  rolls?: number
  skill?: string
  healthGain?: number
}

export interface IItem {
  d: IItemDesc
}

export const ItemWatch: IItemDesc = {
  name: 'watch',
  desc: 'a broken watch is right twice a day',
}

export const ItemFood: IItemDesc = {
  name: 'food',
  desc: `yeay it is food!`,
  healthGain: 33,
}
export const ItemEmptyFood: IItemDesc = {
  name: 'emptyFood',
  desc: `yeay it was food!`,
}

export const ItemLeftShoe: IItemDesc = {
  name: 'leftShoe',
  bodyParts: ['leftFoot', 'rightFoot'],
  desc: `it's exactly your size!`,
}
export const ItemRightShoe: IItemDesc = {
  name: 'rightShoe',
  bodyParts: ['leftFoot', 'rightFoot'],
  desc: `it's exactly your size!`,
}

export const ItemShirt: IItemDesc = {
  name: 'shirt',
  bodyParts: ['torso', 'head'],
  desc: `it's a band shirt for some band that's too cool for you`,
}

export const ItemPants: IItemDesc = {
  name: 'pants',
  bodyParts: ['legs', 'head'],
  desc: `some jeans`,
}
export const ItemBrassKnuckles: IItemDesc = {
  name: 'brassKnuckles',
  bodyParts: ['rightHand', 'leftHand'],
  desc: `a pair of brass knuckles`,
  noise: 5,
  rolls: 1,
  damage: 5,
  skill: 'martialArts',
}
export const ItemHands: IItemDesc = {
  name: 'hands',
  desc: 'you should not get this as an item...',
  bodyParts: ['rightHand', 'leftHand'],
  noise: 1,
  rolls: 1,
  damage: 4,
  skill: 'martialArts',
}

export const ItemKnife: IItemDesc = {
  name: 'knife',
  bodyParts: ['rightHand', 'leftHand'],
  desc: `a shiv`,
  noise: 5,
  rolls: 1,
  damage: 6,
  skill: 'melee',
}

export const ItemSword: IItemDesc = {
  name: 'sword',
  bodyParts: ['rightHand', 'leftHand'],
  desc: `a sword`,
  noise: 10,
  rolls: 1,
  damage: 8,
  skill: 'melee',
}
export const ItemPistol: IItemDesc = {
  name: 'pistol',
  bodyParts: ['rightHand', 'leftHand'],
  desc: `a pistol`,
  noise: 50,
  rolls: 2,
  damage: 6,
  skill: 'guns',
}
export const ItemShotgun: IItemDesc = {
  name: 'shotgun',
  bodyParts: ['rightHand'],
  desc: `a shotgun`,
  noise: 80,
  rolls: 5,
  damage: 4,
  skill: 'guns',
}

export const lootA = [
  ItemWatch,
  ItemLeftShoe,
  ItemRightShoe,
  ItemShirt,
  ItemPants,
  ItemKnife,
  ItemPistol,
  ItemShotgun,
  ItemFood,
  ItemEmptyFood,
]

export const createItem = (d: IItemDesc): IItem => {
  return {
    d,
  }
}

export const lootItem = (items: IItemDesc[]): IItem => {
  let d = (_.sample(lootA) as unknown) as IItemDesc
  return createItem(d)
}

export const hands = createItem(ItemHands)
