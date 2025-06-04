describe('Enviar dinheiro com saldo suficiente', () => {
  it('Deve enviar dinheiro com sucesso', () => {
    // Login
    cy.visit('/signin');
    cy.get('[data-test="signin-username"]').type('Carolyn90');
    cy.get('[data-test="signin-password"]').type('s3cret');
    cy.get('[data-test="signin-submit"]').click();

    // Ir para nova transação
    cy.get('[data-test="nav-top-new-transaction"]').click();

    // Selecionar destinatário (funcionando conforme visto no log)
    cy.get('li').contains('Katelyn Gleichner').click();

    // Preencher valor e descrição
    cy.get('[data-test="transaction-create-amount-input"]').type('10');
    cy.get('[data-test="transaction-create-description-input"]').type('Teste cypress');

    // Enviar usando o seletor correto
    cy.get('[data-test="transaction-create-submit-payment"]').click();

    // Verificar mensagem de sucesso
    cy.get('[data-test="alert-bar-success"]')
      .should('be.visible')
      .and('contain', 'Transaction Submitted!');
  });
});

describe('Enviar dinheiro com saldo insuficiente', () => {
  it('Deve exibir mensagem de erro ao enviar dinheiro sem saldo suficiente', () => {
    // Login
    cy.visit('/signin');
    cy.get('[data-test="signin-username"]').type('Kylie.Padberg');
    cy.get('[data-test="signin-password"]').type('s3cret');
    cy.get('[data-test="signin-submit"]').click();

    // Capturar saldo atual
    cy.get('[data-test="sidenav-user-balance"]')
      .invoke('text')
      .then((balance) => {
        const currentBalance = parseFloat(balance.replace('$', '').replace(',', ''));
        cy.log(`Saldo atual: $${currentBalance}`);
        
        // Ir para nova transação
        cy.get('[data-test="nav-top-new-transaction"]').click();

        // Selecionar destinatário
        cy.get('[data-test="user-list-search-input"]').type('Coty MacGyver');
        cy.contains('Coty MacGyver').click();

        // Preencher valor MAIOR que o saldo
        const insufficientAmount = currentBalance + 1000;
        cy.get('[data-test="transaction-create-amount-input"]').type(insufficientAmount.toString());
        cy.get('[data-test="transaction-create-description-input"]').type('Teste saldo insuficiente');

        // Tentar enviar
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        // BUG: A aplicação deveria mostrar erro, mas permite a transação
        // O teste abaixo é propositalmente esperado para falhar até o bug ser corrigido
        cy.contains('insufficient balance').should('be.visible');
        
        // TODO: Reportar como BUG - Sistema permite transação com saldo insuficiente
        cy.log('🐛 BUG ENCONTRADO: Sistema permite transação sem saldo suficiente!');
      });
  });
});