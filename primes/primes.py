#!/usr/bin/env python
import sys
from math import sqrt
from random import randint

def check_prime(n, primes):
	for prime in primes:
		if sqrt(n) < prime:
			return True
		elif n % prime == 0:
			return False

def get_next_prime(primes):
	n = primes[-1] + 2
	while True:
		if check_prime(n, primes):
			primes.append(n)
			yield n
		n+=2

def get_large_prime(i=1000, j=3000):
	n = randint(i, j)
	initial_primes = [2, 3]
	next_prime = initial_primes[-1]
	prime_generator = get_next_prime(initial_primes)
	while next_prime < n:
		next_prime = next(prime_generator)
	return next_prime

if __name__ == "__main__":
	i = int(sys.argv[1]) if len(sys.argv) >= 3 else 1000
	j = int(sys.argv[2]) if len(sys.argv) >= 3 else 3000
	result = get_large_prime(i, j)
	print(result)

