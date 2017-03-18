from random import randint

g, p = [int(input("Enter g now: ")), int(input("Enter p now: "))]
print(g, p)

b = randint(2000, 3000)
B = g**b % p
print("B: ", B)

A = int(input("Enter A now: "))
s = A**b % p
print("RESULT: ", s)

