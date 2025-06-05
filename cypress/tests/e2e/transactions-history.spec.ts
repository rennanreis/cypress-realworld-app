describe('Visualizar histórico de transações com sucesso', () => {
  it('Deve exibir o histórico de transações corretamente', () => {
    cy.visit('/signin');
    cy.get('[data-test="signin-username"]').type('Carolyn90');
    cy.get('[data-test="signin-password"]').type('s3cret');
    cy.get('[data-test="signin-submit"]').click();
    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test^="transaction-item-"]').should('exist');
  });
});

describe('Visualizar histórico de transações sem transações anteriores', () => {
  it('Deve exibir mensagem de ausência de transações', () => {
  });
});
