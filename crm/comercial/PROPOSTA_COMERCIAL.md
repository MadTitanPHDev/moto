# Proposta comercial
## Site da revenda e CRM, em permuta

Documento de origem: `PROPOSTA_COMERCIAL.md` (raiz). A proposta original entrega site e uma lista de interessados. Esta entrega o site e o CRM que conduz o interessado até a venda.

---

## Resumo

**Para:** [Nome da revenda]  
**Entrega:** site público do estoque + CRM da equipe  
**Prazo:** 12 a 16 semanas  
**Referência de valor:** R$ 55.000 a R$ 75.000, na forma de 1 moto do estoque  
**Dinheiro da loja na entrada:** R$ 0  
**Custo mensal depois:** cerca de R$ 80 a R$ 200 (hospedagem, banco e domínio)

---

## O problema

- O preço e a ficha da moto dependem de mensagem.
- O interessado fica no WhatsApp de alguém e some quando essa pessoa esquece.
- Não há lista única de quem está em negociação.
- A moto vendida continua no Instagram.
- Ninguém vê, numa tela só, o que precisa de retorno hoje.

O custo aparece em horas repetindo ano, km e valor, e em venda que esfria por falta de segundo contato.

---

## A solução

### 1. Site para o cliente

```text
Site da [loja]
├── Home com destaque
├── Catálogo com filtros
├── Página da moto (fotos, ficha, preço, interesse, WhatsApp)
├── Sobre
├── Contato
└── Blog
```

Quem visita não cria conta. Vê o estoque ativo e pede contato.

### 2. CRM para a equipe

- Pessoa com nome, telefone, e-mail e origem
- O mesmo telefone não vira dois cadastros
- Interesse ligado à moto, com mensagem e valor
- Estágios: Novo, Contactado, Em negociação, Fechado, Perdido
- Perdido pede o motivo
- Fechado marca a moto como vendida e tira do site
- Linha do tempo: ligação, WhatsApp, visita, nota
- Tarefa com data (“Fazer o primeiro contato”, “Enviar proposta”)
- Painel com funil, atrasos e motos mais vistas
- E-mail quando chega alguém pelo site
- CSV
- Dois acessos: administrador e vendedor

### 3. Estoque no mesmo painel

Cadastrar moto, fotos, preço, pausar e marcar vendida. O catálogo público lê esse cadastro.

---

## Permuta

**A loja entrega:** 1 moto (referência R$ 55 mil a R$ 75 mil), depois de aprovar o sistema.  
**O desenvolvimento entrega:** site + CRM descritos acima, no ar, com treinamento.

```text
Referência do trabalho:     R$ 55.000 – R$ 75.000
Forma:                      1 moto do estoque
Caixa da loja na entrada:   R$ 0
Operação mensal:            ~R$ 80 – R$ 200
```

A moto pode ser a que está parada, desde que o estado e a documentação estejam descritos no contrato.

---

## Retorno ilustrativo

```text
2 vendas extras por mês × 12 = 24 vendas
Margem ilustrativa de R$ 5.250
24 × 5.250 = R$ 126.000 no ano
```

Com cerca de 12 vendas extras no ano, a moto da troca se paga nesse cenário. A loja troca a margem ilustrativa pela margem real dela antes de fechar.

Outros efeitos: preço visível, estoque coerente com o que foi vendido, e uma lista do que está sem retorno.

---

## Incluso

### Site
- Visual alinhado ao protótipo Apex Motos, com a marca da loja
- Responsivo
- Filtros, galeria, SEO básico, Analytics
- Interesse e contato gravando no CRM
- Botão de WhatsApp com o número das configurações

### CRM e estoque
- Login
- Painel, motos, pessoas, interesses, tarefas, configurações
- Funil, histórico, tarefas atrasadas
- E-mail de aviso
- CSV
- Admin e vendedor

### Depois da publicação
- 2 sessões de 1 hora: estoque; depois funil, tarefas e fechamento
- Roteiro em vídeo ou PDF dessas três tarefas
- 30 dias de correção de defeito e dúvida de uso

Manutenção opcional após os 30 dias: R$ 250/mês (suporte, backup acompanhado, pequenos ajustes).

---

## Cronograma

| Semanas | Entrega |
|---|---|
| 1 | Kickoff, identidade, 5 motos, confirmação dos estágios |
| 2–3 | Site com estoque real |
| 4–5 | Interesse do site na ficha, e-mail, estágios gravados |
| 6–8 | Histórico, tarefas, papéis, venda atualizando o site |
| 9–10 | Restante do estoque, testes |
| 11–12 | Domínio, HTTPS, backup, treinamento |
| 13–16 | Uso da equipe e ajustes finos |

A transferência da moto ocorre após o aceite da loja, no fim desse ciclo.

---

## Fora desta proposta

- Anúncio automático em OLX ou Marketplace
- Financiamento dentro do site
- Chat interno no lugar do WhatsApp
- Aplicativo nas lojas de app
- Várias lojas ou vendedores externos publicando anúncio
- Mais de dois papéis de acesso

Qualquer um desses itens é orçamento à parte.

---

## Compromissos

### Desenvolvimento
- Entregar o escopo desta proposta
- Mostrar o sistema a cada duas semanas
- Corrigir defeitos nos 30 dias seguintes ao aceite
- Não levar a moto antes do aceite

### Loja
- Logo, textos e fotos das motos na primeira semana
- Uma pessoa para aprovar em até 3 dias úteis
- Dois participantes no treinamento
- Pagar hospedagem, banco e domínio
- Entregar a moto descrita, sem débito, após o aceite

---

## Perguntas frequentes

**A equipe pouco acostumada com computador consegue usar?**  
O treinamento cobre três gestos: publicar moto, abrir o interesse e concluir a tarefa. O WhatsApp continua sendo o canal com o cliente.

**A loja fica dependente para trocar preço?**  
Não. Preço, foto, estágio e tarefa são do painel.

**E se o site sair do ar?**  
Os 30 dias cobrem defeito. Depois, o plano mensal ou um chamado avulso.

**Por que a referência é maior que a de um site simples?**  
Porque a entrega inclui ficha, funil, tarefas, papéis e a venda ligada ao estoque. A lista estática de interessados do protótipo não é o produto final.

**Dá para acrescentar financiamento depois?**  
Sim, como fase seguinte, com escopo e valor próprios.

---

## Próximo passo

1. Escolher a moto candidata.  
2. Separar logo e cinco anúncios com foto.  
3. Revisar o [modelo de contrato](./CONTRATO_PERMUTA_MODELO.md) com um advogado.  
4. Assinar e começar na semana combinada.

---

*Outubro de 2026. Versão CRM da proposta comercial. Números de retorno são cenário de conversa, não garantia de venda.*
