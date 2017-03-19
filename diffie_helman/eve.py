#!/usr/bin/env python
import os, sys
sys.path.append(os.path.abspath(os.path.join("redis_tools")))
from redis_tools import waiter

def main():
	g_waiter = waiter("g")
	p_waiter = waiter("p")
	A_waiter = waiter("A")
	B_waiter = waiter("B")

	g, p, A, B = [
			g_waiter.send(None),
			p_waiter.send(None),
			A_waiter.send(None),
			B_waiter.send(None)
	]

	a = 0
	while g**a % p != A:
		a += 1
	s = B**a % p
	print("Got the secret: %d" %s )

if __name__ == "__main__":
	main()
