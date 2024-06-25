describe("App de Comentarios", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Mostrar la página principal", () => {
    cy.contains("App de Comentarios").should("be.visible");
  });

  it("Agregar un nuevo comentario", () => {
    agregarComentario(
      "Perez",
      "Juan",
      "Perezj@gmail.com",
      "Comentario de prueba",
      "Este es un mensaje de prueba"
    );

    cy.contains("Perez").should("be.visible");
    cy.contains("Juan").should("be.visible");
    cy.contains("Perezj@gmail.com").should("be.visible");
    cy.contains("Comentario de prueba").should("be.visible");
    cy.contains("Este es un mensaje de prueba").should("be.visible");
  });

  it("Mostrar todos los comentarios", () => {
    cy.get("form#mostrarTodosForm").submit();

    cy.get("table tbody tr").should("have.length.gt", 0);
  });

  it("Filtrar un comentario por ID", () => {
    cy.get("table tbody tr th").invoke("text").then((texto) => {
      cy.get('#filtrarPorIdForm input[name="id"]').type(
        texto
      );
      cy.get('#filtrarPorIdForm button[type="submit"]')
        .contains("Buscar")
        .click();
      cy.contains(texto).should("be.visible");
    });
  });

  it("Filtrar comentarios por email", () => {
    cy.get('#filtrarPorEmailForm input[name="email"]').type(
      "Perezj@gmail.com"
    );
    cy.get('#filtrarPorEmailForm button[type="submit"]')
      .contains("Buscar")
      .click();

    cy.contains("Perezj@gmail.com").should("be.visible");
  });

  it('Actualizar un comentario', () => {
    cy.get("table tbody tr th").invoke("text").then((texto) => {
      cy.get(`#editarBtn[onclick="displayFormularioEditar('${texto}')"]`).click();

    cy.get('.hidden input[name="apellido"]').clear().type('Gutierrez');
    cy.get('.hidden input[name="nombre"]').clear().type('José');
    cy.get('.hidden input[name="email"]').clear().type('Gutierrezj@gmail.com');
    cy.get('.hidden input[name="asunto"]').clear().type('Nuevo comentario de prueba');
    cy.get('.hidden textarea[name="mensaje"]').clear().type('Este es un nuevo mensaje de prueba');

    cy.get('button[type="submit"]').contains('Guardar').click();

    cy.contains('Gutierrez').should('be.visible');
    cy.contains('José').should('be.visible');
    cy.contains('Gutierrezj@gmail.com').should('be.visible');
    cy.contains('Nuevo comentario de prueba').should('be.visible');
    cy.contains('Este es un nuevo mensaje de prueba').should('be.visible');
    });
});

  it("Eliminar un comentario", () => {
    cy.get("table tbody tr th").invoke("text").then((texto) => {
      cy.get(`button[onclick="eliminarComentario('${texto}')"]`).click();
      cy.contains(texto).should("not.exist");
    });
  });

  it("Eliminar todos los comentarios", () => {
    agregarComentario(
      "Perez",
      "Juan",
      "Perezj@gmail.com",
      "Comentario de prueba",
      "Este es un mensaje de prueba"
    );

    cy.get("button").contains("Eliminar Todos").click();

    cy.get("table tbody tr").should("not.exist");
  });

  //Función que agrega un comentario
  function agregarComentario(apellido, nombre, email, asunto, mensaje) {
    cy.get('#insertarComentarioForm input[name="apellido"]').type(apellido);
    cy.get('#insertarComentarioForm input[name="nombre"]').type(nombre);
    cy.get('#insertarComentarioForm input[name="email"]').type(email);
    cy.get('#insertarComentarioForm input[name="asunto"]').type(asunto);
    cy.get('#insertarComentarioForm textarea[name="mensaje"]').type(mensaje);
    cy.get('#insertarComentarioForm button[type="submit"]')
      .contains("Enviar")
      .click();
  }
});
