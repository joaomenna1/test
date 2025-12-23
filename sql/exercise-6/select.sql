SELECT
    a.id,
    a.nome,
    ROUND(SUM(px.qtd * p.valor), 2) AS valor_total
FROM Armazem a
JOIN ProdXArmazem px ON px.idArmazem = a.id
JOIN Produto p ON p.id = px.idProduto
GROUP BY a.id, a.nome
ORDER BY valor_total DESC;
