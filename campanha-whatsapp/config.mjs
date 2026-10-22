// Carrega campanha.config.json e preenche modelos (HTML das artes e Markdown dos documentos).
// Sintaxe nos modelos: {{caminho}} ou {{caminho|filtro}}, ex.: {{datas.fim}}, {{premio.itens|lista}}.
// Valor null vira um marcador "DEFINIR: ..." bem visível.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const raiz = path.dirname(fileURLToPath(import.meta.url));

// Descrição de cada valor, usada nos marcadores e no relatório de pendências.
export const rotulos = {
  "marca.nome": "nome da marca",
  "marca.razaoSocial": "razão social",
  "marca.instagram": "@ do Instagram",
  "marca.cnpj": "CNPJ",
  "datas.inicio": "data de início",
  "datas.fim": "data final das inscrições",
  "datas.resultado": "data do resultado",
  "premio.nome": "nome do prêmio",
  "premio.itens": "itens do kit",
  "cupom.codigo": "código do cupom",
  "cupom.desconto": "valor do cupom",
  "cupom.validade": "validade do cupom",
  "loja.plataforma": "plataforma da loja",
  "grupo.linkConvite": "link de convite do grupo",
  "aprovacao.responsavel": "aprovador",
};

export function carregarConfig() {
  return JSON.parse(readFileSync(path.join(raiz, "campanha.config.json"), "utf8"));
}

function ler(config, caminho) {
  return caminho.split(".").reduce((o, k) => (o == null ? undefined : o[k]), config);
}

const pendente = (v) => v == null || v === "" || (Array.isArray(v) && v.length === 0);

export function pendencias(config) {
  return Object.keys(rotulos).filter((c) => pendente(ler(config, c)));
}

const escapar = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const formatos = {
  html: {
    texto: escapar,
    marcador: (r) => `<mark class="definir">DEFINIR: ${escapar(r)}</mark>`,
    lista: (itens) => itens.map((i) => `<div class="item">${escapar(i)}</div>`).join("\n    "),
    listaPendente: (m) => `<div class="item">${m}</div>`,
  },
  md: {
    texto: String,
    marcador: (r) => `**⚠️ [DEFINIR: ${r}]**`,
    lista: (itens) => itens.map((i) => `- ${i}`).join("\n"),
    listaPendente: (m) => `- ${m}`,
  },
};

// formato: "html" ou "md".
export function preencher(modelo, config, formato) {
  const f = formatos[formato];
  return modelo.replace(/\{\{\s*([\w.]+)\s*(?:\|\s*(\w+)\s*)?\}\}/g, (_, caminho, filtro) => {
    if (!(caminho in rotulos)) throw new Error(`Valor desconhecido no modelo: {{${caminho}}}`);
    const v = ler(config, caminho);
    if (pendente(v)) {
      const m = f.marcador(rotulos[caminho]);
      return filtro === "lista" ? f.listaPendente(m) : m;
    }
    if (filtro === "lista") return f.lista([].concat(v));
    if (filtro === "virgulas") return f.texto([].concat(v).join(", "));
    if (filtro) throw new Error(`Filtro desconhecido: ${filtro}`);
    return f.texto(Array.isArray(v) ? v.join(", ") : v);
  });
}

export function avisarPendencias(config) {
  const p = pendencias(config);
  if (p.length) {
    console.warn(`\n⚠️  ${p.length} valor(es) ainda sem definição em campanha.config.json:`);
    for (const c of p) console.warn(`   - ${c} (${rotulos[c]})`);
    console.warn("   Eles aparecem como DEFINIR nas artes e nos documentos.\n");
  }
  return p;
}
