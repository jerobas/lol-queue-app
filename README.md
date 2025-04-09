# Queemo - Beta 🎮

Queemo é um aplicativo desktop criado com Electron e React que integra com o client do League of Legends para automatizar o processo de entrada na fila e criar um canal de voz privado para o seu time — tudo de forma prática, rápida e invisível. Lembre-se, o APP está em **BETA** ainda, podem e vão exister bugs. Tenha calma porque somos CLTs ⚒️. 

## BAN ⚠️

Outros projetos como o [Porofessor](https://porofessor.gg/) e [Blitz](https://blitz.gg/lol) usam dessa LockFile para realizarem algumas tarefas. Não estamos alterando nenhum dado interno do game, apenas consumindo o básico para aceitar as filas. Não, não queremos roubar seus dados seu **PRATINHA**! Está com dúvida? Basta olhar o código, ele é aberto.

## Instalação 

Baixe a última release do projeto aqui ⬇️

[![Latest Release](https://img.shields.io/github/v/release/jerobas/queemo)](https://github.com/jerobas/queemo/releases)

O Windows vai reclamar pois nosso APP não tem certificado assinado, pois custa dinheiro e esse projeto é um hobbie. Não, não usamos nem certificados auto-assinado também!

## Modo de uso 📃

Abra seu client do League of Legends e em seguida abra o Queemo, pronto isso deve ser o suficiente 😁

## Reporte

Se você encontrar algum BUG, por favor reporte ele no repositório. Não apenas reclame, lembre-se o projeto está começando 🥲

## Como ele faz isso❓

Quando qualquer player faz login em sua conta, é gerado um arquivo Lockfile contendo dados do usuário dentro da pasta do League of Legends. Isso permite a criação de uma API interna com os dados do jogador que esta logado. Com isso o Queemo consegue detectar que uma partida foi encontrada e entao aceitá-la de forma automática.

## VOIP 🎙️

Sim, o Queemo resolve um problema crítico do game, que é a falta de VOIP entre seus companheiros de time. Quando uma partida começa, o Queemo cria uma sala de voz e os player do mesmo time poderão se comunicar. Ele não é integrado com o discord e não precisa de nenhum outro app externo. Toda a lógia é baseada em WebRTC e se comunica com uma EC2 AWS nossa. Quando o jogo acaba a sala é desfeita e os jogadores são expulsos automaticamente.


## Tecnologias Utilizadas ⚙️

- Electron
- React + Vite
- WebSocket
- WebRTC

## Contribuição 🤝 

Sinta-se livre para contribuir! Clone o projeto, crie um branch e envie seu PR. A comunidade ajuda a comunidade

## Mas quem somos nós 🤔

Um grupo de amigos que joga lol e programa. 
- [Flávio Filho](https://www.linkedin.com/in/flaviozno/) - Desenvolvedor Full Stack
- [João Vitor](https://www.linkedin.com/in/jaonolo/) - Desenvolvedor Full Stack
- [Eduardo Borges](https://www.linkedin.com/in/eduardo-borges-anim/) - Animador 2D