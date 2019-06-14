#!/bin/bash
set +e

NVM_DIR="/opt/circleci/.nvm"
NODE_VERSION="v12.4.0"

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Installing Node $NODE_VERSION"
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION

# Each step uses the same `$BASH_ENV`, so need to modify it
echo 'export NVM_DIR="/opt/circleci/.nvm"' >> $BASH_ENV
echo "[ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\"" >> $BASH_ENV
