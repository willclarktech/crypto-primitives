#!/bin/sh

import redis

def get(key):
	r = redis.StrictRedis(host='localhost', port=6379, db=0)
	return r.get(key)

