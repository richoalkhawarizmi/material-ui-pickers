describe('DateRangePicker', () => {
  beforeEach(() => {
    cy.visit('/regression');
    cy.viewport('macbook-13');
  });

  it('Opens and selecting a range in DateRangePicker', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .focus();
    cy.get('[aria-label="Jan 1, 2019"]').click();
    cy.get('[aria-label="Jan 24, 2019"]').click();

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 24);
  });

  it('Opens and selecting a range on the next month', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .focus();

    cy.get('[aria-label="Jan 1, 2019"]').click();
    cy.get('[data-mui-test="next-arrow-button"]')
      .eq(1)
      .click();

    cy.get('[aria-label="Mar 19, 2019"]').click();

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 47);
  });

  it.skip('Shows range preview on hover', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .focus();

    cy.get('[aria-label="Jan 24, 2019"').trigger('mouseover');
  });

  it.only('Allows pure keyboard input control', () => {
    cy.get('#desktop-range-picker input')
      .eq(0)
      .clear()
      .type('06/06/2019');

    cy.contains('June 2019');
    cy.contains('July 2019');

    cy.get('#desktop-range-picker input')
      .eq(1)
      .focus()
      .clear()
      .type('08/08/2019');

    cy.contains('July 2019');
    cy.contains('August 2019');

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 39);
  });

  it('Scrolls current month to the active selection on focusing start field', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .click();

    cy.get('[aria-label="Jan 19, 2019"]').click();
    cy.get('[aria-label="Feb 19, 2019"]').click();

    cy.get('[data-mui-test="previous-arrow-button"]')
      .eq(0)
      .click()
      .click();

    cy.get('#desktop-range-picker input')
      .first()
      .click();

    cy.contains('January 2019');
  });

  it('Scrolls current month to the active selection on focusing end field', () => {
    cy.get('#desktop-range-picker input')
      .first()
      .click();

    cy.get('[aria-label="Jan 19, 2019"]').click();
    cy.get('[data-mui-test="next-arrow-button"]')
      .eq(1)
      .click();

    cy.get('[aria-label="Mar 19, 2019"]').click();

    cy.get('[data-mui-test="previous-arrow-button"]')
      .eq(0)
      .click()
      .click();

    cy.get('#desktop-range-picker input')
      .eq(0)
      .click();

    cy.get('#desktop-range-picker input')
      .eq(1)
      .click();

    cy.contains('February 2019');
    cy.contains('March 2019');
  });
});