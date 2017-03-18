from primes import get_large_prime
from random import randint

g, p = get_large_prime()[-2:]
print("g: ", g)
print("p: ", p)

a = randint(2000, 3000)
A = g**a % p
print("A:", A)

B = int(input("Enter B now: "))
s = B**a % p
print("RESULT:", s)

