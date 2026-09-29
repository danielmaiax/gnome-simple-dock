# Simple Dock

A customizable Ubuntu taskbar based on **Dash to Panel 74**. The initial release is **0.1.1** for **GNOME Shell 50** (target environment: Ubuntu 26.04).

## Default behavior

- A 32 px bottom panel on every monitor, always visible.
- Customizable panel color, with fully opaque graphite (`#303030`) as the default.
- Each panel shows windows from its own monitor and current workspace.
- Windows are not grouped by application; favorites remain available.
- The Show Applications button appears only on the system's primary monitor.
- A clock and system controls appear on every panel.
- Separate settings from Dash to Panel.

The Show Applications button opens GNOME's app grid. The extension does not include a Windows-style Start menu. It does not change the desktop wallpaper.

The layout uses no author-specific monitor IDs, so the defaults also apply to new monitors. The Show Applications button follows the primary monitor and is reapplied when Dash to Panel rebuilds the panels. Other inherited controls remain available in Preferences.

## Build and verify

Requirements: Python 3, Node.js, and `glib-compile-schemas` (GLib). No dependency downloads are needed.

```sh
python3 scripts/build.py
```

The build checks JavaScript syntax, tests the primary monitor rule, compiles schemas, verifies defaults, and creates `dist/simple-dock@dmagovbr.shell-extension.zip`.

## Install and try

```sh
gnome-extensions install --force dist/simple-dock@dmagovbr.shell-extension.zip
```

If GNOME does not yet recognize the extension installed from the ZIP, register it in the current session: press **Alt + F2**, type `lg`, and run this in the console:

```js
await Main.extensionManager.loadExtension(Main.extensionManager.createExtensionObject('simple-dock@dmagovbr', Gio.File.new_for_path(GLib.get_user_data_dir() + '/gnome-shell/extensions/simple-dock@dmagovbr'), 2))
```

This is for the first installation, when the extension does not yet appear in `gnome-extensions list`. An `undefined` result is normal. Press Esc to close the console. Logging out and back in also registers the extension.

Then run:

```sh
gnome-extensions disable dash-to-panel@jderose9.github.com
gnome-extensions disable ubuntu-dock@ubuntu.com
gnome-extensions enable simple-dock@dmagovbr
gnome-extensions prefs simple-dock@dmagovbr
```

Use only one of these panel extensions at a time. Simple Dock retains internal APIs from Dash to Panel and should not run alongside it. Your original Dash to Panel settings remain intact.

To switch back:

```sh
gnome-extensions disable simple-dock@dmagovbr
gnome-extensions enable dash-to-panel@jderose9.github.com
```

## Validation

The extension was loaded and enabled on GNOME Shell 50.1 without restarting the session. Full visual validation across multiple monitors is still pending. Check:

1. Panel position, height, and color on each monitor.
2. Moving a window between monitors: it appears only on the destination panel.
3. Switching workspaces: only windows from the active workspace appear.
4. Changing the primary monitor and connecting or disconnecting a display: only the primary display retains the Show Applications button.
5. Changing preferences, then disabling and re-enabling the extension.

Window isolation is handled by the extension. Workspace behavior on secondary displays also depends on GNOME's workspace settings.

## Publishing

Project repository: https://github.com/danielmaiax/gnome-simple-dock. The source is distributed through GitHub; create the ZIP with the build command above. After visual testing, submit the ZIP at https://extensions.gnome.org/upload/. The GNOME Extensions listing requires review and is not published automatically. Keep the UUID stable to support updates.

## Origin and license

An independent fork of https://github.com/home-sweet-gnome/dash-to-panel, based on the locally installed version 74. This is not an official Ubuntu or Dash to Panel project.

Licensed under **GPL-2.0-or-later**. Original authorship notices and licenses are preserved in `COPYING` and `UPSTREAM-README.md`. Simple Dock changes include its own identity and schema, new defaults, the primary monitor rule, and packaging and validation tools.
