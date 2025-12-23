def largest_number(matrix, A, B):
    largest = matrix[0][0]

    for i in range(A):
        for j in range(B):
            if matrix[i][j] > largest:
                largest = matrix[i][j]

    return largest


# Example usage
matrix = [
    [3, 7, 1],
    [9, 2, 8],
    [4, 6, 5]
]

A = 3  # rows
B = 3  # columns

result = largest_number(matrix, A, B)
print("Largest number in the matrix:", result)
