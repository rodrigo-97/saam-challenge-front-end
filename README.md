# Projeto Front-end

Este projeto é uma aplicação front-end organizada de forma modular, utilizando TypeScript, React e integração com APIs. A estrutura do projeto é pensada para facilitar manutenção, escalabilidade e organização do código.

## Estrutura de Pastas

### `@types`
Contém definições de tipos TypeScript globais ou compartilhados entre diferentes partes do projeto, facilitando a tipagem de dados e a integração com APIs.

### `components`
Agrupa todos os componentes reutilizáveis da aplicação, como inputs, tabelas, botões e outros elementos de interface. Componentes podem ser simples ou compostos e são pensados para serem utilizados em diferentes telas.

### `configs`
Armazena configurações globais da aplicação, como setup de bibliotecas, internacionalização, instâncias de clientes HTTP e outras configurações centrais.

### `helpers`
Contém funções utilitárias e helpers que realizam tarefas comuns em diferentes partes do projeto, como formatação de dados, notificações ou manipulação de valores.

### `i18n`
Arquivos de internacionalização que armazenam textos e traduções da aplicação para diferentes idiomas.

### `models`
Define os modelos de dados utilizados na aplicação, como estruturas de dados que representam usuários, funcionários ou outras entidades do sistema.

### `remotes`
Responsável pela comunicação com APIs externas ou serviços remotos.  

- **models**: interfaces ou definições de dados que vêm das APIs.  
- **services**: funções que fazem requisições HTTP e encapsulam a lógica de comunicação com os serviços externos.

### `routes`
Contém a definição das rotas da aplicação e suas respectivas páginas e componentes de layout. Permite organizar a navegação e os fluxos da aplicação de forma modular.

### `root.css`
Arquivo global de estilos CSS, que define regras e temas globais da aplicação.

### Arquivos na raiz (`app.tsx`, `main.tsx`)
Entrypoints e arquivos principais da aplicação, responsáveis por inicializar o React, aplicar provedores globais e renderizar a aplicação no navegador.
