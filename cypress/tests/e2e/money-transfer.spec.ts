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
