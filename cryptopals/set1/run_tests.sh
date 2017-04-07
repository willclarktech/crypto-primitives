#!/bin/sh
DIR=${1:-'.'}
echo "running tests in $PWD/$DIR"
echo '...'

for TESTFILE in $PWD/$DIR/*.test.js
do
	node $TESTFILE &
done
wait
echo 'done'

