CREATE TABLE Produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255) NOT NULL,
    unidade_medida VARCHAR(50) NOT NULL,
    valor FLOAT NOT NULL,
    tamanho FLOAT NOT NULL
);

CREATE TABLE Armazem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    espaco_disponivel FLOAT NOT NULL
);

CREATE TABLE ProdXArmazem (
    idProduto INT NOT NULL,
    idArmazem INT NOT NULL,
    qtd FLOAT NOT NULL,

    PRIMARY KEY (idProduto, idArmazem),

    CONSTRAINT fk_produto
        FOREIGN KEY (idProduto)
        REFERENCES Produto(id),

    CONSTRAINT fk_armazem
        FOREIGN KEY (idArmazem)
        REFERENCES Armazem(id)
);


