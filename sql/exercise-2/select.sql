SELECT
    a.nome,
    ROUND(COALESCE(SUM(px.qtd * p.tamanho), 0), 2) AS total_ocupado
FROM Armazem a
LEFT JOIN ProdXArmazem px ON px.idArmazem = a.id
LEFT JOIN Produto p ON p.id = px.idProduto
GROUP BY a.nome;
