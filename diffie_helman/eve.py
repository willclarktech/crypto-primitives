#!/usr/bin/env python
import os, sys
sys.path.append(os.path.abspath(os.path.join("redis_tools")))
from redis_tools import waiter

def wait_for_value(key, redis_waiter):
	value = redis_waiter.send(key)
	return int(value)

def main():
	redis_waiter = waiter(1/2)
	redis_waiter.send(None)

	g, p, A, B = [
			wait_for_value("g", redis_waiter),
			wait_for_value("p", redis_waiter),
			wait_for_value("A", redis_waiter),
			wait_for_value("B", redis_waiter)
	]

	a = 0
	while g**a % p != A:
		a += 1
	s = B**a % p
	print("Got the secret: %d" %s )

if __name__ == "__main__":
	main()
