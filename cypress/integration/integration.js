/* eslint-disable no-undef */
describe('Page loads', ()=>{
        let exampleGnome = "";
        const testAgeValue = 300;
        beforeEach(function () {
                //cy.fixture('gnomeData.json').as('gnomeData')  // load data from users.json
        })
	it('1) Loads successfully', ()=>{
                cy.visit('/');
                cy.get('.ant-input-search').find('input');
                cy.get('.item').should('have.length',100);
                cy.get('.ant-pagination');
        })
        
        it('2) Scroll down button test', ()=>{
                cy.scrollTo(0,500);
                cy.get('#botGoUp').should('be.visible');
                cy.scrollTo(0,0);
                cy.get('#botGoUp').should('not.be.visible');

        })
        it('3) Get first item', ()=>{
                cy.get('.item').first().find("h1").invoke('text').then((text)=>{
                        exampleGnome = text;
                })
        });

        it('4) Search existing gnome by name', ()=>{      
                cy.get('.ant-input-search').find('input').clear().type(exampleGnome);
                cy.get('.item').contains(exampleGnome);
        })
        
        it('5) Search unexisting gnome by name', ()=>{
                cy.get('.ant-input-search').find('input').clear().type('Unexisting gnome');
                cy.contains('No gnomes found');
        })

        it('6) Search existing gnome by friends', ()=>{
                cy.get('.ant-radio-button-wrapper').eq(1).click();//Change search to by friends
                cy.wait(500);
                cy.get('.ant-input-search').find('input').clear().type(exampleGnome);// We dont know if the Gnome have friends or not
        })

        it('7)  Search unexisting gnome by friends', ()=>{
                cy.get('.ant-input-search').find('input').clear().type("Unexisting gnome");// We dont know if the Gnome have friends or not
                cy.contains('No gnomes found');
        })

        it('8)  Paginate next', ()=>{
                cy.get('.ant-input-search').find('input').clear();
                cy.wait(500);
                cy.get('.ant-pagination').get(".ant-pagination-next").eq(0).click();
                cy.get('.item').first().find("h1").invoke('text').should("not.eq", exampleGnome);
        })

        it('9) Paginate previous', ()=>{
                cy.get('.ant-pagination').get(".ant-pagination-prev").eq(0).click();
                cy.wait(500);
                cy.get('.item').first().find("h1").invoke('text').should("eq", exampleGnome);
        })

        it('10) Toggle filters', ()=>{
                cy.get('.anticon-menu-unfold').click({force: true});
                cy.get('.filters').should('be.visible');
        })

        it('11) Filter - search age more than '+testAgeValue, ()=>{
                cy.wait(1000);
                cy.get('#toggleAge').click();
                cy.get('input[value="More than"]').click();
                cy.get('.filterCol').find('input[type=number]').type(testAgeValue);
                cy.wait(2000);
                cy.get('.item').each(($item)=>{
                        const age = $item.find('.age').html().split("Age: ")[1];
                        expect(age).to.be.greaterThan(testAgeValue);
                });
        })

        it('12) Filter - search age less than '+testAgeValue, ()=>{
                cy.wait(1000);
                cy.get('input[value="Less than"]').click();
                cy.wait(2000);
                cy.get('.item').each(($item)=>{
                        const age = $item.find('.age').html().split("Age: ")[1];
                        expect(age).to.be.lessThan(testAgeValue);
                });
        })

        it('13) Filter - search age equals to '+testAgeValue, ()=>{
                cy.wait(1000);
                cy.get('input[value="Is"]').click();
                cy.wait(2000);
                cy.get('.item').each(($item)=>{
                        const age = parseInt($item.find('.age').html().split("Age: ")[1]);
                        expect(age).eq(testAgeValue);
                });
        })

        it('14) Toggle filters', ()=>{
                cy.get('.anticon-menu-unfold').click({force: true});
                cy.get('.filters').should('not.be.visible');
        })
})