---

### 📘 `README_admin.json.md` — Documentação Técnica Agroverso

```markdown
# 📄 admin.json – Dados Simulados de Acesso

## 🌱 Finalidade

Este arquivo contém **dados de usuários fictícios** utilizados exclusivamente para o **modo de demonstração** (modo simulado) do sistema Agroverso. Ele permite testes locais sem dependência de backend ou autenticação real.

## ⚙️ Ativação

Para ativar o modo simulado, defina no arquivo `.env`:

```

VITE\_ENABLE\_FAKE\_DATA=true

```

## 📐 Estrutura do Objeto

Cada item representa um usuário simulado com a seguinte estrutura:

| Campo        | Tipo     | Descrição                                                                 |
|--------------|----------|--------------------------------------------------------------------------|
| `id`         | number   | Identificador único                                                      |
| `nome`       | string   | Nome completo do usuário                                                 |
| `usuario`    | string   | Email de login                                                           |
| `senha`      | string   | Senha codificada em Base64 (ex: `123456` → `MTIzNDU2`)                   |
| `perfil`     | string   | Função ou cargo no Agroverso (ex: Técnico, Consultor, Administrador)     |
| `tipo`       | string   | Categoria de acesso (Interno, Externo, Operacional)                      |
| `permissoes` | string[] | Lista de permissões simbólicas simuladas para testes de interface        |

## 🔐 Segurança

- Nenhuma senha real está presente neste arquivo.
- As senhas são **codificadas em Base64** apenas para simular boas práticas, mesmo em ambiente controlado.
- **Nunca utilizar este arquivo em produção**.
- Não expor este conteúdo via APIs públicas.

## 📁 Local Esperado

Este arquivo deve ser salvo em:

```

/public/data/admin.json

````

## ✅ Exemplo de Decodificação (em JS)

```js
atob("MTIzNDU2"); // retorna "123456"
````

## 🧠 Filosofia

Este recurso segue os princípios de desenvolvimento do Agroverso:

* Sabedoria: testes independentes, dados educativos
* Força: segurança simbólica e controle de acesso simulado
* Beleza: estrutura clara, extensível e bem documentada

```
