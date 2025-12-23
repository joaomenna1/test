SELECT
    p.id,
    p.descricao
FROM Produto p
LEFT JOIN ProdXArmazem px ON px.idProduto = p.id
WHERE px.idProduto IS NULL;


INSERT INTO Produto (descricao, unidade_medida, valor, tamanho)
VALUES ('Cal', 'kg', 30.00, 0.40);
