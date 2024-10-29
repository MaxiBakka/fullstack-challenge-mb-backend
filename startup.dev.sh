#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh mysql:3306
/opt/wait-for-it.sh maildev:1080
npm install
npm run migration:run
npm run start:dev
