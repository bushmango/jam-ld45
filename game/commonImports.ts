import * as _ from 'lodash'
export { _ }
import * as R from 'ramda'

export const r = R

const mapIndexed: any = r.addIndex(r.map)
export const re = {
  mapIndexed,
}

import * as nanoid from 'nanoid'
import { DateTime } from 'luxon'
export { nanoid, DateTime }

export const assert = (
  assertion: boolean,
  message: string = 'assertion failed!',
) => {
  if (!assertion) {
    throw new Error(message)
  }
}
