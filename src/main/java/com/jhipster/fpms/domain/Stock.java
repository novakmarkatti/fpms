package com.jhipster.fpms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Stock.
 */
@Entity
@Table(name = "stock")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Stock implements Serializable {

    private static final long serialVersionUID = 1L;

    public Stock() {}

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "symbol")
    private String symbol;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "purchase_price")
    private Double purchasePrice;

    @Column(name = "current_price")
    private Double currentPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "stocks" }, allowSetters = true)
    private Portfolio portfolio;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Stock id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSymbol() {
        return this.symbol;
    }

    public Stock symbol(String symbol) {
        this.setSymbol(symbol);
        return this;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return this.name;
    }

    public Stock name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public Stock quantity(Integer quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPurchasePrice() {
        return this.purchasePrice;
    }

    public Stock purchasePrice(Double purchasePrice) {
        this.setPurchasePrice(purchasePrice);
        return this;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Double getCurrentPrice() {
        return this.currentPrice;
    }

    public Stock currentPrice(Double currentPrice) {
        this.setCurrentPrice(currentPrice);
        return this;
    }

    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Portfolio getPortfolio() {
        return this.portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public Stock portfolio(Portfolio portfolio) {
        this.setPortfolio(portfolio);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Stock)) {
            return false;
        }
        return getId() != null && getId().equals(((Stock) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Stock{" +
            "id=" + getId() +
            ", symbol='" + getSymbol() + "'" +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            ", purchasePrice=" + getPurchasePrice() +
            ", currentPrice=" + getCurrentPrice() +
            "}";
    }
}
