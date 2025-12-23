SELECT
    p.id,
    p.descricao,
    COUNT(DISTINCT px.idArmazem) AS quantidade_armazens
FROM Produto p
JOIN ProdXArmazem px ON px.idProduto = p.id
GROUP BY p.id, p.descricao
HAVING quantidade_armazens = (
    SELECT MAX(total_armazens)
    FROM (
        SELECT COUNT(DISTINCT idArmazem) AS total_armazens
        FROM ProdXArmazem
        GROUP BY idProduto
    ) t
);
