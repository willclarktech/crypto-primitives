import sys
from random import randint

def main(min_b=2000, max_b=3000):
	g = int(input("Enter g now: "))
	p = int(input("Enter p now: "))

	b = randint(2000, 3000)
	B = g**b % p
	print("B: ", B)

	A = int(input("Enter A now: "))
	s = A**b % p
	print("RESULT: ", s)

if __name__ == "__main__":
	min_b = int(sys.argv[1]) if len(sys.argv) >= 3 else 2000
	max_b = int(sys.argv[2]) if len(sys.argv) >= 3 else 2000
	main(min_b, max_b)

