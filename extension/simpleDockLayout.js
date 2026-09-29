// Simple Dock additions, GPL-2.0-or-later.
// Copy the layout: the upstream monitor cache must remain untouched.
export function restrictAppMenu(layout, monitorIndex, primaryIndex) {
  return layout.map(element => ({
    ...element,
    visible: element.element === 'showAppsButton'
      ? element.visible && monitorIndex === primaryIndex
      : element.visible,
  }))
}
