#!/bin/sh
for TESTFILE in ./*.test.js
do
	node $TESTFILE &
done
wait

