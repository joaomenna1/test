def is_prime(number):
    if number <= 1:
        return False

    divisor = 2
    while divisor * divisor <= number:
        if number % divisor == 0:
            return False
        divisor += 1

    return True


N = int(input("Enter a number N: "))

count = 0
number = 2
result = 1

while count < N:
    if is_prime(number):
        result = result * number
        count += 1
    number += 1

print("Product of the first", N, "prime numbers:", result)
