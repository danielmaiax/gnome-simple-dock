#!/usr/bin/env python3
"""Validate sources and package the extension without external dependencies."""
import json
from pathlib import Path
import subprocess
import tempfile
import shutil
import zipfile

root = Path(__file__).resolve().parents[1]
source = root / 'extension'
metadata = json.loads((source / 'metadata.json').read_text())
for path in source.glob('*.js'):
    subprocess.run(['node', '--check', str(path)], check=True)
subprocess.run(['node', '--test', str(root / 'tests/layout.test.js')], check=True)
with tempfile.TemporaryDirectory(prefix='simple-dock-build-') as temporary:
    staging = Path(temporary) / 'extension'
    shutil.copytree(source, staging)
    subprocess.run(['glib-compile-schemas', '--strict', str(staging / 'schemas')], check=True)
    expected = json.loads((root / 'defaults.json').read_text())
    import os
    env = dict(os.environ, GSETTINGS_BACKEND='memory')
    for key, value in expected.items():
        actual = subprocess.check_output([
            'gsettings', '--schemadir', str(staging / 'schemas'), 'get',
            metadata['settings-schema'], key,
        ], env=env, text=True).strip()
        assert actual == value, (key, actual, value)
    output = root / 'dist' / (metadata['uuid'] + '.shell-extension.zip')
    output.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(staging.rglob('*')):
            if path.is_file():
                archive.write(path, path.relative_to(staging))
    with zipfile.ZipFile(output) as archive:
        assert archive.testzip() is None
    print(f'Validated {len(expected)} defaults. Package: {output}')
