# 📝 Desafio tecnico

Este repositório contém soluções para uma série de exercícios de lógica e algoritmos usando **Python**.
O objetivo é praticar **manipulação de arrays, strings, matrizes, sequências numéricas e números primos**, sem utilizar funções prontas de ordenação ou pesquisa.

---

## 📂 Estrutura do Projeto

```
.
├── exercicio1.py   # Junção de dois arrays em ordem crescente
├── exercicio2.py   # Encontrar posição de uma substring
├── exercicio3.py   # Sequência de Fibonacci
├── exercicio4.py   # Maior número de uma matriz
├── exercicio5.py   # Multiplicação de N números primos consecutivos
└── README.md       # Este arquivo
```

---

## 📝 Exercícios

### 1️⃣ Junção de dois arrays em ordem crescente

**Descrição:**
Dado dois arrays de números inteiros, criar um terceiro array com a junção dos dois anteriores em **ordem crescente**.

**Exemplo de código (`exercicio1.py`):**

```python
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

```

---

### 2️⃣ Encontrar posição de uma substring

**Descrição:**
Dadas duas entradas, uma string `texto` e uma `busca`, encontrar a posição da substring no texto.
Se não encontrada, retornar `-1`.

**Exemplo de código (`exercicio2.py`):**

```python
text = "programacao"
search = "ama"

tam_text = len(text)
tam_search = len(search)

position = -1

for i in range(tam_text - tam_search + 1):
    find = True

    for j in range(tam_search):
        if text[i + j] != search[j]:
            find = False
            break

    if find:
        position = i
        break

print(position)

```

---

### 3️⃣ Sequência de Fibonacci

**Descrição:**
Dado um número inteiro `N`, gerar os **N primeiros números da sequência de Fibonacci**.

**Exemplo de código (`exercicio3.py`):**

```python
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


```

---

### 4️⃣ Maior número de uma matriz

**Descrição:**
Receber uma matriz de tamanho `A x B` e encontrar o **maior número** presente nela.

**Exemplo de código (`exercicio4.py`):**

```python
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

```

---

### 5️⃣ Multiplicação de N números primos consecutivos

**Descrição:**
Dado um número `N`, calcular o **produto dos N primeiros números primos consecutivos**.

**Exemplo de código (`exercicio5.py`):**

```python
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

```

---

## 🚀 Como usar

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Execute o script Python correspondente:

```bash
python exercicio1.py
python exercicio2.py
python exercicio3.py
python exercicio4.py
python exercicio5.py
```


