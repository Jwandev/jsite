# juan.eng.br

Site pessoal do Juan, publicado pelo **GitHub Pages** a partir da pasta `docs/`.
O domínio `juan.eng.br` aponta para cá pelo arquivo `docs/CNAME`. **Não apague esse arquivo**, senão o domínio para de funcionar.

## Como o site é organizado

```
docs/
├── index.html          → o texto e a estrutura da página
├── CNAME               → liga o domínio juan.eng.br (não mexer)
└── assets/
    ├── css/style.css   → cores, tamanhos e layout (as cores ficam no topo, em :root)
    ├── js/main.js      → interações + SEUS CONTATOS (topo do arquivo)
    └── img/            → fotos e imagens
        └── etapas/     → as 4 imagens do topo (croqui → estrutura → instalações → pronta)
```

São só arquivos comuns: não precisa instalar nada nem "compilar".

## Tarefas comuns

| Quero… | Onde mexer |
|---|---|
| Colocar meu WhatsApp, e-mail e redes | `docs/assets/js/main.js`, bloco `CONTATO` no começo |
| Trocar um texto | `docs/index.html` (os trechos entre [colchetes] ainda precisam ser preenchidos) |
| Trocar as cores | `docs/assets/css/style.css`, bloco `:root` no começo |
| Trocar as imagens do topo | salvar 4 imagens com a **mesma câmera** em `docs/assets/img/etapas/` e ajustar a lista `ETAPAS` em `main.js` |
| Trocar a imagem de um projeto | colocar a imagem em `docs/assets/img/` e mudar o `src` do card em `index.html` |

Depois de salvar no GitHub, o site atualiza sozinho em 1 ou 2 minutos.

## Versão antiga

O site anterior (feito com Pug, Sass e TypeScript) está guardado no branch **`obsoleto`**.
