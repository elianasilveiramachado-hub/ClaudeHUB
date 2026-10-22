# Campanha "Qual cheiro te leva pra casa?" (Scenty)

**Objetivo:** aumentar a interação no Instagram e levar seguidores para o **Grupo VIP do WhatsApp** da loja.
**Formato:** concurso cultural. Vence a resposta mais criativa, e não há sorteio.
**Duração sugerida:** 10 dias de inscrições + 2 dias para o resultado.
**Prêmio:** {{premio.nome}} ({{premio.itens|virgulas}}). Todos do grupo ganham um cupom de {{cupom.desconto}}.
**Período:** de {{datas.inicio}} a {{datas.fim}}, resultado em {{datas.resultado}}.
**Aprovação final (artes, legenda e regulamento):** {{aprovacao.responsavel}}

> **Por que concurso cultural e não sorteio?** No Brasil, sorteio com prêmio exige autorização prévia do Ministério da Fazenda (SPA/MF, Lei 5.768/71). O concurso cultural é dispensado dessa autorização quando o vencedor é escolhido por critério de criatividade e não há compra obrigatória. Antes de publicar, vale confirmar com o contador ou o jurídico.

## Valores da campanha

Todos os valores abaixo vêm de `campanha.config.json`. Onde aparecer **⚠️ [DEFINIR: ...]**, o valor ainda não foi decidido.

| Valor | Atual |
|---|---|
| @ do Instagram | {{marca.instagram}} |
| Início das inscrições | {{datas.inicio}} |
| Fim das inscrições | {{datas.fim}} |
| Resultado | {{datas.resultado}} |
| Itens do kit | {{premio.itens|virgulas}} |
| Cupom | {{cupom.codigo}} |
| Valor do cupom | {{cupom.desconto}} |
| Validade do cupom | {{cupom.validade}} |
| Plataforma da loja | {{loja.plataforma}} |
| CNPJ | {{marca.cnpj}} |
| Link de convite do grupo | {{grupo.linkConvite}} |
| Aprovador | {{aprovacao.responsavel}} |

**Como alterar:** edite `campanha.config.json` e rode `NODE_PATH=$(npm root -g) node gerar.mjs` nesta pasta. O script regenera este arquivo, o `ATIVIDADES-VICTOR.md` e os PNGs, e lista o que ainda falta definir. Com `--final`, ele se recusa a gerar enquanto houver pendência. Os textos fixos dos documentos ficam em `modelos/`.

---

## 1. Artes (pasta `artes/`)

| Arquivo | Formato | Uso |
|---|---|---|
| `feed-1-chamada.png` | 1080×1350 | 1ª imagem do carrossel **e a peça do anúncio** |
| `feed-2-como-participar.png` | 1080×1350 | 2ª imagem do carrossel |
| `feed-3-premio.png` | 1080×1350 | 3ª imagem do carrossel |
| `story-1-grupo-vip.png` | 1080×1920 | Stories (colar o sticker de link do grupo na área tracejada) |
| `story-2-reposicao.png` | 1080×1920 | Stories para produtos esgotados / encomenda |

Para editar um texto fixo, altere o HTML em `artes/src/` e rode `NODE_PATH=$(npm root -g) node gerar.mjs`. Datas, @, itens do kit e valor do cupom vêm de `campanha.config.json`; valores pendentes saem nas artes como uma etiqueta amarela "DEFINIR", para não serem publicados por engano.

---

## 2. Legenda do post (carrossel)

```
🌿 CONCURSO CULTURAL SCENTY 🌿

Tem cheiro que é abraço. Cheiro de bolo saindo do forno, de roupa limpa no varal, da casa da vó…

Conta pra gente: QUAL CHEIRO TE LEVA PRA CASA?

A resposta mais criativa ganha um Kit Aromático Scenty completo 🎁

Como participar:
1️⃣ Siga {{marca.instagram}}
2️⃣ Curta e salve este post
3️⃣ Comente sua resposta e marque 2 amigos
4️⃣ Entre no nosso Grupo VIP do WhatsApp (link na bio). O resultado será anunciado lá!

📅 Participações até {{datas.fim}} às 23h59
🏆 Resultado em {{datas.resultado}}, no grupo e nos stories

Quem entra no grupo VIP também ganha cupom exclusivo, lançamentos antes de todo mundo e aviso de reposição dos aromas esgotados.

Concurso cultural sem compra obrigatória e sem vínculo com o Instagram/Meta. Regulamento completo no link da bio.

#scenty #marketingolfativo #aromatizacao #difusordeambiente #homespray #casaperfumada #concursocultural
```

## 3. Mensagem de boas-vindas do grupo (fixar no WhatsApp)

```
Seja bem-vindo(a) ao Grupo VIP Scenty! 🌿

✅ Você está participando do concurso "Qual cheiro te leva pra casa?". Lembre-se de comentar no post do Instagram.
🎟️ Seu cupom exclusivo: {{cupom.codigo}} ({{cupom.desconto}} off no site, válido até {{cupom.validade}})
🔔 Aqui avisamos primeiro: lançamentos, reposição de aromas esgotados e ofertas relâmpago.

Regras do grupo: só a Scenty envia mensagens (grupo de avisos), sem spam. 💚
```

> Dica: configure o grupo como **"somente admins enviam mensagens"** ou use uma **Comunidade** do WhatsApp para não virar bagunça.

## 4. Regulamento resumido (link da bio)

1. **Promotora:** {{marca.razaoSocial}}, CNPJ {{marca.cnpj}}.
2. **Período:** de {{datas.inicio}} a {{datas.fim}}, até 23h59 (horário de Brasília).
3. **Quem pode participar:** pessoas físicas maiores de 18 anos residentes no Brasil.
4. **Como participar:** seguir {{marca.instagram}}, comentar no post oficial respondendo "Qual cheiro te leva pra casa?" e estar no Grupo VIP do WhatsApp na data do resultado. Cada pessoa concorre com uma única resposta.
5. **Critério:** criatividade, originalidade e adequação ao tema, avaliados por comissão da Scenty. **Não há sorteio nem compra obrigatória.**
6. **Prêmio:** 1 {{premio.nome}}, composto por: {{premio.itens|virgulas}}. O prêmio não pode ser trocado por dinheiro.
7. **Resultado:** em {{datas.resultado}}, no Grupo VIP e nos stories. O vencedor tem 7 dias para responder pelo direct. Se não responder, a próxima resposta mais bem avaliada é escolhida.
8. **Entrega:** frete por conta da Scenty, para endereço no Brasil.
9. **Desclassificação:** perfis falsos, conteúdo ofensivo e respostas copiadas.
10. Esta promoção não é patrocinada, administrada ou associada ao Instagram/Meta nem ao WhatsApp.
11. **Dados (LGPD):** os dados serão usados só para contato e entrega do prêmio.

---

## 5. Impulsionamento (Instagram / Meta)

**Peça:** o carrossel inteiro ou só `feed-1-chamada.png`.

Passo a passo no app do Instagram: abra o post → **Turbinar** e configure:

| Campo | Configuração |
|---|---|
| Objetivo / destino | **Mais visitas ao site**, colando o **link do convite do grupo** ({{grupo.linkConvite}}) |
| Botão | "Saiba mais" ou "Inscreva-se" |
| Público | Personalizado: cidade/região onde a loja atende, 25–55 anos, interesses *decoração, casa, aromaterapia, perfumes, bem-estar, arquitetura de interiores*. |
| Público 2 (opcional) | "Pessoas que interagiram com seu perfil" (remarketing) |
| Orçamento | Sugestão: R$ 20–30/dia por 7 dias (R$ 140–210 no total) |
| Duração | Começar 1 dia depois da publicação orgânica e terminar 2 dias antes do resultado |

**Alternativa:** objetivo **"Mais mensagens → WhatsApp"**, que abre conversa com o número da loja. Nesse caso, a resposta automática do WhatsApp Business deve enviar o link do grupo.

**O que medir:** custo por clique no link, número de pessoas que entraram no grupo (veja no WhatsApp), comentários no post e novos seguidores.

## 6. Cronograma sugerido

| Dia | Ação |
|---|---|
| D-2 | Criar o grupo/comunidade, o link de convite, o cupom e o regulamento no link da bio. Habilitar venda de produtos sem estoque. |
| D0 | Publicar o carrossel (feed-1/2/3) + `story-1` com sticker de link |
| D1 | Iniciar o impulsionamento |
| D3, D5, D7 | Repostar `story-1`; repostar comentários bonitos nos stories |
| D4 | Publicar `story-2-reposicao` (produtos esgotados → encomenda/grupo) |
| D9 | Story "últimas 24h" |
| D10 | Encerrar inscrições (23h59) e encerrar o anúncio |
| D12 | Anunciar o vencedor no grupo + stories; enviar o prêmio |

---

## 7. Produtos sem estoque habilitados

**Objetivo:** produtos esgotados continuam aparecendo no site e podem ser comprados como **encomenda/pré-venda** (ou recebem o botão "avise-me"), enquanto o grupo do WhatsApp avisa a reposição.

**Plataforma da loja:** {{loja.plataforma}}

Como fazer em cada plataforma:

- **Nuvemshop:** *Produtos → editar produto → Estoque*: marque **"Estoque infinito"**, ou deixe o estoque zerado com *Configurações → Opções de checkout → "Permitir compras de produtos sem estoque"*. Na descrição, informe o prazo: "Produto sob encomenda, envio em até X dias".
- **Shopify:** *Produtos → produto → Inventário*: marque **"Continuar vendendo quando estiver sem estoque"**. Para vários produtos de uma vez: *Produtos → selecionar todos → Editar em massa → coluna "Continuar vendendo"*.
- **Tray:** *Produtos → editar → Estoque*: ative **"Vender produto sem estoque"** e preencha a "Disponibilidade" (ex.: 15 dias).
- **Loja Integrada:** *Catálogo → Produtos → editar → Estoque*: em "Situação sem estoque", selecione **"Disponível para encomenda"** e informe os dias.
- **WooCommerce:** *Produtos → editar → Inventário → "Permitir encomendas?"*: selecione **"Permitir, mas notificar o cliente"**.

> Sempre informe o **prazo de envio** na página do produto. Pelo Código de Defesa do Consumidor, a loja precisa cumprir o prazo prometido.
