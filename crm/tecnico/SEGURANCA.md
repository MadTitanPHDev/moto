# Segurança
## CRM da revenda no Next.js

Este é o padrão da entrega. A ideia vem das convenções do projeto Vero (permissão explícita, dado pessoal fora do log, auditoria, falha fechada), reduzida a uma loja e a administradores internos.

O visitante não tem conta. Login e senha existem só para administradores da loja. Todos eles veem o estoque, as pessoas, os interesses e as tarefas.

---

## 1. Quem pode o quê

| Ação | Visitante | Administrador |
|---|---|---|
| Ver catálogo e moto ativa | sim | sim |
| Enviar interesse ou contato | sim | sim |
| Abrir `/admin` | redireciona ao login | sim |
| Ver e editar interesses, pessoas, tarefas e motos | não | sim |
| Exportar CSV | não | sim |
| Alterar dados da loja e outros administradores | não | sim |

Não há papel de vendedor nesta entrega. O campo de responsável no interesse diz quem vai retornar o contato. Ele não restringe a leitura.

Fora desta entrega: cadastro de cliente, OAuth, 2FA obrigatório, carteira separada por vendedor.

---

## 2. Sessão

- Senha armazenada só como hash (argon2 ou bcrypt).
- Cookie de sessão: HttpOnly, Secure, SameSite=Strict.
- Layout e cada server action do painel exigem sessão. Esconder o menu não autoriza.
- Troca de senha e desativação de administrador invalidam a sessão afetada.
- Limite de tentativas de login por IP.
- Segredo de sessão em variável de ambiente, diferente de qualquer outra chave.

---

## 3. Formulário público

- Validação no servidor. A validação do navegador só ajuda a preencher.
- No máximo 5 envios de interesse ou contato por IP a cada 10 minutos.
- Telefone normalizado para dígitos antes de gravar.
- Mensagem e nome têm tamanho máximo.
- A resposta de sucesso não devolve id interno nem dado de outro cliente.

---

## 4. Dados pessoais

A loja é a controladora. O sistema guarda nome, telefone e e-mail porque a pessoa pediu contato.

- Esses campos não entram em log, URL, query string, mensagem de erro nem telemetria.
- O log de erro pode levar o id do interesse, não o telefone.
- Exportar CSV é ação de administrador e fica na auditoria.
- Pedido de exclusão é feito por um administrador: a pessoa sai das telas operacionais e o registro da exclusão permanece.

---

## 5. Auditoria

Registrar, com administrador (ou "sistema" na captação pública), ação e instante:

- login com falha repetida e login bem-sucedido
- mudança de estágio, inclusive motivo da perda
- venda que marca a moto como vendida
- exportação CSV
- criação, desativação e troca de senha de administrador
- alteração de telefone e WhatsApp da loja

---

## 6. Erros e existência

- Falha de validação: mensagem estável em português.
- Interesse ou moto inexistente no painel: 404.
- Detalhe de exceção e de banco fica no servidor.
- Moto pausada ou vendida responde 404 no site público e continua visível no CRM.

---

## 7. Arquivos e infraestrutura

- Upload apenas JPEG, PNG ou WebP, até 8 MB, tipo conferido no servidor.
- Nome do arquivo no armazenamento é gerado pelo servidor.
- HTTPS no domínio publicado.
- Backup diário do PostgreSQL, retenção de 30 dias.
- Nenhum segredo de produção no repositório.

---

## 8. O que fica para uma fase seguinte

Se a loja passar a ter vendedor com carteira própria, a leitura do interesse volta a exigir o responsável ou o administrador, e o acesso de quem não é responsável responde 404. Isso não entra enquanto todo login for de administrador.
