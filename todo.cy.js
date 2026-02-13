describe('TaskFlow - Single Test', () => {
    it('Adds one task', () => {
        cy.visit('http://127.0.0.1:5501/index.html');

        cy.get('#taskInput').type('Learn Cypress');
        cy.get('#addBtn').click();

        cy.get('#taskList').should('contain', 'Learn Cypress');
        cy.get('#taskCounter').should('contain', '1');
    });

    //prevent adding an empty task
   describe('TaskFlow To-Do App', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/index.html'); // make sure this is correct
    cy.get('#addBtn').should('be.visible'); // wait for page to load
  });

  it('should not add an empty task', () => {
    cy.get('#addBtn').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please enter a task!');
    });
    cy.get('#taskList li').should('have.length', 0);
  });
});


// Clear all tasks
describe('TaskFlow To-Do App - Clear All', () => {
  beforeEach(() => {
    // 1. Visit your page (make sure your server is running!)
    cy.visit('http://127.0.0.1:5501/index.html');

    // 2. Wait for the input and button to exist and be visible
    cy.get('#taskInput', { timeout: 10000 }).should('be.visible');
    cy.get('#addBtn', { timeout: 10000 }).should('be.visible');
    cy.get('#clearBtn', { timeout: 10000 }).should('be.visible');
    cy.get('#taskList', { timeout: 10000 }).should('exist');
  });

  it('should clear all tasks', () => {
    // Add two tasks
    cy.get('#taskInput').type('Task 1');
    cy.get('#addBtn').click();

    cy.get('#taskInput').type('Task 2');
    cy.get('#addBtn').click();

    // Verify tasks were added
    cy.get('#taskList li').should('have.length', 2);

    // Clear all
    cy.get('#clearBtn').click();

    // Verify list is empty
    cy.get('#taskList li').should('have.length', 0);
    cy.get('#taskCounter').should('contain.text', '0 tasks');
  });
});

// Add a new task

describe('TaskFlow To-Do App - Add New Task', () => {
  
  // Runs before each test
  beforeEach(() => {
    // Make sure your local server is running
    cy.visit('http://127.0.0.1:5501/index.html');

    // Wait for key elements to exist and be visible
    cy.get('#taskInput', { timeout: 10000 }).should('be.visible');
    cy.get('#addBtn', { timeout: 10000 }).should('be.visible');
    cy.get('#taskList', { timeout: 10000 }).should('exist');
    cy.get('#taskCounter', { timeout: 10000 }).should('exist');

    // Clear localStorage so each test starts fresh
    cy.clearLocalStorage();
  });

  it('should add a new task', () => {
    // Type the task and click "Add"
    cy.get('#taskInput').type('Buy milk');
    cy.get('#addBtn').click();

    // Check that the task appears in the list
    cy.get('#taskList li')
      .should('have.length', 1)
      .and('contain.text', 'Buy milk');

    // Check that the task counter updates
    cy.get('#taskCounter').should('contain.text', '1 tasks');

    // Optional: check that the task is saved in localStorage
    cy.window().then((win) => {
      const tasks = JSON.parse(win.localStorage.getItem('tasks'));
      expect(tasks).to.include('Buy milk');
    });
  });
});



});
