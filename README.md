# PUC Rio - Pós-Graduação em Desenvolvimento Full Stack
### Sprint: Desenvolvimento Front-end Avançado
### Aluno: Izidro Avelino de Queiroz Neto
### Dezembro/2023

## ToiGet Front End - versão React

O objetivo da aplicação ("batizada" de ToiGet, uma brincadeira com a palavra "toilet") é encontrar o banheiro mais próximo da localização do usuário. No mapa, é indicado o banheiro mais próximo com o ícone em vermelho (os outros banheiros são verdes). O ícone em azul indica a localização de referência, que pode ser arrastado no mapa, ajustando a cor do banheiro mais próximo.

Para incluir um banheiro, basta clicar na sua localização no mapa e preencher sua classificação (uma a cinco estrelas), uma descrição (opcional) e indicar se é público ou pago. Também deve ser informado o horário de funcionamento por dia da semana (se está aberto ou fechado e, quando aberto, a hora em que abre e em que fecha).

Para alterar um banheiro, basta clicar em seu ícone no mapa. Suas informações serão recuperadas e poderão ser alteradas e salvas.

Abaixo do mapa, é apresentada uma tabela com os banheiros cadastrados, em ordem crescente de distância em relação à localização de referência.

Para excluir um banheiro, basta clicar no ícone de exclusão na coluna mais à direita da tabela.

A aplicação original foi desenvolvida como MVP da Sprint Desenvolvimento Full Stack Básico, em set/2023. Ela foi reescrita usando React, incluindo uma versão simplificada de login de usuários. 

Cada usuário pode ter um dos seguintes papéis: 'user' ou 'admin'. Um 'user' pode alterar ou excluir apenas os banheiros que ele tenha incluído. Um 'admin' pode alterar ou excluir qualquer banheiro.

Foram incluídos três arquivos no formato JSON: toiget.json (banheiros),
openingHours.json (horários dos banheiros) e users.json (usuários). Eles são carregados na inicialização da aplicação.

Eventuais inclusões e alterações de banheiros são salvas na memória local do browser.

A aplicação tem cinco páginas:
- HomePage: página principal;
- LoginPage: página de login;
- InsertPage: página de inclusão de um novo banheiro;
- UpdatePage: página de alteração de um banheiro;
- HelpPage: página com instruções sobre a aplicação;

Uso dos componentes nas páginas:
- ToiGetMap: HomePage, InsertPage e UpdatePage;
- ToiletTable: HomePage, InsertPage e UpdatePage;
- ToiGetForm: InsertPage e UpdatePage;
- ToiGetBrand:  LoginPage e HelpPage;

## Projeto Figma: 

[ToiGet](https://www.figma.com/file/8VY32HgZg1fMSo5fmFHQAi/ToiGet?type=design&node-id=49%3A10397&mode=design&t=GJjITbqx05BoO7HU-1)

# Como executar

Fazer o download do projeto e instalar as dependências com `npm install`.

Executar com `npm start`.

Os usuários e senhas estão listados no arquivo 'users.json'.

## Bibliotecas utilizadas:

[Leaflet](https://leafletjs.com/): biblioteca Javascript open source para desenho do mapas.

[React Leaflet](https://react-leaflet.js.org/): componentes React que integram o Leaflet ao React.

[React Boostrap](https://react-bootstrap.netlify.app/): componentes React para uso da biblioteca Bootstrap.

## MVP da Sprint Desenvolvimento Full Stack Básico:

[Front End](https://github.com/izidroqueiroz/pucrio_mvp1_front)

[API](https://github.com/izidroqueiroz/pucrio_mvp1_api)

