#!/bin/bash

set -euf -o pipefail

BACK_END_PATH=$(pwd)/public
cd ../hokage
npm run build
echo $BACK_END_PATH
rm -rv $BACK_END_PATH
mkdir $BACK_END_PATH
cp -r dist/. $BACK_END_PATH/public
