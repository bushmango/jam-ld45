import React from 'react'
import { Layout } from '../layout/Layout-sidecar'
import { LudumDare45Page } from '../../game/LudumDare45Page'

export const Ld45 = () => {
  return (
    <Layout title='LD45'>
      LD 45 page!
      <LudumDare45Page />
    </Layout>
  )
}
