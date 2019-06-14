#!/bin/sh
# Upgrade Environment
sudo rm -rf /var/lib/apt/lists/* && sudo apt-get clean && sudo apt-get -qq update
# NodeJS
sh .circleci/setup-node.sh

# Install yarn
npm install -g yarn@1.16.0

# Latest Chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt-get update -y
sudo apt-get install lsb-base google-chrome-stable -y
