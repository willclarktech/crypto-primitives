#! /usr/bin/env python
import os, sys
sys.path.append(os.path.abspath(os.path.join('primes')))
from primes import get_large_prime
from random import randint

def main(min_a=2000, max_a=3000, g=2):
	p = get_large_prime()
	print("g: ", g)
	print("p: ", p)

	a = randint(min_a, max_a)
	A = g**a % p
	print("A: ", A)

	B = int(input("Enter B now: "))
	s = B**a % p
	print("RESULT: ", s)

if __name__ == "__main__":
	min_a = int(sys.argv[1]) if len(sys.argv) >= 3 else 2000
	max_a = int(sys.argv[2]) if len(sys.argv) >= 3 else 3000
	g = int(sys.argv[3]) if len(sys.argv) >= 4 else 2
	main(min_a, max_a, g)

