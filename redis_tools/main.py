#!/bin/sh
import redis

def init_redis():
	return redis.StrictRedis(host='localhost', port=6379, db=0)

def getter(key):
	r = init_redis()
	while True:
		key = yield r.get(key)

def setter(key, value):
	r = init_redis()
	while True:
		key, value = yield r.set(key, value)

def deleter(key):
	r = init_redis()
	while True:
		key = yield r.delete(key)

