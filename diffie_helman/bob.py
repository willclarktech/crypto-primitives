#!/usr/bin/env python
import os, sys
sys.path.append(os.path.abspath(os.path.join('redis_tools')))
from redis_tools import setter, waiter
from random import randint

def main(min_b=2000, max_b=3000):
	print("Waiting for g and p...")
	redis_waiter = waiter("g")
	g = int(redis_waiter.send(None))
	p = int(redis_waiter.send("p"))

	b = randint(2000, 3000)
	B = g**b % p

	redis_setter = setter(['B', B])
	redis_setter.send(None)
	print("B: ", B)

	print("Waiting for A...")
	A = int(redis_waiter.send("A"))
	s = A**b % p
	print("RESULT: ", s)

if __name__ == "__main__":
	min_b = int(sys.argv[1]) if len(sys.argv) >= 3 else 2000
	max_b = int(sys.argv[2]) if len(sys.argv) >= 3 else 2000
	main(min_b, max_b)

