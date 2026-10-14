# BRAIN - CatholicGO

## Visão Geral do Projeto
- Jogo estilo "Pokémon GO" para catequese infantil.
- Crianças exploram a igreja e leem QR Codes com a câmera.
- Cada QR Code desbloqueia informações e colecionáveis de Santos e Santas da Igreja Católica.
- Santos coletados são salvos em um Álbum.

## Requisitos & Telas
1. **Tela Inicial**: Entrada de nome da criança e botão para iniciar.
2. **Tela Principal**: Contador de santos encontrados, botão para Câmera e botão para Álbum.
3. **Tela da Câmera**: Leitor de QR Code integrado.
4. **Tela do Santo(a)**: Imagem/GIF, datas de nascimento/morte, biografia resumida, curiosidades, navegação.
5. **Tela do Álbum**: Grid/lista de santos desbloqueados e contador.

## Diretrizes Técnicas Aprovadas
- Plataforma: Web App (PWA responsivo para mobile).
- Stack: React + Vite + Tailwind CSS + TypeScript.
- Leitor QR: html5-qrcode.
- Autenticação: Nenhuma (sem cadastro/login).
- Persistência: localStorage para progresso e histórico.
- Execução/Deploy: Docker / WSL.

## Recursos de Gamificação e Utilidades
- **Álbum Pokédex**: silhuetas dos santos ainda não encontrados.
- **Animação de Descoberta**: efeito comemorativo/confetes ao registrar santo.
- **Painel do Catequista**: rota utilitária para gerar e imprimir QR Codes dos santos cadastrados.
- **Suporte Offline**: Service Worker/PWA para garantir funcionamento sem internet.

## Estrutura da Aplicação (v1)
- `src/types/saint.ts`: Interfaces de dados (Saint, PlayerProfile, ScreenState).
- `src/data/saints.ts`: Base oficial de 13 figuras ilustradas (Nossa Senhora Aparecida, São José, Santa Dulce, Santa Teresinha, Santo Antônio de Pádua, São Bento, São Francisco de Assis, São Carlo Acutis, Santos Arcanjos, São Padre Pio, São Pier Giorgio Frassati, São Vicente de Paulo, Venerável Guido Schäffer).
- `src/services/storage.ts`: Persistência em `localStorage` e resolução de QR Codes.
- `src/components/HomeScreen.tsx`: Inserção do nome da criança e continuação da jornada.
- `src/components/MainScreen.tsx`: Radar, contador e navegação rápida.
- `src/components/CameraScreen.tsx`: Leitor QR Code via câmera com modo simulação.
- `src/components/SaintDetailScreen.tsx`: Ficha do santo com confetes e curiosidades.
- `src/components/AlbumScreen.tsx`: Grade Pokédex com silhuetas e filtros.
- `src/components/CatechistPanel.tsx`: Gerador e impressão de cartões com QR Code.

## Identidade Visual & Paróquia
- Paróquia: Igreja Menino Deus - Rio de Janeiro - Centro.
- Brasão oficial: salvo em `public/logo.png`.
- **Tema Visual Unificado (100% das telas)**:
  - Fundo geral: Papel kraft artesanal (`#E5CDB2`).
  - Cards e caixas: Pergaminho limpo/creme (`#FFFDF7` e `#F7ECE0`).
  - Molduras e bordas: Dourado envelhecido e caramelo (`#CFAF88` e `#DEC9B0`).
  - Tipografia: Marrom profundo legível (`#4A2E16`) e títulos em caramelo 3D (`#A66E28`).
  - Botões de ação e celebração: Dourado vivo (`from-amber-400 to-yellow-400`).
  - Botões secundários: Madeira/artesanato suave (`#EEDCC7` com borda `#CBB08E`).

## Como Cadastrar Perfil de Santos
1. **Pela Interface Web**:
   - Acesse o **Painel do Catequista** > clique em **"Novo Santo"**.
   - Preencha os campos (Nome, Título, Festa, Nascimento, Falecimento, Biografia, Curiosidades).
   - O santo é salvo no `localStorage`, ganha QR Code automático e entra no Álbum.
2. **Direto no Código**:
   - Edite o arquivo `src/data/saints.ts`.
   - Adicione um novo objeto seguindo a interface `Saint` em `src/types/saint.ts`.

## Padrão Visual e Pasta de Imagens dos Santos
- **Pasta de imagens**: `imagesSaints/` (vinculada a `public/imagesSaints/`).
- As imagens salvas na pasta podem ser referenciadas como `/imagesSaints/<arquivo.ext>`.
- Exemplo implementado: `/imagesSaints/SaoJose.jpeg`.
- **Estilo Artístico de Captura**:
  - Moldura kraft com doodles infantis (`#E5CDB2`).
  - Card central bege com efeito 3D em tipografia dourada/caramelo.
  - Ilustração com auréola luminosa.
  - 4 seções lúdicas em cards brancos (ícones individuais sem doodles externos):
    1. ❓ Quem sou eu?
    2. ⭐ Curiosidades
    3. 📅 Datas Especiais
    4. ✝ O que eu ensino
  - Botão de ação: "COLETADO! SALVAR NO ÁLBUM! 📦" e navegação amadeirada MAPA / ÁLBUM.

## Autenticação da Área da Catequista
- Tela de bloqueio antes de acessar o Painel do Catequista.
- **Login**: `admin`
- **Senha**: `igrejameninodeus`
- Sessão mantida em `sessionStorage` com opção de "Sair" (Logout).


## Comandos Úteis
- Iniciar em desenvolvimento: `npm run dev`
- Compilar para produção: `npm run build`
- Executar via Docker: `docker compose up --build -d`

## Repositório Oficial no GitHub
- URL: `https://github.com/ThiagoPiovesan/CatolicoGO.git`
- Branch principal: `main`

## Publicação Gratuita (Sem Custos & Com HTTPS)
Como a aplicação é 100% frontend (sem backend) e precisa de HTTPS para abrir a câmera no celular:
1. **Cloudflare Pages / Workers**:
   - URL de Produção: `https://catolicogo.thiagoppiovesan.workers.dev`
   - Framework preset: `Vite`.
   - Build command: `npm run build`.
   - Output directory: `dist`.
   - Roteamento SPA configurado nativamente no `wrangler.json` (`not_found_handling: single-page-application`).
2. **Vercel**:
   - Conectar com repositório GitHub ou rodar `npx vercel`.
   - Arquivo de rota já configurado: `vercel.json`.





