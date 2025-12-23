array1 = [5, 3, 9, 1]
array2 = [8, 2, 7, 14]

array = []

for number in array1:
    array.append(number)

for number in array2:
    array.append(number)

n = len(array)

for i in range(n):
    for j in range(0, n - 1):
        if array[j] > array[j + 1]:
            temp = array[j]
            array[j] = array[j + 1]
            array[j + 1] = temp

print("Ordered array:", array)
