import sys
from math import sqrt
from random import randint

def check_prime(n, primes):
	isPrime = True
	for prime in primes:
		if sqrt(n) < prime:
			break
		elif n % prime == 0:
			isPrime = False
	return isPrime

def get_next_prime(primes):
	n = primes[-1] + 2
	found = False
	while found == False:
		if check_prime(n, primes):
			found = True
		else:
			n+=1
	return n

def find_primes(primes, n):
	while primes[-1] < n:
		primes.append(get_next_prime(primes))
	return primes

def find_primes_in_range(i, j):
	n = randint(i, j)
	initial_primes = [2, 3]
	return find_primes(initial_primes, n)

def get_large_prime(i=100, j=300):
	return find_primes_in_range(i, j)[-1]

if __name__ == "__main__":
	i = int(sys.argv[1])
	j = int(sys.argv[2])
	result = get_large_prime(i, j)
	print(result)

