# UX e UI
## Site da loja e CRM

Documento de origem: `UX_UI_DESIGN.md` (raiz). O guia original desenha a jornada de comprador e vendedor num marketplace. Aqui o visitante só consulta a vitrine. Quem opera funil, tarefas e estoque é a equipe, no CRM.

O visual de referência é o protótipo Apex Motos em `web/`: tipografia forte, cantos bem arredondados, botões em pílula, fundo claro e a cor de destaque já usada no site.

---

## 1. Princípios

1. **Clareza na vitrine.** Preço, ano, km e cidade aparecem no card. O visitante não precisa pedir o básico.
2. **Um próximo passo.** Em cada tela do CRM há uma ação principal: contatar, registrar, mudar estágio ou concluir tarefa.
3. **O funil cabe no celular.** O vendedor atende na loja com o telefone. Lista, ficha e tarefa funcionam em tela estreita.
4. **Confiança.** Confirmação depois do interesse, dados da loja visíveis, HTTPS.
5. **Português direto.** “Interessados”, “Fazer o primeiro contato”, “Marcar como vendida”.

---

## 2. Design system (herdado do protótipo)

### Cores
- Fundo do site: branco
- Texto: tinta quase preta (`ink`)
- Destaque: o primário já usado nos links e gráficos do protótipo
- CRM: fundo cinza claro, cartões brancos, borda suave
- Estágios:
  - Novo: azul
  - Contactado: âmbar
  - Em negociação: violeta
  - Fechado: verde
  - Perdido: cinza

### Tipo e espaço
- Títulos em peso extra-bold no site
- CRM em hierarquia mais sóbria: título da página, rótulo pequeno, valor grande nos cartões do painel
- Grade de 8 px
- Alvos de toque de pelo menos 44 px

### Componentes
- Botão primário em pílula no site
- Botão de ação do CRM em pílula escura (“+ Adicionar moto”, “Registrar contato”)
- Card de moto com foto, marca, modelo, preço e cidade
- Tabela no desktop e cartões empilhados no celular para interesses
- Modal “Tenho interesse” já existente no protótipo
- Select de estágio na ficha, com gravação real
- Toast curto: “Interesse salvo”, “Tarefa concluída”, “Moto marcada como vendida”

---

## 3. Jornada do visitante

### 3.1 Descobrir
Home → motos em destaque → catálogo.

Filtros visíveis: marca, ano, preço, km. Estado vazio: “Nenhuma moto com esses filtros” e botão para limpar.

### 3.2 Decidir
Página da moto:
- Galeria
- Preço, ano, km, cor, cilindrada, câmbio, ABS, único dono, aceita troca
- Descrição e lista de opcionais
- Ações: **Tenho interesse** e **Chamar no WhatsApp**

### 3.3 Pedir contato
Modal com nome, telefone, e-mail e mensagem. A moto já vai no título do modal.

Depois do envio:
> Recebemos seu interesse na [modelo]. A [loja] entra em contato pelo telefone informado.

Erro de rede:
> Não foi possível enviar. Tente de novo ou chame no WhatsApp.

O formulário de contato da página Contato usa os mesmos campos. A moto fica em branco e a origem do interesse é “contato”.

O visitante não vê funil, tarefas nem dados de outras pessoas.

---

## 4. Jornada da equipe

### 4.1 Entrar
Tela de login com e-mail e senha. Erro: “E-mail ou senha incorretos.” Sem o atalho do protótipo que entra sem validar.

### 4.2 Começar o dia
Painel:
- Cartões: motos ativas, interesses abertos, tarefas atrasadas, vendas do mês
- Lista “Para hoje”: tarefa, pessoa, moto, horário
- Funil em cinco colunas ou cinco números, com link para a lista filtrada

### 4.3 Atender
Lista de interesses: pessoa, moto, telefone, estágio, responsável, data.

Ficha:
1. Cabeçalho com nome, telefone clicável e e-mail
2. Moto ligada, com link para a página pública
3. Estágio e responsável
4. Botões: Ligar, WhatsApp, Registrar nota, Nova tarefa
5. Linha do tempo
6. Tarefas abertas

Registrar contato abre um formulário curto: tipo (ligação, WhatsApp, visita, nota), texto e “mover para Contactado” marcado quando o estágio ainda é Novo.

### 4.4 Negociar e encerrar
Em negociação mostra o valor de referência editável.

Fechar pede confirmação:
> Marcar a [modelo] como vendida e tirar do site?

Perder pede o motivo numa lista: preço, comprou em outro lugar, sem retorno, desistiu, outro.

### 4.5 Cuidar do estoque
Lista de motos com status, preço, visualizações e quantidade de interesses. Formulário de nova moto em uma página, com prévia das fotos. Pausar e vender ficam na edição, com o efeito no site explicado ao lado do controle.

---

## 5. Wireframes de texto

### Home (público)
```text
[logo]  Catálogo  Sobre  Contato          [WhatsApp]
[banner da loja]
[3 motos em destaque]
[atalho para o catálogo]
[rodapé: endereço, horário, telefone]
```

### Ficha do interesse (CRM)
```text
← Interessados
Ana Souza                         [Novo ▾]
(18) 99999-0000 · ana@email.com   Responsável: Carlos

Moto: Honda CB 500X 2022          R$ 35.900
“Quero saber se aceita a minha CG na troca.”

[WhatsApp] [Registrar contato] [Nova tarefa]

Linha do tempo
— Hoje 10:12  Sistema  Interesse recebido pelo site
— Tarefa      Fazer o primeiro contato · vence hoje

[Salvar estágio]
```

### Painel
```text
Painel                          [+ Adicionar moto]
[Ativas 12] [Abertos 7] [Atrasadas 3] [Vendas mês 2]

Para hoje
- Ligar para Ana · CB 500X · atrasada
- Enviar proposta · MT-07 · 15h

Funil: Novo 4 · Contactado 2 · Negociação 1 · Fechado 6 · Perdido 3
```

---

## 6. Microinterações

- Enviar interesse desabilita o botão e mostra “Enviando…”
- Mudar estágio só confirma depois da resposta do servidor
- Concluir tarefa risca o item e some da lista “Para hoje”
- Upload de foto mostra prévia antes de salvar a moto
- WhatsApp abre `https://wa.me/` com o telefone da pessoa e o nome da moto na mensagem

---

## 7. Responsivo

| Largura | Site | CRM |
|---|---|---|
| < 768 px | Uma coluna, filtros em gaveta, WhatsApp flutuante | Menu horizontal, interesses em cartões, ficha em uma coluna |
| ≥ 768 px | Grade de cards | Menu lateral já usado em `AdminShell`, tabela de interesses |

---

## 8. Acessibilidade

- Contraste AA nos textos e nos botões
- Modal com foco preso e fechar por Esc
- Campos com `label`, não só placeholder
- Status do estágio também em texto, não só em cor
- Botão de WhatsApp com nome acessível

---

## 9. Redação

### Tom
Site: confiante e concreto (“Aceito seu usado na troca”). CRM: operacional e curto.

### Mensagens
| Situação | Texto |
|---|---|
| Interesse enviado | Recebemos seu interesse. A loja vai falar com você. |
| Telefone inválido | Informe o telefone com DDD. |
| Sessão expirada | Entre de novo para continuar. |
| Venda confirmada | Moto marcada como vendida e removida do catálogo. |
| Motivo de perda vazio | Escolha por que este interesse foi perdido. |

### Ações
- Tenho interesse
- Chamar no WhatsApp
- Registrar contato
- Fazer o primeiro contato
- Marcar como vendida

---

## 10. Checklist antes de entregar

- [ ] Visitante publica interesse e vê a confirmação
- [ ] O mesmo interesse aparece na lista do CRM
- [ ] Telefone da ficha disca no celular
- [ ] WhatsApp abre com a moto citada
- [ ] Funil e tarefas atrasadas batem com os registros
- [ ] Moto vendida some do catálogo e permanece na ficha
- [ ] Formulários funcionam no teclado do celular
- [ ] Textos do protótipo que dizem “demo” saem das telas definitivas

---

*Outubro de 2026. Versão CRM do guia de UX.*
