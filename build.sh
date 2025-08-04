#!/bin/bash
mkdir temp_env/
cp .env temp_env
cp .env.build temp_env
mv .env norun.txt
mv .env.build .env
npm run build
mv .env .env.build
mv norun.txt .env
zip server.zip -r build package.json package-lock.json
rm -r temp_env