/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.almoxsysapi.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Bruno
 */
@Entity
@Table(name = "item", schema = "public")
@NamedQueries({
    @NamedQuery(name = "Item.findAll", query = "SELECT I FROM Item I"),
    @NamedQuery(name = "Item.findByDescricao", query = "SELECT I FROM Item I where I.descricao LIKE :descricao")
})
public class Item implements Serializable {
    
    @Id
    @GeneratedValue
    private UUID id;
    
    @Column(nullable = false, unique = true)
    private String descricao;
    
    @Column(nullable = false)
    private Float preco;
    
    @Column(name = "data_entrada")
    @Temporal(TemporalType.DATE)    
    private Date entrada;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "item_fornecedor", schema = "public",
            joinColumns = { @JoinColumn(name = "item_id")},
            inverseJoinColumns = { @JoinColumn(name = "fornecedor_id")} 
    )
    private List<Fornecedor> fornecedores = new ArrayList<>();

    public Item() {
    }
    
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Float getPreco() {
        return preco;
    }

    public void setPreco(Float preco) {
        this.preco = preco;
    }

    public Date getEntrada() {
        return entrada;
    }

    public void setEntrada(Date entrada) {
        this.entrada = entrada;
    }

    public List<Fornecedor> getFornecedores() {
        return fornecedores;
    }

    public void setFornecedores(List<Fornecedor> Fornecedores) {
        this.fornecedores = fornecedores;
    }
        
}
