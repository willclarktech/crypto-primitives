#!/usr/bin/env python
import os, sys
sys.path.append(os.path.abspath(os.path.join("redis_tools")))
from redis_tools import setter, waiter, deleter
from random import randint

def main(min_b=2000, max_b=3000):
	print("Waiting for g...")
	redis_waiter = waiter(1)
	redis_waiter.send(None)
	g = int(redis_waiter.send("g"))
	print("Got g")
	redis_deleter = deleter("g")
	redis_deleter.send(None)

	print("Waiting for p...")
	p = int(redis_waiter.send("p"))
	print("Got p")
	redis_deleter.send("p")

	b = randint(2000, 3000)
	B = g**b % p

	redis_setter = setter(["B", B])
	redis_setter.send(None)
	print("Set B")

	print("Waiting for A...")
	A = int(redis_waiter.send("A"))
	print("Got A")
	redis_deleter.send("A")

	s = A**b % p
	print("RESULT: ", s)

if __name__ == "__main__":
	min_b = int(sys.argv[1]) if len(sys.argv) >= 3 else 2000
	max_b = int(sys.argv[2]) if len(sys.argv) >= 3 else 2000
	main(min_b, max_b)

