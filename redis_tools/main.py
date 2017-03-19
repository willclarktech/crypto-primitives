#!/bin/sh

import redis

def init_redis():
	return redis.StrictRedis(host='localhost', port=6379, db=0)

def get(key):
	r = init_redis()
	return r.get(key)

def set(key, value):
	r = init_redis()
	return r.set(key, value)

def delete(key):
	r = init_redis()
	return r.delete(key)

