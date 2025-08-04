#!/bin/bash
sh build.sh
scp -r server.zip taqdeer:Documents/
rm server.zip