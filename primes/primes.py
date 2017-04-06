#!/usr/bin/env pypy3
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

def get_large_prime(print_all=False, i=1000, j=3000):
	n = randint(i, j)
	initial_primes = [2, 3]
	if print_all:
		print("2\n3")
	next_prime = initial_primes[-1]
	prime_generator = get_next_prime(initial_primes)
	while next_prime < n:
		next_prime = next(prime_generator)
		if print_all:
			print(next_prime)
	return next_prime

if __name__ == "__main__":
	print_all = sys.argv[1] == 'true' if len(sys.argv) >= 2 else False
	i = int(sys.argv[2]) if len(sys.argv) >= 4 else 1000
	j = int(sys.argv[3]) if len(sys.argv) >= 4 else 3000
	result = get_large_prime(print_all, i, j)
	if not print_all:
		print(result)

