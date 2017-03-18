from random import randint

def check_prime(n, primes):
	isPrime = True
	for prime in primes:
		if n % prime == 0:
			isPrime = False
	return isPrime

def get_next_prime(primes):
	n = primes[-1] + 1
	found = False
	while found == False:
		if check_prime(n, primes):
			found = True
		else:
			n+=1
	return n

def find_primes(primes, n):
	if n == 0:
		return primes
	else:
		next_prime = get_next_prime(primes)
		primes.append(next_prime)
		return find_primes(primes, n-1)

def find_primes_in_range(i=100, j=300):
	n = randint(i, j)
	return find_primes([2], n)

def get_large_prime():
	return find_primes_in_range()[-1]

if __name__ == "__main__":
	print(get_large_prime())

