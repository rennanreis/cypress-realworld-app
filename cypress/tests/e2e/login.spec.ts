describe('Login com sucesso', () => {
  it('Deve fazer login com um usuário válido', () => {
    // 1. Visite a página de login
    cy.visit('/signin');

    // 2. Preencha os campos com credenciais válidas
    cy.get('[data-test="signin-username"]').type('Kylie.Padberg');
    cy.get('[data-test="signin-password"]').type('s3cret');

    // 3. Clique no botão de login
    cy.get('[data-test="signin-submit"]').click();

    // 4. Validações adicionais
    cy.url({ timeout: 10000 }).should('include', '/');
    cy.get('[data-test="sidenav-user-full-name"]').should('be.visible');
  });
});

/*describe('Tentar fazer login com credenciais inválidas', () => {
  it('Deve exibir uma mensagem de erro ao fazer login com credenciais inválidas', () => {
    // Implemente os passos do caso de teste aqui
  });
});

describe('Registro de novo usuário com sucesso', () => {
  it('Deve registrar um novo usuário com informações válidas', () => {
    // Implemente os passos do caso de teste aqui
  });
});

describe('Tentar registrar um novo usuário com informações incompletas', () => {
  it('Deve exibir mensagens de erro ao tentar registrar um novo usuário sem preencher todas as informações obrigatórias', () => {
    // Implemente os passos do caso de teste aqui
  });
});*/
