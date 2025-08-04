#!/bin/bash
cd /home/ubuntu/Documents
DIRECTORY1="/home/ubuntu/Documents/TaqdeerWebsite"
DIRECTORY2="/home/ubuntu/Documents/TaqdeerWebsite2"

createServer() {
    echo "$2 does exist."
    mkdir $1
    mv server.zip $1
    cd $1
    unzip server.zip
    rm server.zip
    npm install --omit=dev
    pm2 stop "Taqdeer Website"
    pm2 delete "Taqdeer Website"
    pm2 start --name "Taqdeer Website" "node build/index.js"
    rm -r $2
}

if [ -d "$DIRECTORY1" ]; then
    createServer $DIRECTORY2 $DIRECTORY1
fi

if [ -d "$DIRECTORY2" ]; then
    createServer $DIRECTORY1 $DIRECTORY2
fi
