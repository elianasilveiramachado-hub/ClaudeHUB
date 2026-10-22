# Necessidade de rótulos (Scenty)

Calcula quantos rótulos precisam ser impressos, por **canal** (B2B / B2C), **status de notificação**, **volume** e **medida do rótulo**, a partir da planilha **Controle de Rótulos.xlsx**.

| Arquivo | O que é |
|---|---|
| `Controle de Rótulos.xlsx` | Planilha de origem (abas `B2C`, `B2B` e `B2B - Volumes`). |
| `Fragrancias_Rotulos.xlsx` | Planilha gerada: todas as fragrâncias numa aba só, com filtros, e um resumo com fórmulas. |
| `recalcular_rotulos.py` | Script que gera a `Fragrancias_Rotulos.xlsx` e mostra os totais no terminal. |
| `teste_recalcular_rotulos.py` | Teste que confere se o script reproduz os números da análise de 15/10/2026. |

## Como recalcular

Quando os pedidos ou os status mudarem, atualize a `Controle de Rótulos.xlsx` e rode:

```bash
pip install openpyxl
python rotulos/recalcular_rotulos.py "rotulos/Controle de Rótulos.xlsx" --manter-b2c rotulos/Fragrancias_Rotulos.xlsx
```

- O script sobrescreve `rotulos/Fragrancias_Rotulos.xlsx` (use `-s outro.xlsx` para salvar em outro arquivo).
- `--manter-b2c` reaproveita as quantidades do B2C que você já preencheu na planilha anterior. Sem essa opção, a coluna amarela do B2C volta vazia.
- No terminal aparecem as tabelas por canal, volume e medida, mais os três cenários (só "Notificar", "Notificar" + "Notificado", todos).
- Avisos (por exemplo, quando a soma dos volumes de um item não bate com o total da linha) saem no final, marcados com `AVISO:`.

Para conferir o script depois de alguma mudança: `python rotulos/teste_recalcular_rotulos.py`.

## O que a planilha gerada traz

**Aba "Todas as Fragrâncias"**: uma linha por item × volume (72 do B2C e 86 do B2B na versão atual), com filtro em todas as colunas. Colunas: canal, coleção/grupo, fragrância/cliente, nome na base de pedidos, concentração, volume, medida do rótulo, status, nº da notificação, comercialização ("Somente B2C", "Somente B2B", "Somente B2B (identidade de cliente)", "B2C e B2B"), pedidos no período, quantidade de rótulos, composição, link da arte e observação. Abaixo da tabela, um total que soma só as linhas filtradas.

**Aba "Resumo"**: fórmulas sobre a aba principal, com rótulos por canal × status, por volume × status, por medida × status, os cenários de seleção e o número de SKUs por canal. Se você editar uma quantidade ou um status direto na planilha, o resumo se atualiza.

## Regras do cálculo

- **Quantidades B2B** vêm da coluna de volumes da aba `B2B - Volumes` (texto como `400ml: 6 un | 1000ml: 5 un`). Itens sem pedido aparecem com quantidade 0.
- **B2C** não tem quantidade na origem. A coluna "Qtd. rótulos" fica amarela para preencher com a previsão.
- **Medida do rótulo** (aba B2B): 100 ml = 13 × 5 cm; 400 e 500 ml = 22 × 8 cm; 1000 ml = 28 × 10,5 cm. Os demais tamanhos, e todo o B2C, ficam "A definir".
- **Concentração** é padronizada, porque a origem escreve a mesma coisa de jeitos diferentes ("Ultra Concentrado", "ultra concentrada").
- **Comercialização**: uma fragrância é "B2C e B2B" quando o nome aparece nas duas abas (sem acento e sem o prefixo "ID"). "Doce Figo" do B2B é tratada como "Flor de Figo" do B2C, correspondência que a própria planilha marca como provável.

## Resultado da análise de 15/10/2026

| Status | Rótulos B2B | 100 ml | 150 ml | 250 ml | 400 ml | 500 ml | 1000 ml |
|---|---|---|---|---|---|---|---|
| Notificar | **147** | 57 | 4 | 12 | 32 | 21 | 21 |
| Notificado | **50** | 31 | – | 8 | 4 | 3 | 4 |
| Não notificar | **14** | – | – | – | 3 | 9 | 2 |
| **Total** | **211** | 88 | 4 | 20 | 39 | 33 | 27 |

Por medida: 88 de 13 × 5 cm, 72 de 22 × 8 cm, 27 de 28 × 10,5 cm e 24 sem medida definida (150 e 250 ml).

**Pendências que estavam abertas:**
- Id Dubai ultra 100 ml: 8 un na aba `B2B`, 10 na `B2B - Volumes` (o cálculo usa 10).
- ID Novotel concentrada: 100 ml × 1 na aba `B2B`, 400 ml × 6 na `B2B - Volumes` (o cálculo usa 400 ml × 6).
- ID Herbal Fresh (34 un) e Doce Figo: correspondências com a base de pedidos a confirmar.
- Flor de Madeira e Silver: sem concentração informada.
- 150 ml e 250 ml: medida do rótulo não definida.
