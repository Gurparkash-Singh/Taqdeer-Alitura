#!/bin/bash
mv .env norun.txt
mv .env.build .env
npm run build
mv .env .env.build
mv norun.txt .env
ssh sher 'bash -s' < delete.sh
zip server.zip -r build package.json package-lock.json
scp -r server.zip sher:Documents/Taqdeer
rm server.zip
ssh sher 'bash -s' < server-run.sh