package com.jhipster.fpms.service;

import com.jhipster.fpms.domain.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class YahooFinanceService {

    private static final String YAHOO_FINANCE_API_URL = "https://finance.yahoo.com/quote/%s";

    @Autowired
    private RestTemplate restTemplate;

    public YahooFinanceService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable("stockPrices")
    public Stock getStockDetails(String symbol) {
        String apiUrl = String.format(YAHOO_FINANCE_API_URL, symbol);
        String response = restTemplate.getForObject(apiUrl, String.class);
        // Stock stock = parseResponse(response);
        //return stock;
        return new Stock();
    }
}
