# Resumo executivo
## CRM da revenda de motos, com site de vitrine

Documento de origem: `RESUMO_EXECUTIVO.md` (raiz). Aquele texto descreve um marketplace aberto. Este descreve o produto da loja.

---

## Visão em 60 segundos

**O que é?**
Site da revenda para o público e CRM para a equipe. O cliente vê o estoque e pede informação. A loja acompanha cada pessoa até vender, perder ou retomar o contato.

**Para quem?**
Uma revenda de motos (ou carros) com estoque próprio. Visitantes não criam conta. Quem entra no painel é a equipe da loja.

**Por que construir?**
Hoje o interesse chega no WhatsApp e se perde. A loja não sabe quem pediu qual moto, quem ficou sem retorno e qual anúncio gera conversa. O site mostra o estoque com preço. O CRM guarda a pessoa, o interesse e o próximo passo.

---

## Proposta de valor

### Para quem visita o site
- Catálogo com filtro de marca, ano, preço e quilometragem
- Página da moto com fotos, especificações e preço
- Botão “Tenho interesse”, que grava nome, telefone, e-mail e mensagem
- WhatsApp da loja sempre à mão
- Páginas Sobre, Contato e Blog

### Para a equipe da loja
- Estoque: cadastrar, editar, pausar e marcar vendida
- Pessoa única, mesmo que peça mais de uma moto
- Funil: Novo, Contactado, Em negociação, Fechado, Perdido
- Histórico de ligações, WhatsApp, visitas e notas
- Tarefas com data e responsável
- Painel com interessados, tarefas atrasadas e motos mais vistas
- Aviso por e-mail quando chega alguém novo

---

## Como a loja trabalha

```
Visitante abre a moto
        │
        ▼
Envia “Tenho interesse” ou o formulário de contato
        │
        ▼
CRM cria ou reaproveita a Pessoa
e abre um Interesse (estágio Novo)
        │
        ▼
Vendedor é avisado, liga ou responde no WhatsApp
e registra a atividade
        │
        ├── Em negociação → tarefa de retorno
        ├── Fechado → moto sai do site (vendida)
        └── Perdido → motivo fica na ficha
```

A venda em si continua presencial ou pelo WhatsApp. O CRM é o registro e o lembrete, para ninguém ficar sem resposta.

---

## Modelo desta entrega

Esta versão é um sistema para **uma loja**, oferecido em permuta (ver pasta `comercial/`).

Não há assinatura de marketplace, anúncio impulsionado nem comissão de financeira nesta entrega. Receita da loja continua sendo a margem da moto. O retorno do sistema é venda que deixaria de acontecer por falta de retorno e tempo gasto repetindo preço, ano e fotos.

### Leitura de retorno (conservadora)
```
2 vendas extras / mês × 12 = 24 vendas
Margem ilustrativa de R$ 5.250
Retorno ilustrativo: R$ 126.000 / ano
```
Os números são cenário de conversa comercial, iguais em espírito aos da proposta original. A loja valida com o ticket e a margem dela.

Custo mensal de operação do sistema: hospedagem, banco e domínio, na faixa de R$ 80 a R$ 200.

---

## Stack

| Camada | Escolha | Motivo |
|---|---|---|
| Site e CRM | Next.js + TypeScript + Tailwind | Um projeto, o protótipo `web/` já está nesse formato |
| Dados | PostgreSQL + Prisma | Pessoas, interesses, tarefas e estoque no mesmo banco |
| Fotos | S3 ou equivalente | Galeria da moto |
| Acesso | Sessão no painel, papéis admin e vendedor | Visitante não tem login |
| Aviso | E-mail (e link de WhatsApp na ficha) | Loja vê o interesse na hora |

---

## Roadmap

### Fase 1 — Loja operando (semanas 1–8)
- Login real do painel
- CRUD de motos com fotos
- Catálogo público lendo só motos ativas
- Interesse e contato criando Pessoa + Interesse
- E-mail para a loja
- Lista, filtro e ficha do interesse
- Mudança de estágio gravada

### Fase 2 — CRM do dia a dia (semanas 9–14)
- Histórico de atividades
- Tarefas e fila de atrasadas
- Fechado marca a moto como vendida
- Perdido exige motivo
- Funil e painel com dados reais
- Dois papéis: administrador e vendedor
- Exportação CSV

### Fase 3 — Depois da entrega (sob pedido)
- Mais de uma loja no mesmo código (white-label)
- Lembrete automático de tarefa por e-mail
- Relatório de origem (site, WhatsApp, loja física)
- Integração de financiamento

---

## Investimento de construção

Equipe enxuta, compatível com a permuta para uma loja:

- 1 desenvolvedor full-stack em tempo integral
- Apoio pontual de design (o visual do protótipo Apex Motos já existe)
- Prazo alvo: 12 a 16 semanas

Infraestrutura mensal da loja permanece baixa: um banco PostgreSQL, hospedagem do Next.js e armazenamento de fotos.

---

## Métricas

### Técnicas
- Página da moto abre em menos de 2 segundos na rede móvel comum
- Formulário de interesse confirma na tela e grava no banco
- Backup diário do banco

### Operação da loja
- 100% dos interesses do site aparecem no funil no mesmo dia
- Todo interesse Novo tem tarefa de primeiro contato em até 1 dia útil
- Taxa de interesses sem retorno após 48 horas visível no painel
- Moto fechada some do catálogo público

---

## Segurança e LGPD

- Senha com hash, sessão do painel, HTTPS
- Visitante informa nome, telefone e e-mail porque pediu contato
- A loja é a controladora desses dados
- A ficha permite registrar pedido de exclusão
- Fotos e textos da loja ficam no armazenamento dela

---

## Riscos

| Risco | Efeito | Caminho |
|---|---|---|
| Equipe não registra o WhatsApp no CRM | Funil fica vazio e o sistema perde utilidade | Tarefa obrigatória no primeiro contato e treinamento na entrega |
| Fotos e textos atrasam | Site publica com estoque incompleto | Começar com 5 motos reais na semana 1 |
| Escopo volta ao marketplace | Prazo estoura | Esta pasta é o escopo. Chat, OLX e vários vendedores ficam para outro contrato |
| Dois vendedores alteram o mesmo interesse | Informação se perde | Responsável único e histórico com autor e data |

---

## Próximos passos

1. Validar com o dono da loja o funil (os cinco estágios) e quem atende.
2. Usar o protótipo em `web/` como amostra visual do site.
3. Fechar escopo pela [proposta comercial](../comercial/PROPOSTA_COMERCIAL.md).
4. Implementar pela [guia](../tecnico/GUIA_IMPLEMENTACAO.md), na ordem da Fase 1.

---

*Outubro de 2026. Versão CRM, derivada do resumo executivo do marketplace.*
