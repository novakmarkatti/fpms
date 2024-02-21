package com.jhipster.fpms.domain;

import static com.jhipster.fpms.domain.PortfolioTestSamples.*;
import static com.jhipster.fpms.domain.StockTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.jhipster.fpms.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PortfolioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Portfolio.class);
        Portfolio portfolio1 = getPortfolioSample1();
        Portfolio portfolio2 = new Portfolio();
        assertThat(portfolio1).isNotEqualTo(portfolio2);

        portfolio2.setId(portfolio1.getId());
        assertThat(portfolio1).isEqualTo(portfolio2);

        portfolio2 = getPortfolioSample2();
        assertThat(portfolio1).isNotEqualTo(portfolio2);
    }

    @Test
    void stockTest() throws Exception {
        Portfolio portfolio = getPortfolioRandomSampleGenerator();
        Stock stockBack = getStockRandomSampleGenerator();

        portfolio.addStock(stockBack);
        assertThat(portfolio.getStocks()).containsOnly(stockBack);
        assertThat(stockBack.getPortfolio()).isEqualTo(portfolio);

        portfolio.removeStock(stockBack);
        assertThat(portfolio.getStocks()).doesNotContain(stockBack);
        assertThat(stockBack.getPortfolio()).isNull();

        portfolio.stocks(new HashSet<>(Set.of(stockBack)));
        assertThat(portfolio.getStocks()).containsOnly(stockBack);
        assertThat(stockBack.getPortfolio()).isEqualTo(portfolio);

        portfolio.setStocks(new HashSet<>());
        assertThat(portfolio.getStocks()).doesNotContain(stockBack);
        assertThat(stockBack.getPortfolio()).isNull();
    }
}
