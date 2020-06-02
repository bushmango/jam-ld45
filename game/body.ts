import { IItem } from './items'

export type BodyPartType =
  | 'head'
  | 'torso'
  | 'leftArm'
  | 'rightArm'
  | 'leftHand'
  | 'rightHand'
  | 'legs'
  | 'leftFoot'
  | 'rightFoot'

export interface IBodyPart {
  name: BodyPartType
  equipped?: IItem | null
}

export interface IBody {
  head: IBodyPart
  torso: IBodyPart
  leftArm: IBodyPart
  rightArm: IBodyPart
  leftHand: IBodyPart
  rightHand: IBodyPart
  legs: IBodyPart
  leftFoot: IBodyPart
  rightFoot: IBodyPart
}

export function createBody(): IBody {
  return {
    head: {
      name: 'head',
    },
    torso: {
      name: 'torso',
    },
    leftArm: {
      name: 'leftArm',
    },
    rightArm: {
      name: 'rightArm',
    },
    leftHand: {
      name: 'leftHand',
    },
    rightHand: {
      name: 'rightHand',
    },
    legs: {
      name: 'legs',
    },
    leftFoot: {
      name: 'leftFoot',
    },
    rightFoot: {
      name: 'rightFoot',
    },
  }
}
