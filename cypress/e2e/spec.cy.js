describe('template spec', () => {
  it('Si el usuario no se encuentra logueado y se intenta acceder a algun lugar de la aplicación debe redirigir al login', () => {
    cy.visit('http://localhost:3000/')
    cy.location('pathname').should('include','/login')
    cy.visit('http://localhost:3000/dashboard')
    cy.location('pathname').should('include','/login')
    cy.visit('http://localhost:3000/bookings')
    cy.location('pathname').should('include','/login')
    cy.visit('http://localhost:3000/contact')
    cy.location('pathname').should('include','/login')
    cy.visit('http://localhost:3000/rooms')
    cy.location('pathname').should('include','/login')
    cy.visit('http://localhost:3000/users')
    cy.location('pathname').should('include','/login')

  })
  it('Loguea si los datos son correctos y se redirige al home', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy="email"]').type('email@email.com').should('have.value', 'email@email.com')
    cy.get('[data-cy="password"]').type('1234').should('have.value', '1234')
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('not.include','/login')

  })
  it('Si los datos no son correctos muestra un modal y se redirige al login', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy="email"]').type('email@email.com').should('have.value', 'email@email.com')
    cy.get('[data-cy="password"]').type('123').should('have.value', '123')
    cy.get('[data-cy="submit"]').click()
    cy.contains('Invalid login: Check Email or Password')
    cy.location('pathname').should('include','/login')
  })
  it('Si el usuario se encuentra logueado e intenta ir al login debe redirigir al home', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy="email"]').type('email@email.com').should('have.value', 'email@email.com')
    cy.get('[data-cy="password"]').type('1234').should('have.value', '1234')
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('not.include','/login')
    cy.visit('http://localhost:3000/login')
    cy.location('pathname').should('not.include','/login')

  })
})