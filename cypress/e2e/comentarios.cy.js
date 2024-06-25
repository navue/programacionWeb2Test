describe('App de Comentarios', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('debería mostrar la página principal', () => {
      cy.contains('App de Comentarios').should('be.visible');
    });
  
    it('debería agregar un nuevo comentario', () => {
      agregarComentario('Doe', 'John', 'john.doe@example.com', 'Comentario de prueba', 'Este es un mensaje de prueba');
  
      cy.contains('Doe').should('be.visible');
      cy.contains('John').should('be.visible');
      cy.contains('john.doe@example.com').should('be.visible');
      cy.contains('Comentario de prueba').should('be.visible');
      cy.contains('Este es un mensaje de prueba').should('be.visible');
    });

    it('debería mostrar todos los comentarios', () => {
        cy.get('form#mostrarTodosForm').submit();

        cy.get('table tbody tr').should('have.length.gt', 0);
      });
  
    it('debería filtrar un comentario por ID', () => {
        cy.get((xhr) => {
            expect(xhr.responseBody).to.have.property('_id');
            
            const comentarioId = xhr.responseBody._id;
        
            cy.get('input[name="id"]').type(comentarioId);
            cy.get('button[type="submit"]').contains('Buscar').click();
            cy.contains(comentarioId).should('be.visible');
          });
    });
  
    it('debería filtrar comentarios por email', () => {
      cy.get('#filtrarPorEmailForm input[name="email"]').type('john.doe@example.com');
      cy.get('#filtrarPorEmailForm button[type="submit"]').contains('Buscar').click();
  
      cy.contains('john.doe@example.com').should('be.visible');
    });
  
    it('debería eliminar un comentario', () => {
        cy.get((xhr) => {
            expect(xhr.responseBody).to.have.property('_id');
            
            const comentarioId = xhr.responseBody._id;
        
            cy.get('input[name="id"]').type(comentarioId);
            cy.get(`button[onclick="eliminarComentario('${comentarioId}')"]`).click();
            cy.contains(commentId).should('not.exist');
          });
    });
  
    it('debería eliminar todos los comentarios', () => {
        agregarComentario('Doe', 'John', 'john.doe@example.com', 'Comentario de prueba', 'Este es un mensaje de prueba');
      
      cy.get('button').contains('Eliminar Todos').click();
  
      cy.get('table tbody tr').should('not.exist');
    });

    //Función que agrega un comentario
    function agregarComentario(apellido, nombre, email, asunto, mensaje) {
        cy.get('#insertarComentarioForm input[name="apellido"]').type(apellido);
        cy.get('#insertarComentarioForm input[name="nombre"]').type(nombre);
        cy.get('#insertarComentarioForm input[name="email"]').type(email);
        cy.get('#insertarComentarioForm input[name="asunto"]').type(asunto);
        cy.get('#insertarComentarioForm textarea[name="mensaje"]').type(mensaje);
        cy.get('#insertarComentarioForm button[type="submit"]').contains('Enviar').click();
      }
  });