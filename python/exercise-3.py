N = int(input("Enter a number N: "))

a = 0
b = 1

counter = 0

while counter < N:
    print(a)
    next = a + b
    a = b
    b = next
    counter += 1

