#!/usr/bin/env python
import os, sys
sys.path.append(os.path.abspath(os.path.join("primes")))
sys.path.append(os.path.abspath(os.path.join("redis_tools")))
from primes import get_large_prime
from redis_tools import setter, waiter, deleter
from random import randint

def main(min_a=2000, max_a=3000, g=2):
	redis_setter = setter(["g", g])
	redis_setter.send(None)
	print("Set g")

	p = get_large_prime()
	redis_setter.send(["p", p])
	print("Set p")

	a = randint(min_a, max_a)
	A = g**a % p
	redis_setter.send(["A", A])
	print("Set A")

	print("Waiting for B...")
	redis_waiter = waiter(1)
	redis_waiter.send(None)
	B = int(redis_waiter.send("B"))
	print("Got B")
	redis_deleter = deleter("B")
	redis_deleter.send(None)

	s = B**a % p
	print("RESULT: ", s)

if __name__ == "__main__":
	min_a = int(sys.argv[1]) if len(sys.argv) >= 3 else 2000
	max_a = int(sys.argv[2]) if len(sys.argv) >= 3 else 3000
	g = int(sys.argv[3]) if len(sys.argv) >= 4 else 2
	main(min_a, max_a, g)

