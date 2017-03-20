#!/usr/bin/env python
from time import sleep
import redis

def init_redis():
	return redis.StrictRedis(host='localhost', port=6379, db=0)

def getter(key):
	r = init_redis()
	while True:
		key = yield r.get(key)

def setter(initial):
	key, value = initial
	r = init_redis()
	while True:
		key, value = yield r.set(key, value)

def deleter(key):
	r = init_redis()
	while True:
		key = yield r.delete(key)

def waiter(period):
	r = init_redis()
	key = yield
	while True:
		value = None
		while value == None:
			value = r.get(key)
			if value == None:
				sleep(period)
		key = yield value

