package com.jhipster.fpms.domain;

import static com.jhipster.fpms.domain.PortfolioTestSamples.*;
import static com.jhipster.fpms.domain.StockTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.jhipster.fpms.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StockTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stock.class);
        Stock stock1 = getStockSample1();
        Stock stock2 = new Stock();
        assertThat(stock1).isNotEqualTo(stock2);

        stock2.setId(stock1.getId());
        assertThat(stock1).isEqualTo(stock2);

        stock2 = getStockSample2();
        assertThat(stock1).isNotEqualTo(stock2);
    }

    @Test
    void portfolioTest() throws Exception {
        Stock stock = getStockRandomSampleGenerator();
        Portfolio portfolioBack = getPortfolioRandomSampleGenerator();

        stock.setPortfolio(portfolioBack);
        assertThat(stock.getPortfolio()).isEqualTo(portfolioBack);

        stock.portfolio(null);
        assertThat(stock.getPortfolio()).isNull();
    }
}
