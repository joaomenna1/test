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
