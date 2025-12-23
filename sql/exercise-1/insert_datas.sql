INSERT INTO Produto (descricao, unidade_medida, valor, tamanho) VALUES
('Cimento', 'kg', 40.00, 0.50),
('Areia', 'm3', 120.00, 1.20),
('Brita', 'm3', 150.00, 1.50),
('Tijolo', 'un', 1.20, 0.02);

INSERT INTO Armazem (nome, espaco_disponivel) VALUES
('Armazem Central', 500),
('Armazem Norte', 300),
('Armazem Sul', 200);
INSERT INTO ProdXArmazem (idProduto, idArmazem, qtd) VALUES
-- Armazem Central
(1, 1, 100),   -- Cimento → 100 × 0.5 = 50
(2, 1, 50),    -- Areia → 50 × 1.2 = 60
(4, 1, 500),   -- Tijolo → 500 × 0.02 = 10
-- Armazem Norte
(3, 2, 30),    -- Brita → 30 × 1.5 = 45
(4, 2, 300),   -- Tijolo → 300 × 0.02 = 6
-- Armazem Sul
(1, 3, 40);    -- Cimento → 40 × 0.5 = 20