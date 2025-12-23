CREATE PROCEDURE estoque.top5_warehouses_by_product (
    IN p_product_id INT
)
BEGIN
    SELECT
        a.id,
        a.nome,
        px.qtd
    FROM ProdXArmazem px
    JOIN Armazem a ON a.id = px.idArmazem
    WHERE px.idProduto = p_product_id
    ORDER BY px.qtd DESC
    LIMIT 5;
END;


CALL estoque.top5_warehouses_by_product(1);
