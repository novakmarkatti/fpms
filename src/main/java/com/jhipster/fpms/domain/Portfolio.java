package com.jhipster.fpms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Portfolio.
 */
@Entity
@Table(name = "portfolio")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Portfolio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "email_address")
    private String emailAddress;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "portfolio")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "portfolio" }, allowSetters = true)
    private Set<Stock> stocks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Portfolio id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return this.userName;
    }

    public Portfolio userName(String userName) {
        this.setUserName(userName);
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public Portfolio emailAddress(String emailAddress) {
        this.setEmailAddress(emailAddress);
        return this;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Set<Stock> getStocks() {
        return this.stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        if (this.stocks != null) {
            this.stocks.forEach(i -> i.setPortfolio(null));
        }
        if (stocks != null) {
            stocks.forEach(i -> i.setPortfolio(this));
        }
        this.stocks = stocks;
    }

    public Portfolio stocks(Set<Stock> stocks) {
        this.setStocks(stocks);
        return this;
    }

    public Portfolio addStock(Stock stock) {
        this.stocks.add(stock);
        stock.setPortfolio(this);
        return this;
    }

    public Portfolio removeStock(Stock stock) {
        this.stocks.remove(stock);
        stock.setPortfolio(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Portfolio)) {
            return false;
        }
        return getId() != null && getId().equals(((Portfolio) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Portfolio{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", emailAddress='" + getEmailAddress() + "'" +
            "}";
    }
}
