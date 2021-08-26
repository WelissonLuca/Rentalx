
# Cadastro de carro

**RF**
_Deve ser possível cadastrar um novo carro_
_Deve ser possível listar todas as categorias_

<hr>

**RN**
_Não deve ser possível cadastrar um carro uma placa já existente_
_Não deve ser possível alterar a placa de um cara já cadastrado_
_O cara deve ser cadastrado por padrão com disponibilidade_
_O usuário responsável pelo cadastro deve ser um usuário administrador_

# Listagem de carros

**RF**
_Deve ser possível listar todos os carros disponíveis_
_Deve ser todos os carros disponíveis pelo nome da categoria_
_Deve ser todos os carros disponíveis pelo nome da marca
_Deve ser todos os carros disponíveis pelo nome do carro_

<hr>

**RN**
_O usuário não precisa esta logado no sistema_


# Cadastro de especificação no carro


**RF**
_Deve ser possível cadastrar uma especificação para um carro_
_Deve ser possível lista todas as especificações_
_Deve ser possível lista todos os carros_

<hr>

**RN**
_Não deve ser possível cadastrar uma especificação para um carro não cadastrado_
_Não deve ser possível cadastrar uma especificação já existente para o mesmo carro_
_O usuário responsável pelo cadastro deve ser um usuário administrador_



# Cadastro de imagens do carro

**RF**
_Deve ser possível cadastrar uma as imagens do carro_
_Deve ser possível listar todos os carros_

<hr>

**RNF**
_Utilizar o multer para upload do arquivo_

<hr>

**RN**
_O usuário deve poder cadastrar mais de uma imagem para o carro_
_O usuário responsável pelo cadastro deve ser um usuário administrador_

# Aluguel de carro

**RF**
_Deve ser possível cadastrar um aluguel_
_Deve ser possível listar todos os carros_

<hr>

**RNF**
_Utilizar o multer para upload do arquivo_

<hr>

**RN**
_O aluguel deve ter duração mínima de 24 horas_
_Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário_
_Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro_ 
