# Leque de Vagas

Projeto de referência do curso **Introdução ao Next.js** (NickDev). Um mural de
vagas de tecnologia para quem está migrando de carreira.

Este repositório está **no estado esperado depois dos desafios das aulas 01 a
04**. Ele existe para você comparar com o seu: abrir um arquivo, ver como ficou
aqui e entender por que. Não é para clonar e entregar — o que vale nota é o
seu, com os seus dados e as suas decisões.

## Rodar

```bash
npm install
npm run dev
```

Abre em <http://localhost:3000>. Precisa de Node 20 ou mais novo.

O `npm run build` e o `npm run dev` **buscam os dados pela rede**, do próprio
repositório no GitHub (veja `lib/api.ts`). Sem internet, o build não passa — e
isso é sobre o projeto, não sobre a sua máquina.

## Quanto tempo uma vaga nova leva para aparecer

**No pior caso, pouco mais de um minuto depois do push.** O `revalidate` das
vagas é de 60 segundos, então a página serve a cópia guardada por até um minuto
antes de buscar de novo. Some a isso o tempo que o `raw.githubusercontent.com`
leva para servir o arquivo novo. As empresas usam `revalidate: 3600` — uma hora
—, porque empresa muda muito menos que vaga.

## O que tem aqui, aula por aula

**Aula 01 — fundamentos.** O componente como peça reutilizável, JSX, rota por
pasta e CSS comum. `app/layout.tsx`, `components/Cabecalho.tsx`,
`app/page.tsx`, `app/sobre/page.tsx`, `app/globals.css`.

**Aula 02 — roteamento com App Router.** Rota dinâmica com `[id]` e `params`
que chega como Promise. Os arquivos cujo nome já é a instrução: `layout`
aninhado em `app/vagas/`, `loading`, `error` e `not-found` — e o `not-found` da
raiz, que é outro. Route group `(institucional)`, que dá layout a `/termos` e
`/privacidade` sem entrar na URL. Navegação com `Link`, e `usePathname` no
`MenuLink` para o item ativo.

**Aula 03 — a página que responde.** A fronteira entre servidor e navegador, e
`useState`. As páginas continuam de servidor; só os pedaços que precisam de
memória levam `"use client"`:

| Arquivo | Que forma de estado ensina |
| --- | --- |
| `components/DescricaoDaVaga.tsx` | booleano, com estado derivado do texto |
| `components/BotaoCopiarLink.tsx` | estado + API que só existe no navegador |
| `components/AbasDaEmpresa.tsx` | estado que é **texto**, não booleano |
| `components/FormularioDeCandidatura.tsx` | campo controlado, lista e conta de "pode enviar" |
| `components/MuralDeVagas.tsx` | estado no pai comum, filtro derivado |
| `components/Filtros.tsx` | **nenhum** — recebe e avisa |

Conte de novo: `app/vagas/page.tsx`, `app/vagas/[id]/page.tsx` e
`app/empresas/[slug]/page.tsx`, e nenhuma delas leva `"use client"`.

**Aula 04 — o dado sai de dentro do projeto.** Os arrays de `data/*.ts`
viraram `dados/*.json` buscados por rede, e os tipos ficaram sozinhos em
`lib/tipos.ts`. O que isso trouxe:

| Onde | O que ensina |
| --- | --- |
| `lib/api.ts` | o único arquivo com `fetch` e com a URL; `revalidate`, `tags` e a conferência de `resposta.ok` |
| `app/vagas/[id]/page.tsx` | `generateStaticParams` — uma página por vaga, gerada no build |
| `app/empresas/[slug]/page.tsx` | `generateMetadata` por empresa, e `Promise.all` para não esperar duas vezes |
| `app/empresas/page.tsx` | `export const metadata` fixo, porque rota sem `[param]` não precisa de função |
| `app/vagas/page.tsx` | **deixou de ser `async`**: quem busca são os filhos, cada um no seu `<Suspense>` |
| `components/NumerosDoCatalogo.tsx` | o `await` mora no componente que espera, não na página |
| `app/vagas/[id]/loading.tsx` | esqueleto do tamanho do conteúdo real |
| `app/vagas/[id]/error.tsx` | rede que caiu — em português, com botão de tentar de novo |

Na frente 4, `MuralDeVagas` continua guardando busca e área, e `Filtros` continua
controlado pelo pai. Os números e resultados filtrados são derivados desses
estados; a página usa Suspense separado para números e listagem.

**Frente 4 — desafio da aula 05.** A ação valida o ID, arquiva a vaga em memória
e invalida `/vagas`. A persistência em banco da aula 06 requer integrar
`arquivada` ao modelo `Vaga` compartilhado e coordenar a migration com a pessoa
responsável pelo schema do grupo.

## O que NÃO tem, de propósito

Se você achar que está faltando, provavelmente está — mas na aula seguinte.

- **Tailwind.** CSS comum até a aula 08.
- **Autenticação de verdade.** O formulário de candidatura guarda o que você
  digita só na memória da aba. Nada é enviado, nada é salvo. Aula 07.
- **Server Actions.** O formulário não escreve em lugar nenhum: aula 05.
- **Persistência do arquivamento.** Nesta etapa, o estado em memória desaparece
  quando o processo do servidor reinicia. A próxima etapa é a aula 06, com banco
  de dados.

## Detalhes que costumam pegar

**`error.tsx` recebe `retry`, não `reset`.** O nome mudou no Next 16 e o antigo
não existe mais — tutorial (ou material de aula) que mostra `reset` é de outra
versão. Conferido em `node_modules/next/dist/docs`, que é a documentação da
versão instalada aqui. Está em `app/vagas/[id]/error.tsx`.

**`notFound()` e `error.tsx` não são a mesma coisa.** `notFound()` é para o que
**não existe** — o endereço está errado e recarregar não ajuda. O `error.tsx` é
para o que **falhou** — a rede caiu, e tentar de novo pode funcionar. Trocar um
pelo outro é dizer à pessoa a coisa errada sobre o que ela deve fazer agora.

**`id` é texto.** O que vem da URL é sempre texto, então `"id": "1"` e não
`"id": 1`. Comparar `"1" === 1` dá falso, e o `find` não acha nada.

**Os dois JSON combinam na mão.** Todo `empresaSlug` de `dados/vagas.json` tem
que existir como `slug` em `dados/empresas.json`, escrito igual. Quando
desencontram, a listagem mostra a empresa e a página dela dá 404 — e o erro
aparece longe de onde foi criado.

**JSON não perdoa o que o TypeScript perdoava.** Chave sem aspas, vírgula
sobrando no último item, comentário: nada disso passa. Se o editor não pintar o
erro, valide o arquivo antes do push — o erro que aparece depois, no terminal
de quem clonou, é bem menos claro.

## Estrutura

```
app/
├── layout.tsx                     moldura do site + cabeçalho
├── page.tsx                       /
├── not-found.tsx                  404 do site inteiro
├── globals.css
├── sobre/page.tsx                 /sobre
├── (institucional)/               route group — não entra na URL
│   ├── layout.tsx
│   ├── termos/page.tsx            /termos
│   └── privacidade/page.tsx       /privacidade
├── vagas/
│   ├── layout.tsx                 moldura da área de vagas
│   ├── loading.tsx                espera da listagem
│   ├── page.tsx                   /vagas — não é async; dois <Suspense>
│   └── [id]/
│       ├── page.tsx               /vagas/1 — generateStaticParams
│       ├── loading.tsx            esqueleto do detalhe
│       ├── error.tsx              a rede caiu
│       └── not-found.tsx          a vaga não existe
└── empresas/
    ├── page.tsx                   /empresas
    └── [slug]/page.tsx            /empresas/aurora-tech
components/                        as peças; só as com memória são de cliente
dados/                             vagas.json e empresas.json — a fonte
lib/
├── tipos.ts                       tipos do projeto
├── api.ts                         o único arquivo que conhece a URL
```

## Licença

Material didático do NickDev. Use para estudar, cite quando reaproveitar.
