package br.com.almoxsysapi.resources;

import br.com.almoxsysapi.models.Item;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Bruno
 */
@Stateless
@Path("itens")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ItemResource {

    @PersistenceContext(unitName = "AlmoxsysPU")
    EntityManager entityManager;

    @GET
    public List<Item> getItens(@QueryParam("descricao") String descricao) {
        if (descricao == null || descricao.isBlank()) {
            return entityManager
                    .createNamedQuery("Item.findAll", Item.class)
                    .getResultList();
        } else {
            return entityManager
                    .createNamedQuery("Item.findByDescricao")
                    .setParameter("descricao", descricao)
                    .getResultList();
        }
    }

    @POST
    public Item addItem(Item item) {
        entityManager.persist(item);
        return item;
    }

    @GET
    @Path("{id}")
    public Item getItem(@PathParam("id") UUID id) {
        return entityManager.find(Item.class, id);
    }

    @DELETE
    @Path("{id}")
    public void removeItem(@PathParam("id") UUID id) {
        Item itemEncontrado = entityManager.find(Item.class, id);
        entityManager.remove(itemEncontrado);
    }

    @PUT
    @Path("{id}")
    public Item updateItem(@PathParam("id") UUID id, Item item) {
        item.setId(id);
        entityManager.merge(item);
        return item;
    }
    
}
