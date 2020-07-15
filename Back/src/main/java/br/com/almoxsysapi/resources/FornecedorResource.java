/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.almoxsysapi.resources;

import br.com.almoxsysapi.models.Fornecedor;
import java.util.List;
import java.util.UUID;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Bruno
 */
@Stateless
@Path("fornecedores")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FornecedorResource {
    
    @PersistenceContext(unitName = "AlmoxsysPU")
    EntityManager entityManager;
    
    @GET
    public List<Fornecedor> getFornecedores() {
        return entityManager
                .createQuery("SELECT f FROM Fornecedor f", Fornecedor.class)
                .getResultList();
    }
    
    @POST
    public Response addFornecedor(Fornecedor fornecedor) {
        entityManager.persist(fornecedor);
        return Response
                .status(Response.Status.CREATED)
                .entity(fornecedor)
                .build();
    }
    
    @GET
    @Path("{id}")
    public Fornecedor getFornecedor(@PathParam("id") UUID id) {
        return entityManager.find(Fornecedor.class, id);
    }
        
    @DELETE
    @Path("{id}")
    public void removeFornecedor(@PathParam("id") UUID id) {
        Fornecedor fornecedor = entityManager.find(Fornecedor.class, id);
        entityManager.remove(fornecedor);
    }
    
    @PUT
    @Path("{id}")
    public Fornecedor updateFornecedor
        (@PathParam("id") UUID id, Fornecedor f) {
        f.setId(id);
        entityManager.merge(f);
        return f;
    }
       
} 
