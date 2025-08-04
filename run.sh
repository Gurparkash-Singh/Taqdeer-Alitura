#!/bin/bash
sh build.sh
scp -r server.zip taqdeer:Documents/
rm server.zip
ssh taqdeer 'bash -s' < server-run.sh