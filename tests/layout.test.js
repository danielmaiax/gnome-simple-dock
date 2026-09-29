import test from 'node:test'
import assert from 'node:assert/strict'
import { restrictAppMenu } from '../extension/simpleDockLayout.js'

const layout = Object.freeze([
  Object.freeze({ element: 'showAppsButton', visible: true, position: 'stackedTL' }),
  Object.freeze({ element: 'taskbar', visible: true, position: 'stackedTL' }),
  Object.freeze({ element: 'activitiesButton', visible: false, position: 'stackedTL' }),
])

test('menu appears only on the primary monitor; other elements retain visibility', () => {
  for (const primary of [0, 1, 2]) {
    for (const monitor of [0, 1, 2]) {
      const result = restrictAppMenu(layout, monitor, primary)
      assert.equal(result[0].visible, monitor === primary)
      assert.deepEqual(result.slice(1), layout.slice(1))
    }
  }
})

test('changing primary monitor updates the menu without corrupting the cached layout', () => {
  assert.equal(restrictAppMenu(layout, 1, 0)[0].visible, false)
  assert.equal(restrictAppMenu(layout, 1, 1)[0].visible, true)
  assert.equal(layout[0].visible, true)
})

test('explicitly hidden menu remains hidden even on the primary monitor', () => {
  assert.equal(restrictAppMenu([{ element: 'showAppsButton', visible: false }], 0, 0)[0].visible, false)
})
