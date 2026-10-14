# Projetct Background

## Ideia Inicial

- Criar um sistema "similar" ao Pokemon Go.
- Mais detalhadamente, vamos criar um jogo com as crianças da catequese para incentivá-las a conhecer um pouco sobre os Santos e Santas da Igreja Católica.
- Eles vão jogar esse jogo nos espaço das Igreja, onde vão ter QR Codes espalhados e em cada QR Code que eles scanearem vai abrir no sistema uma "tela" com informações sobre aquele Santo ou Santa.
- Nessa tela, terá informações sobre a vida do santo ou santa, uma imagem (ou um gif) do santo ou santa, um pedaço da sua história, ano de nascimento e falecimento, suas contribuições, curiosidades, etc.
- Cada Santo(a) scaneado vai ficar registrado em um "álbum" onde a criança poderá conferir depois.

### Telas da aplicação

- Tela Inicial:
  - Um campo para a criança colocar o nome dela.
  - Um botão para iniciar o jogo.

- Tela Principal (mapa):
  - Um indicador de quantos Santos(as) já foram encontrados
  - Um botão para abrir o Álbum.
  - Um botão para abrir a câmera.

- Tela da Câmera:
  - Um botão para iniciar a leitura do QR Code.
  
- Tela do Santo(a):
  - Nome do(a) Santo(a)
  - Imagem (ou gif) do(a) Santo(a)
  - Data de nascimento e falecimento.
  - Um breve texto sobre a vida do(a) Santo(a).
  - Curiosidades sobre o(a) Santo(a).
  - Um botão para voltar para a tela principal.
  - Um botão para ir para o Álbum.

- Tela do Álbum:
  - Um indicador de quantos Santos(as) já foram encontrados
  - Um botão para abrir a câmera.
  - Um grid/lista de todos os Santos(as) que já foram encontrados
  - Ao clicar em um Santo(a) da lista, vai abrir a tela do Santo(a) (do item anterior).

## Stack

- Pode ser um aplicativo android ou uma pagina web. (Preferência para pagina web)
- Framework: aberto a sugestões
- Um banco de dados simples para guardar caso a pessoa feche a pagina
- Que seja o mais simples possivel, sem login, sem cadastro.
