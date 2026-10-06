---
name: crm-security
description: >-
  Aplica a segurança do CRM da revenda: sessão de administrador, formulário
  público, dados pessoais, auditoria e exportação. Use ao mexer em login,
  cookie, server action pública, telefone, e-mail, CSV, upload ou log.
---

# Segurança do CRM

Fonte completa: `crm/tecnico/SEGURANCA.md`.

## Quem entra

- Visitante: sem conta. Pode ver moto ativa e enviar interesse ou contato.
- Administrador da loja: e-mail e senha. Vê e altera a loja inteira.
- Não criar cadastro público, OAuth nem papel de vendedor nesta entrega.

## Checklist da mudança

- [ ] Rota `/admin` sem sessão redireciona para `/admin/login`.
- [ ] Server action do painel chama a mesma checagem de sessão. Esconder o link não basta.
- [ ] Cookie de sessão: HttpOnly, Secure, SameSite=Strict.
- [ ] Senha só como hash (argon2 ou bcrypt).
- [ ] Login e formulário público têm limite por IP.
- [ ] Telefone e e-mail não aparecem em `console`, log, URL, query string nem mensagem de erro.
- [ ] Erro ao cliente usa código estável. Stack e detalhe de banco ficam no servidor.
- [ ] Exportar CSV, mudar estágio, marcar vendida, entrar e trocar senha geram registro de auditoria com o id do administrador.
- [ ] Upload confere tipo e tamanho. Caminho do arquivo não vem do nome enviado pelo navegador.
- [ ] Segredo novo vai para `.env.example` sem valor real.

## Respostas

- Pedido sem sessão no painel: redireciona ao login.
- Registro inexistente: 404.
- Esta entrega não distingue 403 de "interesse de outro vendedor", porque todo administrador vê a loja.

## Ao terminar

Diga qual item do checklist a mudança cobre e qual ficou de fora de propósito.
