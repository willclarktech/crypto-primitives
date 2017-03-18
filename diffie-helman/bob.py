from random import randint

g = int(input("Enter g now: "))
p = int(input("Enter p now: "))

b = randint(2000, 3000)
B = g**b % p
print("B: ", B)

A = int(input("Enter A now: "))
s = A**b % p
print("RESULT: ", s)

